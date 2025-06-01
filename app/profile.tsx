import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '@/store/useStore';
import { PageTransition } from '@/components/PageTransition';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, visitedAttractions, wantToVisitAttractions, logout } = useStore();

  const visitedCount = visitedAttractions.length;
  const wantToVisitCount = wantToVisitAttractions.length;

  if (!user) {
    return (
      <PageTransition>
        <View className="flex-1 bg-gray-100 items-center justify-center p-4">
          <Text className="text-xl font-bold mb-4">欢迎使用旅游助手</Text>
          <TouchableOpacity
            className="bg-blue-500 px-6 py-3 rounded-full mb-4"
            onPress={() => router.push('/login')}
          >
            <Text className="text-white font-medium">登录</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white px-6 py-3 rounded-full border border-blue-500"
            onPress={() => router.push('/register')}
          >
            <Text className="text-blue-500 font-medium">注册</Text>
          </TouchableOpacity>
        </View>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <View className="flex-1 bg-gray-100">
        <View className="bg-white p-6">
          <View className="flex-row items-center">
            <Image
              source={user.avatar ? { uri: user.avatar } : { uri: 'https://via.placeholder.com/80' }}
              className="w-20 h-20 rounded-full"
            />
            <View className="ml-4">
              <Text className="text-xl font-bold">{user.name}</Text>
              <Text className="text-gray-600">{user.email}</Text>
            </View>
          </View>
        </View>

        <View className="flex-row bg-white mt-4 p-4">
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-blue-500">{visitedCount}</Text>
            <Text className="text-gray-600">已到访</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-blue-500">{wantToVisitCount}</Text>
            <Text className="text-gray-600">想去</Text>
          </View>
        </View>

        <View className="mt-4">
          <TouchableOpacity
            className="flex-row items-center bg-white p-4 border-b border-gray-200"
            onPress={() => router.push('/visited')}
          >
            <Ionicons name="time-outline" size={24} color="#666" />
            <Text className="ml-4 text-gray-800">已到访景点</Text>
            <Ionicons name="chevron-forward" size={24} color="#999" className="ml-auto" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center bg-white p-4 border-b border-gray-200"
            onPress={() => router.push('/settings')}
          >
            <Ionicons name="settings-outline" size={24} color="#666" />
            <Text className="ml-4 text-gray-800">设置</Text>
            <Ionicons name="chevron-forward" size={24} color="#999" className="ml-auto" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center bg-white p-4"
            onPress={logout}
          >
            <Ionicons name="log-out-outline" size={24} color="#666" />
            <Text className="ml-4 text-gray-800">退出登录</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PageTransition>
  );
} 