import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
  addComment: (comment: Comment) => void;
  markAsVisited: (attractionId: string) => void;
  markAsWantToVisit: (attractionId: string) => void;
  removeFromVisited: (attractionId: string) => void;
  removeFromWantToVisit: (attractionId: string) => void;
  loadInitialData: () => Promise<void>;
  setError: (error: string | null) => void;
  clearError: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  getAttraction: (id: string) => Attraction | undefined;
  toggleWantToVisit: (id: string) => void;
  toggleVisited: (id: string) => void;
  addComment: (attractionId: string, content: string) => void;
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

      addComment: async (comment) => {
        try {
          set({ isLoading: true, error: null });
          const { comments } = get();
          const newComments = [...comments, comment];
          await storage.saveComments(newComments);
          set({ comments: newComments });
        } catch (error) {
          set({ error: '添加评论失败' });
          console.error('添加评论失败:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      markAsVisited: async (attractionId) => {
        try {
          set({ isLoading: true, error: null });
          const { visitedAttractions, wantToVisitAttractions } = get();
          const newVisited = [...visitedAttractions, attractionId];
          const newWantToVisit = wantToVisitAttractions.filter(id => id !== attractionId);
          
          await Promise.all([
            storage.saveVisitedAttractions(newVisited),
            storage.saveWantToVisitAttractions(newWantToVisit),
          ]);

          set({
            visitedAttractions: newVisited,
            wantToVisitAttractions: newWantToVisit,
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
          const { visitedAttractions, wantToVisitAttractions } = get();
          const newWantToVisit = [...wantToVisitAttractions, attractionId];
          const newVisited = visitedAttractions.filter(id => id !== attractionId);
          
          await Promise.all([
            storage.saveVisitedAttractions(newVisited),
            storage.saveWantToVisitAttractions(newWantToVisit),
          ]);

          set({
            visitedAttractions: newVisited,
            wantToVisitAttractions: newWantToVisit,
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
          const { visitedAttractions } = get();
          const newVisited = visitedAttractions.filter(id => id !== attractionId);
          await storage.saveVisitedAttractions(newVisited);
          set({ visitedAttractions: newVisited });
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
          const { wantToVisitAttractions } = get();
          const newWantToVisit = wantToVisitAttractions.filter(id => id !== attractionId);
          await storage.saveWantToVisitAttractions(newWantToVisit);
          set({ wantToVisitAttractions: newWantToVisit });
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

          set({
            user,
            attractions,
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

      toggleWantToVisit: (id: string) => {
        const { wantToVisitAttractions } = get();
        const newWantToVisit = wantToVisitAttractions.includes(id)
          ? wantToVisitAttractions.filter(a => a !== id)
          : [...wantToVisitAttractions, id];
        set({ wantToVisitAttractions: newWantToVisit });
      },

      toggleVisited: (id: string) => {
        const { visitedAttractions } = get();
        const newVisited = visitedAttractions.includes(id)
          ? visitedAttractions.filter(a => a !== id)
          : [...visitedAttractions, id];
        set({ visitedAttractions: newVisited });
      },

      addComment: (attractionId: string, content: string) => {
        const { user, comments } = get();
        if (!user) return;

        const newComment: Comment = {
          id: Date.now().toString(),
          attractionId,
          userId: user.id,
          userName: user.name,
          content,
          createdAt: new Date().toISOString(),
        };

        set({ comments: [...comments, newComment] });
      },

      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: 'travel-app-storage',
      getStorage: () => AsyncStorage,
    }
  )
); 