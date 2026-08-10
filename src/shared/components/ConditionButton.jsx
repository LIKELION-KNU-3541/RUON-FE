import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useResponsiveScale } from '../utils/responsive';

export default function ConditionButton({ label, selected = false, onPress, prefix }) {
  const { moderateScale } = useResponsiveScale();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className="flex-row h-[37px] items-center justify-center rounded-[16px] bg-[#FFF8F2] px-[10px]"
      style={{
        borderColor: selected ? '#FFF9F1' : 'rgba(255,255,255,0.6)',
        backgroundColor: selected ? '#FFF9F2' : 'rgba(255,255,255,0.08)',
      }}
      activeOpacity={0.75}
      onPress={onPress}
    >
      {prefix ? (
        <Text className="mr-1 font-pretendard-semibold" style={{ color: selected ? '#915626' : '#FFF9F1', fontSize: moderateScale(14) }}>
          {prefix}
        </Text>
      ) : null}
      <Text className="font-pretendard-semibold" style={{ color: selected ? '#915626' : '#FFF9F1', fontSize: moderateScale(14) }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
