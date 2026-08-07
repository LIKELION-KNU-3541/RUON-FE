import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function SurveySummaryScreen({ onPrev, surveyData }) {
  const condition = surveyData?.condition || '임신 중';
  const weeks = surveyData?.weeks || '24주';
  const concerns = surveyData?.concerns?.join(' · ') || '건조함 · 민감함 · 가려움';
  const skinType = surveyData?.skinType || '건성';

  return (
    <View className="flex-1 bg-[#4A311F] px-6 justify-between pt-12 pb-8">
      <StatusBar style="light" />

      {/* Header Title */}
      <View className="mt-4">
        <Text className="text-white text-2xl font-bold mb-2 text-center">
          맞춤 케어 준비가 완료되었어요
        </Text>
        <Text className="text-white/80 text-xs font-light text-center leading-relaxed">
          입력해주신 정보를 바탕으로{'\n'}지금의 나에게 맞는 케어를 시작해볼게요.
        </Text>
      </View>

      {/* Center Checkmark Badge & Summary Card */}
      <View className="w-full my-auto items-center">
        {/* Checkmark Circle */}
        <View className="w-16 h-16 rounded-full bg-white items-center justify-center mb-8 shadow-md">
          <Text className="text-[#4A311F] text-2xl font-extrabold">✓</Text>
        </View>

        {/* Summary Details Card */}
        <View className="w-full bg-white/10 border border-white/20 rounded-3xl p-5 space-y-4">
          <View className="flex-row justify-between items-center py-1 border-b border-white/10">
            <Text className="text-white/70 text-xs">현재 상태</Text>
            <Text className="text-white text-xs font-bold">{condition}</Text>
          </View>

          <View className="flex-row justify-between items-center py-1 border-b border-white/10">
            <Text className="text-white/70 text-xs">임신 주차</Text>
            <Text className="text-white text-xs font-bold">{weeks}</Text>
          </View>

          <View className="flex-row justify-between items-center py-1 border-b border-white/10">
            <Text className="text-white/70 text-xs">피부 고민</Text>
            <Text className="text-white text-xs font-bold max-w-[180px] text-right" numberOfLines={1}>
              {concerns}
            </Text>
          </View>

          <View className="flex-row justify-between items-center py-1">
            <Text className="text-white/70 text-xs">피부 타입</Text>
            <Text className="text-white text-xs font-bold">{skinType}</Text>
          </View>
        </View>
      </View>

      {/* Bottom Actions */}
      <View className="pb-4 items-center w-full">
        <TouchableOpacity onPress={onPrev} className="mb-4">
          <Text className="text-white/60 text-xs underline">이전 단계 수정하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => alert('맞춤 루틴 시작!')}
          className="w-full bg-white rounded-full py-4 items-center shadow-lg"
        >
          <Text className="text-[#4A311F] font-bold text-base">시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
