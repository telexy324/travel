import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../store/useStore';
import { PageTransition } from '../components/PageTransition';
import { InfiniteList } from '../components/InfiniteList';

export default function RankingScreen() {
  const router = useRouter();
  const { topAttractions, loadMoreTopAttractions } = useStore();

  const renderItem = (attraction: any) => (
    <TouchableOpacity
      className="bg-white p-4 mb-2 rounded-lg shadow-sm"
      onPress={() => router.push(`/attraction/${attraction.id}`)}
    >
      <View className="flex-row items-center">
        <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center mr-3">
          <Text className="text-white font-bold">{attraction.rank}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-lg font-medium mb-1">{attraction.name}</Text>
          <Text className="text-sm text-gray-600">
            到访: {attraction.visitCount} | 想去: {attraction.wantToVisitCount}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <PageTransition>
      <View className="flex-1 bg-gray-100">
        <InfiniteList
          data={topAttractions}
          renderItem={renderItem}
          onLoadMore={loadMoreTopAttractions}
          hasMore={true}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center p-4">
              <Text className="text-gray-500 text-center">
                暂无排行数据
              </Text>
            </View>
          }
        />
      </View>
    </PageTransition>
  );
} 