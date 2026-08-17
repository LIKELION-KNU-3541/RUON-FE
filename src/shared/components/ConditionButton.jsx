import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { useResponsiveScale } from '../utils/responsive';

const conditionButtonBackground = require('../../../assets/images/ConditionButton-bg.png');

export default function ConditionButton({ label, selected = false, onPress, prefix, style }) {
  const { moderateScale } = useResponsiveScale();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ selected }}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <ImageBackground
        source={selected ? undefined : conditionButtonBackground}
        resizeMode="stretch"
        className="min-h-[37px] flex-row items-center justify-center rounded-[17px] p-[10px]"
        imageStyle={{ resizeMode: 'stretch' }}
        style={[
          {
            borderWidth: selected ? 1 : 0,
            borderColor: selected ? '#FFF9F1' : 'transparent',
            backgroundColor: selected ? '#FFF9F1' : 'transparent',
            overflow: 'hidden',
          },
          style,
        ]}
      >
        {prefix ? (
          <View className="mr-1">
            {prefix}
          </View>
        ) : null}
        <Text className="font-pretendard-semibold" style={{ color: selected ? '#915626' : '#FFF9F1', fontSize: moderateScale(14) }}>
          {label}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}
