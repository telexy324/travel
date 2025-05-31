import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useStore } from '../../store/useStore';
import { PageTransition } from '../../components/PageTransition';
import { InfiniteList } from '../../components/InfiniteList';
import { Ionicons } from '@expo/vector-icons';

export default function AttractionDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getAttraction, toggleWantToVisit, toggleVisited, addComment } = useStore();
  const attraction = getAttraction(id as string);

  if (!attraction) {
    return (
      <PageTransition>
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">景点不存在</Text>
        </View>
      </PageTransition>
    );
  }

  const renderComment = (comment: any) => (
    <View className="bg-white p-4 mb-2 rounded-lg">
      <View className="flex-row items-center mb-2">
        <Image
          source={{ uri: comment.user.avatar }}
          className="w-8 h-8 rounded-full"
        />
        <View className="ml-2">
          <Text className="font-medium">{comment.user.name}</Text>
          <Text className="text-xs text-gray-500">{comment.createdAt}</Text>
        </View>
      </View>
      <Text className="text-gray-800">{comment.content}</Text>
    </View>
  );

  return (
    <PageTransition>
      <ScrollView className="flex-1 bg-gray-100">
        <View className="relative">
          <Image
            source={{ uri: attraction.images[0] }}
            className="w-full h-64"
            resizeMode="cover"
          />
          <TouchableOpacity
            className="absolute top-4 left-4 bg-black/50 rounded-full p-2"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View className="p-4 bg-white">
          <Text className="text-2xl font-bold mb-2">{attraction.name}</Text>
          <Text className="text-gray-600 mb-4">{attraction.description}</Text>

          <View className="flex-row mb-4">
            <TouchableOpacity
              className="flex-1 bg-blue-500 py-2 rounded-full mr-2"
              onPress={() => toggleWantToVisit(attraction.id)}
            >
              <Text className="text-white text-center font-medium">
                {attraction.wantToVisit ? '取消想去' : '想去'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-green-500 py-2 rounded-full ml-2"
              onPress={() => toggleVisited(attraction.id)}
            >
              <Text className="text-white text-center font-medium">
                {attraction.visited ? '取消到访' : '已到访'}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="border-t border-gray-200 pt-4">
            <Text className="text-lg font-bold mb-4">评论</Text>
            <InfiniteList
              data={attraction.comments}
              renderItem={renderComment}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <Text className="text-gray-500 text-center py-4">
                  暂无评论
                </Text>
              }
            />
          </View>
        </View>
      </ScrollView>
    </PageTransition>
  );
} 