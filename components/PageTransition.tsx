import React, { useEffect } from 'react';
import { View, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useFadeIn } from '@/lib/animations';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const router = useRouter();
  const { opacity, fadeIn } = useFadeIn();

  useEffect(() => {
    fadeIn();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <Animated.View className="flex-1" style={{ opacity }}>
        {children}
      </Animated.View>
    </View>
  );
}; 