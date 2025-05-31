import React, { useEffect } from 'react';
import { View, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFadeIn } from '../lib/animations';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const navigation = useNavigation();
  const { opacity, fadeIn } = useFadeIn();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fadeIn();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View className="flex-1 bg-white">
      <Animated.View className="flex-1" style={{ opacity }}>
        {children}
      </Animated.View>
    </View>
  );
}; 