import './global.css';
import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View className="flex-1 bg-[#2B1E14] items-center justify-center p-6">
      <Text className="text-4xl font-bold text-[#E5A96A] mb-2">RUON-FE</Text>
      <Text className="text-base text-[#D4C4B5] text-center">
        Expo SDK 54 & NativeWind v4 Ready
      </Text>
      <StatusBar style="light" />
    </View>
  );
}
