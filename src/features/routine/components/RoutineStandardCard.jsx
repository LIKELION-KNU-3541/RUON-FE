import React from 'react';
import { Text, View } from 'react-native';
import { useResponsiveScale } from '../../../shared/utils/responsive';

export default function RoutineStandardCard({
  title,
  content,
  icon: Icon,
  theme,
  backgroundColor,
  titleColor,
  contentColor,
  iconColor,
}) {
  const { scale, moderateScale } = useResponsiveScale();
  const resolvedTitleColor = titleColor ?? theme.text;
  const resolvedContentColor = contentColor ?? theme.text;
  const resolvedIconColor = iconColor ?? resolvedContentColor;

  return (
    <View
      className="h-scale(98) flex-1 justify-center rounded-[16px] border p-[20px]"
      style={{ backgroundColor: backgroundColor ?? theme.card, borderColor: theme.border }}
    >
      <Text className="font-pretendard-semibold" style={{ color: resolvedTitleColor, fontSize: moderateScale(16) }}>
        {title}
      </Text>
      <View className="mt-[20px] flex-row items-center gap-[5px]">
        <Icon width={scale(16)} height={scale(16)} fill={resolvedIconColor} color={resolvedIconColor} />
        <Text className="font-pretendard-regular" style={{ color: resolvedContentColor, fontSize: moderateScale(15) }}>
          {content}
        </Text>
      </View>
    </View>
  );
}
