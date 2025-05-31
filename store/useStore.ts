import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Attraction, Comment } from '../types';
import { storage } from '../lib/storage';

interface StoreState {
  user: User | null;
  attractions: Attraction[];
  comments: Comment[];
  visitedAttractions: string[];
  wantToVisitAttractions: string[];
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setAttractions: (attractions: Attraction[]) => void;
  addComment: (attractionId: string, content: string) => Promise<void>;
  markAsVisited: (attractionId: string) => Promise<void>;
  markAsWantToVisit: (attractionId: string) => Promise<void>;
  removeFromVisited: (attractionId: string) => Promise<void>;
  removeFromWantToVisit: (attractionId: string) => Promise<void>;
  loadInitialData: () => Promise<void>;
  setError: (error: string | null) => void;
  clearError: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  getAttraction: (id: string) => Attraction | undefined;
  toggleWantToVisit: (id: string) => Promise<void>;
  toggleVisited: (id: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      user: null,
      attractions: [],
      comments: [],
      visitedAttractions: [],
      wantToVisitAttractions: [],
      isLoading: false,
      error: null,

      setUser: async (user) => {
        try {
          set({ isLoading: true, error: null });
          await storage.saveUser(user);
          set({ user });
        } catch (error) {
          set({ error: '保存用户信息失败' });
          console.error('保存用户信息失败:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      setAttractions: async (attractions) => {
        try {
          set({ isLoading: true, error: null });
          await storage.saveAttractions(attractions);
          set({ attractions });
        } catch (error) {
          set({ error: '保存景点信息失败' });
          console.error('保存景点信息失败:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      addComment: async (attractionId: string, content: string) => {
        try {
          set({ isLoading: true, error: null });
          const { user, attractions, comments } = get();
          if (!user) {
            throw new Error('请先登录');
          }

          const newComment: Comment = {
            id: Date.now().toString(),
            attractionId,
            userId: user.id,
            userName: user.name,
            content,
            createdAt: new Date().toISOString(),
            user: {
              name: user.name,
              avatar: user.avatar,
            },
          };

          const newComments = [...comments, newComment];
          const updatedAttractions = attractions.map(attraction => {
            if (attraction.id === attractionId) {
              return {
                ...attraction,
                comments: [...attraction.comments, newComment],
              };
            }
            return attraction;
          });

          await Promise.all([
            storage.saveComments(newComments),
            storage.saveAttractions(updatedAttractions),
          ]);

          set({
            comments: newComments,
            attractions: updatedAttractions,
          });
        } catch (error) {
          set({ error: '添加评论失败' });
          console.error('添加评论失败:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      markAsVisited: async (attractionId) => {
        try {
          set({ isLoading: true, error: null });
          const { visitedAttractions, wantToVisitAttractions, attractions } = get();
          const newVisited = [...visitedAttractions, attractionId];
          const newWantToVisit = wantToVisitAttractions.filter(id => id !== attractionId);
          
          const updatedAttractions = attractions.map(attraction => {
            if (attraction.id === attractionId) {
              return {
                ...attraction,
                visited: true,
                wantToVisit: false,
              };
            }
            return attraction;
          });

          await Promise.all([
            storage.saveVisitedAttractions(newVisited),
            storage.saveWantToVisitAttractions(newWantToVisit),
            storage.saveAttractions(updatedAttractions),
          ]);

          set({
            visitedAttractions: newVisited,
            wantToVisitAttractions: newWantToVisit,
            attractions: updatedAttractions,
          });
        } catch (error) {
          set({ error: '标记已访问失败' });
          console.error('标记已访问失败:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      markAsWantToVisit: async (attractionId) => {
        try {
          set({ isLoading: true, error: null });
          const { visitedAttractions, wantToVisitAttractions, attractions } = get();
          const newWantToVisit = [...wantToVisitAttractions, attractionId];
          const newVisited = visitedAttractions.filter(id => id !== attractionId);
          
          const updatedAttractions = attractions.map(attraction => {
            if (attraction.id === attractionId) {
              return {
                ...attraction,
                visited: false,
                wantToVisit: true,
              };
            }
            return attraction;
          });

          await Promise.all([
            storage.saveVisitedAttractions(newVisited),
            storage.saveWantToVisitAttractions(newWantToVisit),
            storage.saveAttractions(updatedAttractions),
          ]);

          set({
            visitedAttractions: newVisited,
            wantToVisitAttractions: newWantToVisit,
            attractions: updatedAttractions,
          });
        } catch (error) {
          set({ error: '标记想去失败' });
          console.error('标记想去失败:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      removeFromVisited: async (attractionId) => {
        try {
          set({ isLoading: true, error: null });
          const { visitedAttractions, attractions } = get();
          const newVisited = visitedAttractions.filter(id => id !== attractionId);
          
          const updatedAttractions = attractions.map(attraction => {
            if (attraction.id === attractionId) {
              return {
                ...attraction,
                visited: false,
              };
            }
            return attraction;
          });

          await Promise.all([
            storage.saveVisitedAttractions(newVisited),
            storage.saveAttractions(updatedAttractions),
          ]);

          set({
            visitedAttractions: newVisited,
            attractions: updatedAttractions,
          });
        } catch (error) {
          set({ error: '移除已访问失败' });
          console.error('移除已访问失败:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      removeFromWantToVisit: async (attractionId) => {
        try {
          set({ isLoading: true, error: null });
          const { wantToVisitAttractions, attractions } = get();
          const newWantToVisit = wantToVisitAttractions.filter(id => id !== attractionId);
          
          const updatedAttractions = attractions.map(attraction => {
            if (attraction.id === attractionId) {
              return {
                ...attraction,
                wantToVisit: false,
              };
            }
            return attraction;
          });

          await Promise.all([
            storage.saveWantToVisitAttractions(newWantToVisit),
            storage.saveAttractions(updatedAttractions),
          ]);

          set({
            wantToVisitAttractions: newWantToVisit,
            attractions: updatedAttractions,
          });
        } catch (error) {
          set({ error: '移除想去失败' });
          console.error('移除想去失败:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      loadInitialData: async () => {
        try {
          set({ isLoading: true, error: null });
          const [user, attractions, comments, visitedAttractions, wantToVisitAttractions] = await Promise.all([
            storage.getUser(),
            storage.getAttractions(),
            storage.getComments(),
            storage.getVisitedAttractions(),
            storage.getWantToVisitAttractions(),
          ]);

          // 更新景点的 visited 和 wantToVisit 状态
          const updatedAttractions = attractions.map(attraction => ({
            ...attraction,
            visited: visitedAttractions.includes(attraction.id),
            wantToVisit: wantToVisitAttractions.includes(attraction.id),
          }));

          set({
            user,
            attractions: updatedAttractions,
            comments,
            visitedAttractions,
            wantToVisitAttractions,
          });
        } catch (error) {
          set({ error: '加载数据失败' });
          console.error('加载数据失败:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          // TODO: 实现实际的登录逻辑
          const user: User = {
            id: '1',
            name: '测试用户',
            email: email,
          };
          set({ user, isLoading: false });
        } catch (error) {
          set({ error: '登录失败', isLoading: false });
          throw error;
        }
      },

      register: async (name: string, email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          // TODO: 实现实际的注册逻辑
          const user: User = {
            id: '1',
            name: name,
            email: email,
          };
          set({ user, isLoading: false });
        } catch (error) {
          set({ error: '注册失败', isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null });
      },

      getAttraction: (id: string) => {
        return get().attractions.find(a => a.id === id);
      },

      toggleWantToVisit: async (id: string) => {
        const { wantToVisitAttractions } = get();
        if (wantToVisitAttractions.includes(id)) {
          await get().removeFromWantToVisit(id);
        } else {
          await get().markAsWantToVisit(id);
        }
      },

      toggleVisited: async (id: string) => {
        const { visitedAttractions } = get();
        if (visitedAttractions.includes(id)) {
          await get().removeFromVisited(id);
        } else {
          await get().markAsVisited(id);
        }
      },

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'travel-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 