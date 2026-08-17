import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Rarrow from '../../../assets/icons/Rarrow.svg';
import { useResponsiveScale } from '../utils/responsive';

const DEFAULT_THEME = {
  text: '#945C2D',
  subtext: '#BE9D82',
};

export default function SectionHeader({
  theme = DEFAULT_THEME,
  title,
  actionLabel = '자세히 보기',
  onPress,
  containerStyle,
  titleStyle,
  actionStyle,
  arrowColor,
}) {
  const { scale, moderateScale } = useResponsiveScale();
  const resolvedArrowColor = arrowColor ?? theme.subtext ?? DEFAULT_THEME.subtext;

  return (
    <View className="mt-[20px] mb-[10px] flex-row items-center justify-between" style={containerStyle}>
      <Text className="font-pretendard-semibold" style={[{ fontSize: moderateScale(14), color: theme.text ?? DEFAULT_THEME.text }, titleStyle]}>
        {title}
      </Text>
      {onPress && (
        <TouchableOpacity className="flex-row items-center" activeOpacity={0.65} onPress={onPress}>
          <Text className="mr-[10px] font-pretendard-medium" style={[{ fontSize: moderateScale(10), color: theme.subtext ?? DEFAULT_THEME.subtext }, actionStyle]}>
            {actionLabel}
          </Text>
          <Rarrow width={scale(3)} height={scale(6)} color={resolvedArrowColor} fill="none" />
        </TouchableOpacity>
      )}
    </View>
  );
}
