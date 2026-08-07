import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function SurveyDetailScreen({ onNext, surveyData, updateSurveyData }) {
  const [weeks, setWeeks] = useState(surveyData?.weeks || '24주');
  const [concerns, setConcerns] = useState(surveyData?.concerns || ['건조함', '민감함', '가려움']);
  const [skinType, setSkinType] = useState(surveyData?.skinType || '건성');

  const concernOptions = ['건조함', '민감함', '트러블', '가려움', '색소침착', '붓기'];
  const skinTypeOptions = ['건성', '중성', '지성', '복합성'];

  const toggleConcern = (item) => {
    if (concerns.includes(item)) {
      setConcerns(concerns.filter((c) => c !== item));
    } else {
      setConcerns([...concerns, item]);
    }
  };

  const handleNext = () => {
    updateSurveyData({ weeks, concerns, skinType });
    onNext();
  };

  return (
    <View className="flex-1 bg-[#4A311F]">
      <StatusBar style="light" />
      <ScrollView contentContainerClassName="flex-grow justify-between px-6 pt-12 pb-8">
        {/* Title Header */}
        <View className="mt-4 mb-6">
          <Text className="text-white text-2xl font-bold mb-2">
            정보를 입력해주세요
          </Text>
          <Text className="text-white/80 text-xs font-light leading-relaxed">
            현재 상태에 맞춰 성분 기준과{'\n'}루틴을 추천해 드려요.
          </Text>
        </View>

        {/* Form Details */}
        <View className="w-full my-auto py-2">
          {/* Week Input */}
          <View className="bg-white/15 border border-white/25 rounded-2xl mb-6 px-4 py-3.5">
            <TextInput
              value={weeks}
              onChangeText={setWeeks}
              placeholder="예) 24 주"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              className="text-white text-sm font-medium"
            />
          </View>

          {/* Skin Concerns Section */}
          <View className="mb-6">
            <Text className="text-white text-xs font-semibold mb-3">
              피부 고민 (복수 선택 가능)
            </Text>
            <View className="flex-row flex-wrap">
              {concernOptions.map((item) => {
                const isSelected = concerns.includes(item);
                return (
                  <TouchableOpacity
                    key={item}
                    activeOpacity={0.7}
                    onPress={() => toggleConcern(item)}
                    className={`mr-2 mb-2.5 px-4 py-2 rounded-xl border ${
                      isSelected
                        ? 'bg-white border-white'
                        : 'bg-white/10 border-white/20'
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        isSelected ? 'text-[#4A311F]' : 'text-white/80'
                      }`}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Skin Type Section */}
          <View className="mb-4">
            <Text className="text-white text-xs font-semibold mb-3">
              피부 타입 (1개 필수 선택)
            </Text>
            <View className="flex-row flex-wrap">
              {skinTypeOptions.map((item) => {
                const isSelected = skinType === item;
                return (
                  <TouchableOpacity
                    key={item}
                    activeOpacity={0.7}
                    onPress={() => setSkinType(item)}
                    className={`mr-2 mb-2.5 px-4 py-2 rounded-xl border ${
                      isSelected
                        ? 'bg-white border-white'
                        : 'bg-white/10 border-white/20'
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        isSelected ? 'text-[#4A311F]' : 'text-white/80'
                      }`}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Bottom Button */}
        <View className="pb-4">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleNext}
            className="bg-white rounded-full py-4 items-center shadow-lg"
          >
            <Text className="text-[#4A311F] font-bold text-base">다음</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
