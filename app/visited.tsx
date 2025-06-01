import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '@/store/useStore';
import { Attraction } from '@/types';
import MapView, { Marker, Callout } from 'react-native-maps';

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
    <View style={{ flex: 1 }}>
      <MapView
        className="w-full h-full"
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 39.9042,
          longitude: 116.4074,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onMapReady={() => console.log('Visited Map is ready')}
      >
        {visitedAttractionsData.map((attraction) => (
          <Marker
            key={attraction.id}
            coordinate={{
              latitude: attraction.location.latitude,
              longitude: attraction.location.longitude,
            }}
          >
            <Callout>
              <View className="p-2">
                <Text className="text-base font-medium">{attraction.name}</Text>
                <Text className="text-sm text-gray-600">{attraction.description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
} 