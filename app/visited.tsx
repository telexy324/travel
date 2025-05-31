import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../store/useStore';
import { PageTransition } from '../components/PageTransition';
import { InfiniteList } from '../components/InfiniteList';
import { Attraction } from '../types';

export default function VisitedScreen() {
  const router = useRouter();
  const { visitedAttractions, attractions } = useStore();

  // 获取已访问的景点详情
  const visitedAttractionsData = visitedAttractions
    .map(id => attractions.find(a => a.id === id))
    .filter((a): a is Attraction => a !== undefined);

  const renderItem = (attraction: Attraction) => (
    <TouchableOpacity
      className="bg-white p-4 mb-2 rounded-lg shadow-sm"
      onPress={() => router.push(`/attraction/${attraction.id}`)}
    >
      <Text className="text-lg font-medium mb-1">{attraction.name}</Text>
      <Text className="text-sm text-gray-600" numberOfLines={2}>
        {attraction.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <PageTransition>
      <View className="flex-1 bg-gray-100">
        <InfiniteList
          data={visitedAttractionsData}
          renderItem={renderItem}
          hasMore={false}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center p-4">
              <Text className="text-gray-500 text-center">
                您还没有到访过任何景点
              </Text>
            </View>
          }
        />
      </View>
    </PageTransition>
  );
} 