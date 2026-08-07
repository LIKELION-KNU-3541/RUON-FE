import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen({ onNext }) {
  return (
    <View className="flex-1 bg-[#4A311F] px-6 justify-between pt-12 pb-8">
      <StatusBar style="light" />

      {/* Top Header */}
      <View className="mt-4">
        <Image
          source={require('../../../assets/images/RUON.png')}
          className="w-32 h-9 mb-4"
          resizeMode="contain"
        />
        <Text className="text-white text-2xl font-bold mb-2">
          반가워요,
        </Text>
        <Text className="text-white/80 text-sm font-light leading-relaxed">
          내 화장대 속 제품을 확인하고{'\n'}안심할 수 있는 루틴을 만들어 드릴게요.
        </Text>
      </View>

      {/* Center 3D Soap Asset */}
      <View className="items-center justify-center my-auto py-4">
        <View className="w-64 h-64 items-center justify-center">
          <Image
            source={require('../../../assets/images/logo_3d.png')}
            className="w-56 h-56"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Bottom Button */}
      <View className="pb-4">
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onNext}
          className="bg-white rounded-full py-4 items-center shadow-lg"
        >
          <Text className="text-[#4A311F] font-bold text-base">다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
