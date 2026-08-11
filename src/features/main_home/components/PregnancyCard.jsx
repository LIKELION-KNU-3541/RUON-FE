import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Rarrow from '../../../../assets/icons/Rarrow.svg';
import { useResponsiveScale } from '../../../shared/utils/responsive';

export default function PregnancyCard({
  weekLabel = '18',
  detailLabel = '건조함 · 민감함 · 가려움',
  dueDateLabel = '2027.01.16',
}) {
  const { scale, moderateScale } = useResponsiveScale();
  return (
    <TouchableOpacity
      className="flex-row items-center bg-white"
      style={{ marginTop: 20, borderRadius: scale(16), padding: 20 }}
      activeOpacity={0.75}
    >
      <View className="flex-1">
        <Text className="font-pretendard-medium text-ruon-main1" style={{ fontSize: moderateScale(20) }}>
          임신 {weekLabel}주차
        </Text>
        <Text className="mt-[3px] font-pretendard-regular text-ruon-cardSubtext" style={{ fontSize: moderateScale(11) }}>
          {detailLabel}
        </Text>
        <Text className="mt-[12px] font-pretendard-medium text-ruon-text" style={{ fontSize: moderateScale(14) }}>
          예상 출산일 : {dueDateLabel}
        </Text>
      </View>
      <Rarrow width={scale(7)} height={scale(14)} />
    </TouchableOpacity>
  );
}
