import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Attraction, Comment } from '../types';

const STORAGE_KEYS = {
  USER: '@travel:user',
  ATTRACTIONS: '@travel:attractions',
  COMMENTS: '@travel:comments',
  VISITED_ATTRACTIONS: '@travel:visited_attractions',
  WANT_TO_VISIT_ATTRACTIONS: '@travel:want_to_visit_attractions',
};

export const storage = {
  // 用户相关
  async saveUser(user: User | null) {
    try {
      if (user) {
        await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (error) {
      console.error('保存用户信息失败:', error);
    }
  },

  async getUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('获取用户信息失败:', error);
      return null;
    }
  },

  // 景点相关
  async saveAttractions(attractions: Attraction[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ATTRACTIONS, JSON.stringify(attractions));
    } catch (error) {
      console.error('保存景点信息失败:', error);
    }
  },

  async getAttractions(): Promise<Attraction[]> {
    try {
      const attractionsJson = await AsyncStorage.getItem(STORAGE_KEYS.ATTRACTIONS);
      return attractionsJson ? JSON.parse(attractionsJson) : [];
    } catch (error) {
      console.error('获取景点信息失败:', error);
      return [];
    }
  },

  // 评论相关
  async saveComments(comments: Comment[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
    } catch (error) {
      console.error('保存评论信息失败:', error);
    }
  },

  async getComments(): Promise<Comment[]> {
    try {
      const commentsJson = await AsyncStorage.getItem(STORAGE_KEYS.COMMENTS);
      return commentsJson ? JSON.parse(commentsJson) : [];
    } catch (error) {
      console.error('获取评论信息失败:', error);
      return [];
    }
  },

  // 已访问景点相关
  async saveVisitedAttractions(attractionIds: string[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.VISITED_ATTRACTIONS, JSON.stringify(attractionIds));
    } catch (error) {
      console.error('保存已访问景点失败:', error);
    }
  },

  async getVisitedAttractions(): Promise<string[]> {
    try {
      const visitedJson = await AsyncStorage.getItem(STORAGE_KEYS.VISITED_ATTRACTIONS);
      return visitedJson ? JSON.parse(visitedJson) : [];
    } catch (error) {
      console.error('获取已访问景点失败:', error);
      return [];
    }
  },

  // 想去景点相关
  async saveWantToVisitAttractions(attractionIds: string[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.WANT_TO_VISIT_ATTRACTIONS, JSON.stringify(attractionIds));
    } catch (error) {
      console.error('保存想去景点失败:', error);
    }
  },

  async getWantToVisitAttractions(): Promise<string[]> {
    try {
      const wantToVisitJson = await AsyncStorage.getItem(STORAGE_KEYS.WANT_TO_VISIT_ATTRACTIONS);
      return wantToVisitJson ? JSON.parse(wantToVisitJson) : [];
    } catch (error) {
      console.error('获取想去景点失败:', error);
      return [];
    }
  },

  // 清除所有数据
  async clearAll() {
    try {
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    } catch (error) {
      console.error('清除数据失败:', error);
    }
  },
}; 