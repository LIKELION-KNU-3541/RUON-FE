import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Rarrow from '../../../../assets/icons/Rarrow.svg';

export default function PregnancyCard({
  weekLabel = '18',
  detailLabel = '건조함 · 민감함 · 가려움',
  dueDateLabel = '2027.01.16',
}) {
  return (
    <TouchableOpacity
      className="mt-[20px] flex-row items-center rounded-2xl bg-white px-[20px] py-[20px]"
      activeOpacity={0.75}
    >
      <View className="flex-1">
        <Text className="font-pretendard-medium text-[20px] text-ruon-main1">
          임신 {weekLabel}주차
        </Text>
        <Text className="mt-[3px] font-pretendard-regular text-[11px] text-ruon-cardSubtext">
          {detailLabel}
        </Text>
        <Text className="mt-[12px] font-pretendard-medium text-[14px] text-ruon-text">
          예상 출산일 : {dueDateLabel}
        </Text>
      </View>
      <Rarrow width={7} height={14} />  
    </TouchableOpacity>
  );
}
