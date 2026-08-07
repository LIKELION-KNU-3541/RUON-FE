import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function SurveyConditionScreen({ onNext, surveyData, updateSurveyData }) {
  const [selected, setSelected] = useState(surveyData?.condition || '출산 후');

  const options = ['임신 중', '출산 후', '수유 중'];

  const handleNext = () => {
    updateSurveyData({ condition: selected });
    onNext();
  };

  return (
    <View className="flex-1 bg-[#4A311F] px-6 justify-between pt-12 pb-8">
      <StatusBar style="light" />

      {/* Title Header */}
      <View className="mt-6">
        <Text className="text-white text-2xl font-bold mb-3">
          현재 어떤 상태이신가요?
        </Text>
        <Text className="text-white/80 text-xs font-light leading-relaxed">
          임신부터 출산 후, 수유 기간까지{'\n'}지금의 나에게 맞는 케어를 도와드릴게요.
        </Text>
      </View>

      {/* Options List */}
      <View className="w-full my-auto space-y-4">
        {options.map((opt) => {
          const isSelected = selected === opt;
          return (
            <TouchableOpacity
              key={opt}
              activeOpacity={0.8}
              onPress={() => setSelected(opt)}
              className={`w-full py-4 px-6 rounded-2xl border my-2 items-center justify-center ${
                isSelected
                  ? 'bg-white border-white'
                  : 'bg-white/10 border-white/20'
              }`}
            >
              <Text
                className={`text-base font-bold ${
                  isSelected ? 'text-[#4A311F]' : 'text-white/80'
                }`}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
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
    </View>
  );
}
