import { Animated, Easing } from 'react-native';

export const fadeIn = (value: Animated.Value) => {
  return Animated.timing(value, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  });
};

export const fadeOut = (value: Animated.Value) => {
  return Animated.timing(value, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });
};

export const useFadeIn = () => {
  const opacity = new Animated.Value(0);

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return { opacity, fadeIn };
};

export const slideIn = (value: Animated.Value, duration = 300) => {
  return Animated.timing(value, {
    toValue: 0,
    duration,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
  });
};

export const slideOut = (value: Animated.Value, duration = 300) => {
  return Animated.timing(value, {
    toValue: 100,
    duration,
    easing: Easing.in(Easing.cubic),
    useNativeDriver: true,
  });
};

export const scaleIn = (value: Animated.Value) => {
  return Animated.spring(value, {
    toValue: 1,
    useNativeDriver: true,
    damping: 10,
    mass: 1,
    stiffness: 100,
  });
};

export const scaleOut = (value: Animated.Value) => {
  return Animated.spring(value, {
    toValue: 0,
    useNativeDriver: true,
    damping: 10,
    mass: 1,
    stiffness: 100,
  });
}; 