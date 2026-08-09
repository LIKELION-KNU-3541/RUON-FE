import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function ConditionCard({ options }) {
  return (
    <View className="rounded-2xl bg-white px-[20px] py-[24px]">
      <Text className="mb-[14px] font-pretendard-regular text-[15px] text-[#9D6B48]">
        오늘의 피부 상태를 알려주세요
      </Text>

      <View className="flex-row flex-wrap gap-[10px]">
        {options.slice(0, 4).map((item) => (
          <TouchableOpacity
            key={item}
            className="h-[33px] items-center justify-center rounded-full bg-ruon-main1 p-[10px]"
            activeOpacity={0.7}
          >
            <Text className="font-pretendard-medium text-[11px] text-white">
              {item}
            </Text>
          </TouchableOpacity>
        ))}

        {options.length > 4 && (
          <TouchableOpacity
            className="h-[33px] items-center justify-center rounded-full bg-ruon-main1 p-[10px]"
            activeOpacity={0.7}
          >
            <Text className="font-pretendard-medium text-[11px] text-white">
              외 {options.length - 4}개
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
