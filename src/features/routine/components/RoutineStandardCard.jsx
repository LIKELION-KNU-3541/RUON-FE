import React from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import { useResponsiveScale } from '../../../shared/utils/responsive';
import RightArrow from '../../../../assets/icons/Rarrow.svg';

const eveningStandardBackground = require('../../../../assets/images/RoutineStandard-bg.png');

export default function RoutineStandardCard({
  title,
  content,
  icon: Icon,
  theme,
  backgroundColor,
  titleColor,
  contentColor,
  iconColor,
  onPress,
}) {
  const { scale, moderateScale } = useResponsiveScale();
  const resolvedTitleColor = titleColor ?? theme.text;
  const resolvedContentColor = contentColor ?? theme.subtext;
  const resolvedIconColor = iconColor ?? resolvedContentColor;
  const evening = theme?.screenBackground === '#9A5B2C';
  const showEveningImage = evening && backgroundColor == null;

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={onPress ? `${title} 수정` : undefined}
      disabled={!onPress}
      onPress={onPress}
      className="h-scale(98) flex-1 overflow-hidden rounded-[16px] border"
      style={{
        backgroundColor: showEveningImage ? 'transparent' : backgroundColor ?? theme.card,
        borderColor: showEveningImage ? 'transparent' : theme.border,
        overflow: showEveningImage ? 'visible' : 'hidden',
      }}
    >
      <ImageBackground
        source={showEveningImage ? eveningStandardBackground : undefined}
        resizeMode="stretch"
        className="flex-1 justify-center p-[20px]"
        style={{ alignSelf: 'stretch' }}
      >
        <View className="flex-row items-center justify-between">
          <Text className="font-pretendard-semibold" style={{ color: resolvedTitleColor, fontSize: moderateScale(16) }}>
            {title}
          </Text>
          {onPress && (
            <RightArrow width={scale(6)} height={scale(11)} color={resolvedTitleColor} fill="none" />
          )}
        </View>
        <View className="mt-[20px] flex-row items-center gap-[5px]">
          <Icon width={scale(16)} height={scale(16)} fill={resolvedIconColor} color={resolvedIconColor} />
          <Text className="font-pretendard-regular" style={{ color: resolvedContentColor, fontSize: moderateScale(15) }}>
            {content}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}
