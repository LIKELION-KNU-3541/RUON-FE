import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen({ onNext }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);

  return (
    <View className="flex-1 bg-[#4A311F]">
      <StatusBar style="light" />
      <ScrollView contentContainerClassName="flex-grow justify-between px-6 pt-12 pb-8">
        {/* Top Header */}
        <View className="items-center mt-6">
          <Image
            source={require('../../../assets/images/RUON.png')}
            className="w-36 h-10 mb-2"
            resizeMode="contain"
          />
          <Text className="text-white/80 text-xs font-light text-center">
            임산부의 스킨케어 루틴을 책임지는 루온입니다
          </Text>
        </View>

        {/* Form Container */}
        <View className="w-full my-auto py-6">
          <Text className="text-white text-sm font-semibold mb-3">로그인</Text>

          {/* Username Input */}
          <View className="bg-white/10 border border-white/20 rounded-2xl mb-4 px-4 py-3.5">
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="아이디"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              className="text-white text-sm"
            />
          </View>

          {/* Password Input */}
          <View className="bg-white/10 border border-white/20 rounded-2xl mb-3 px-4 py-3.5">
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="비밀번호 (영문, 숫자, 특수문자 포함)"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              className="text-white text-sm"
            />
          </View>

          {/* Save ID Checkbox */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setRememberId(!rememberId)}
            className="flex-row items-center mb-8 px-1"
          >
            <View className={`w-4 h-4 rounded border border-white/60 mr-2 items-center justify-center ${rememberId ? 'bg-white' : 'bg-transparent'}`}>
              {rememberId && <Text className="text-[#4A311F] text-xs font-bold">✓</Text>}
            </View>
            <Text className="text-white/80 text-xs">아이디 저장</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onNext}
            className="bg-white rounded-full py-4 items-center shadow-lg"
          >
            <Text className="text-[#4A311F] font-bold text-base">로그인</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Signup Link */}
        <View className="flex-row justify-center items-center pb-4">
          <Text className="text-white/60 text-xs mr-2">계정이 없으신가요?</Text>
          <TouchableOpacity onPress={onNext}>
            <Text className="text-white font-bold text-xs underline">회원가입</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
