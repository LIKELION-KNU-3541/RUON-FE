import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useResponsiveScale } from '../../../shared/utils/responsive';
import Rarrow from '../../../../assets/icons/Rarrow.svg';
import RoutineGlassBackground from './RoutineGlassBackground';

export default function RoutineRecommendation({ routine, theme, onPress }) {
  const { scale, moderateScale } = useResponsiveScale();
  const evening = theme?.screenBackground === '#9A5B2C';

  return (
    <Pressable
      className="flex-row items-center overflow-hidden rounded-[21px] border p-[20px]"
      style={{ backgroundColor: theme.card, borderColor: theme.border }}
      accessibilityRole="button"
      accessibilityLabel={routine.tipTitle}
      onPress={onPress}
    >
      <RoutineGlassBackground visible={evening} />
      <View className="flex-1">
        <View className="self-start rounded-[6px] p-[4px]" style={{ backgroundColor: theme.badge }}>
          <Text className="font-pretendard-semibold" style={{ fontSize: moderateScale(6), color: theme.revtext }}>
            {routine.tipCondition} 반응 반영
          </Text>
        </View>
        <Text className="mt-[5px] font-pretendard-semibold" style={{ color: theme.text, fontSize: moderateScale(14)}}>{routine.tipTitle}</Text>
        <Text className="mt-[5px] font-pretendard-regular leading-[12px]" style={{ color: theme.subtext, fontSize: moderateScale(10)}}>{routine.tipDescription}</Text>
      </View>
      <Rarrow
        width={scale(6)}
        height={scale(11)}
        color={theme.text}
      />
    </Pressable>
  );
}
