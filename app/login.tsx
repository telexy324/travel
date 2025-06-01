import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '@/store/useStore';
import { PageTransition } from '@/components/PageTransition';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace('/');
    } catch (error) {
      // 错误处理已在 store 中完成
    }
  };

  return (
    <PageTransition>
      <View className="flex-1 bg-white">
        <View className="flex-1 px-6 pt-12">
          <View className="items-center mb-12">
            <Image
              source={{ uri: 'https://via.placeholder.com/96' }}
              className="w-24 h-24 mb-4"
            />
            <Text className="text-2xl font-bold text-gray-800">欢迎回来</Text>
            <Text className="text-gray-500 mt-2">请登录您的账号</Text>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-gray-700 mb-2">邮箱</Text>
              <TextInput
                className="bg-gray-100 px-4 py-3 rounded-lg"
                placeholder="请输入邮箱"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View>
              <Text className="text-gray-700 mb-2">密码</Text>
              <TextInput
                className="bg-gray-100 px-4 py-3 rounded-lg"
                placeholder="请输入密码"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              className="bg-blue-500 py-3 rounded-lg mt-6"
              onPress={handleLogin}
            >
              <Text className="text-white text-center font-medium text-lg">
                登录
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-4"
              onPress={() => router.push('/register')}
            >
              <Text className="text-blue-500 text-center">
                还没有账号？立即注册
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </PageTransition>
  );
} 