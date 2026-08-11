import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Arrow from '../../../assets/icons/Larrow.svg';
import { useResponsiveScale } from '../utils/responsive';

export default function PageHeader({ title, onBack, color = '#FFF9F1' }) {
  const { moderateScale } = useResponsiveScale();

  return (
    <View className="mt-[40px] h-[50px] w-full flex-row items-center justify-center">
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="뒤로 가기"
        className="absolute left-[30px] h-[50px] w-11 justify-center"
        activeOpacity={0.65}
        onPress={onBack}
      >
        <Arrow stroke={color} />
      </TouchableOpacity>
      <Text className="font-pretendard-medium" style={{ color, fontSize: moderateScale(18) }}>
        {title}
      </Text>
    </View>
  );
}
