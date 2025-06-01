import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '@/store/useStore';
import { PageTransition } from '@/components/PageTransition';
import { InfiniteList } from '@/components/InfiniteList';
import { Attraction } from '@/types';

interface RankedAttraction extends Attraction {
  rank: number;
  visitCount: number;
  wantToVisitCount: number;
}

export default function RankingScreen() {
  const router = useRouter();
  const { attractions } = useStore();

  // 计算景点排名
  const topAttractions: RankedAttraction[] = attractions
    .map((attraction, index) => ({
      ...attraction,
      rank: index + 1,
      visitCount: Math.floor(Math.random() * 1000), // 临时使用随机数，实际应该从后端获取
      wantToVisitCount: Math.floor(Math.random() * 500), // 临时使用随机数，实际应该从后端获取
    }))
    .sort((a, b) => b.visitCount - a.visitCount);

  const renderItem = (attraction: RankedAttraction) => (
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
          onLoadMore={async () => {}}
          hasMore={false}
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