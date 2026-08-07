import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen({ onNext }) {
  return (
    <TouchableOpacity activeOpacity={0.95} onPress={onNext} className="flex-1">
      <View className="flex-1 bg-[#1E120A]">
        <StatusBar style="light" />
        <ImageBackground
          source={require('../../../assets/images/onboarding.png')}
          className="flex-1 justify-between px-6 pt-10 pb-6"
          resizeMode="cover"
        >
          {/* Top Status Bar Spacer */}
          <View className="pt-2">
            <Text className="text-white/70 text-xs text-right font-medium">9:41</Text>
          </View>

          {/* Center / Lower-Center Content (RUON logo & subtitle) */}
          <View className="items-center justify-center my-auto pt-28">
            <Image
              source={require('../../../assets/images/RUON.png')}
              className="w-56 h-14 mb-3"
              resizeMode="contain"
            />
            <Text className="text-white/90 text-sm font-light tracking-widest text-center">
              나를 위한 루틴을 켜다, 루온
            </Text>
          </View>

          {/* Bottom Logo Emblem */}
          <View className="items-center pb-2">
            <Image
              source={require('../../../assets/images/logo.png')}
              className="w-9 h-9"
              resizeMode="contain"
            />
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

