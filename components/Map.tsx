import React, { useRef, useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_DEFAULT } from 'react-native-maps';
import { useStore } from '../store/useStore';

interface MapProps {
  onMarkerPress?: (id: string) => void;
}

export function Map({ onMarkerPress }: MapProps) {
  const mapRef = useRef<MapView>(null);
  const { attractions, visitedAttractions, wantToVisitAttractions } = useStore();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: 39.9042,
        longitude: 116.4074,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 0);
    }
  }, []);

  const renderMarkers = () => {
    return attractions.map((attraction) => {
      const [longitude, latitude] = attraction.location.split(',').map(Number);
      const isVisited = visitedAttractions.includes(attraction.id);
      const isWantToVisit = wantToVisitAttractions.includes(attraction.id);

      return (
        <Marker
          key={attraction.id}
          coordinate={{ latitude, longitude }}
          onPress={() => onMarkerPress?.(attraction.id)}
        >
          <View
            className={`w-8 h-8 rounded-full items-center justify-center ${
              isVisited
                ? 'bg-green-500'
                : isWantToVisit
                ? 'bg-blue-500'
                : 'bg-red-500'
            }`}
          />
          <Callout>
            <View className="p-2">
              <Text className="font-bold text-base">{attraction.name}</Text>
              <Text className="text-gray-600">{attraction.description}</Text>
            </View>
          </Callout>
        </Marker>
      );
    });
  };

  return (
    <View className="flex-1">
      <MapView
        ref={mapRef}
        className="flex-1"
        provider={Platform.OS === 'ios' ? PROVIDER_DEFAULT : undefined}
        initialRegion={{
          latitude: 39.9042,
          longitude: 116.4074,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {renderMarkers()}
      </MapView>
    </View>
  );
} 