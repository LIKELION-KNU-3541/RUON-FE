import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Rarrow from '../../../../assets/icons/Rarrow.svg';

export default function RoutineCard({ icon, title, description }) {
  const Icon = icon;

  return (
    <TouchableOpacity className="flex-1 rounded-2xl bg-white py-[24px] pl-[20px] pr-[29px]" activeOpacity={0.72}>
      <View className="flex-row items-center">
        <View className="mr-[10px]">
          <Icon width={20} height={20} fill="#945C2D" />
        </View>
        <Text className="mr-[10px] font-pretendard-semibold text-[16px] text-ruon-main1">
          {title}
        </Text>
        <Rarrow width={6} height={11} />
      </View>
      <Text className="mt-[10px] font-pretendard-regular text-[15px] leading-[25px] text-ruon-cardText">
        {description}
      </Text>
    </TouchableOpacity>
  );
}
