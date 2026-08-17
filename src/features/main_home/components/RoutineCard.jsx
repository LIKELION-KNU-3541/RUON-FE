import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Rarrow from '../../../../assets/icons/Rarrow.svg';
import { useResponsiveScale } from '../../../shared/utils/responsive';

export default function RoutineCard({ icon, title, description }) {
  const Icon = icon;
  const { scale, moderateScale } = useResponsiveScale();

  return (
    <TouchableOpacity className="flex-1 bg-white" style={{ borderRadius: scale(16), paddingVertical: 24, paddingHorizontal: 20 }} activeOpacity={0.72}>
      <View className="flex-row items-center">
        <View className="mr-[10px]">
        <Icon
          width={scale(20)}
          height={scale(20)}
          color="#945C2D"
          fill="#945C2D"
        />
        </View>
        <Text className="mr-[10px] font-pretendard-semibold text-ruon-main1" style={{ fontSize: moderateScale(16) }}>
          {title}
        </Text>
        <Rarrow width={scale(6)} height={scale(11)} />
      </View>
      <Text className="mt-[10px] font-pretendard-regular text-ruon-cardText" style={{ fontSize: moderateScale(15), lineHeight: moderateScale(25) }}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}
