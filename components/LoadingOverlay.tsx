import React, { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { useFadeIn } from '@/lib/animations';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message = '加载中...',
}) => {
  const { opacity, fadeIn } = useFadeIn();

  useEffect(() => {
    if (visible) {
      fadeIn();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View 
      className="absolute inset-0 bg-black/50 items-center justify-center z-50"
      style={{ opacity }}
    >
      <View className="bg-white p-6 rounded-lg items-center">
        <Text className="text-gray-800 text-lg mb-2">{message}</Text>
        <View className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </View>
    </Animated.View>
  );
}; 