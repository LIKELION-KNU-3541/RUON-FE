import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Rarrow from '../../../assets/icons/Rarrow.svg';
import { useResponsiveScale } from '../utils/responsive';

export default function SectionHeader({ title, actionLabel = '자세히 보기', onPress }) {
  const { scale, moderateScale } = useResponsiveScale();
  return (
    <View className="mt-[20px] mb-[10px] flex-row items-center justify-between">
      <Text className="font-pretendard-semibold text-ruon-text" style={{ fontSize: moderateScale(14) }}>
        {title}
      </Text>
      <TouchableOpacity className="flex-row items-center" activeOpacity={0.65} onPress={onPress}>
        <Text className="mr-[10px] font-pretendard-medium text-ruon-text" style={{ fontSize: moderateScale(10) }}>
          {actionLabel}
        </Text>
        <Rarrow width={scale(3)} height={scale(6)} />
      </TouchableOpacity>
    </View>
  );
}
