import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { LoadingOverlay } from '@/components/LoadingOverlay';

export default function Layout() {
  const loadInitialData = useStore(state => state.loadInitialData);

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8E8E93',
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: '#E5E5EA',
            backgroundColor: '#FFFFFF',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            color: '#000000',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: '地图',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="visited"
          options={{
            title: '我的到访',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="location" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="ranking"
          options={{
            title: '景点排行',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="trophy" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: '个人中心',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      <LoadingOverlay visible={false} />
    </>
  );
} 