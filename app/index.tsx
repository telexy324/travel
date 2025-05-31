import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { useStore } from '../store/useStore';
import { Attraction } from '../types';
import { PageTransition } from '../components/PageTransition';

export default function MapScreen() {
  const router = useRouter();
  const { attractions } = useStore();

  const handleMarkerPress = (attraction: Attraction) => {
    router.push(`/attraction/${attraction.id}`);
  };

  return (
    <PageTransition>
      <View className="flex-1">
        <MapView
          className="flex-1"
          initialRegion={{
            latitude: 39.9042,
            longitude: 116.4074,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {attractions.map((attraction) => (
            <Marker
              key={attraction.id}
              coordinate={{
                latitude: attraction.location.latitude,
                longitude: attraction.location.longitude,
              }}
              onPress={() => handleMarkerPress(attraction)}
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
    </PageTransition>
  );
} 