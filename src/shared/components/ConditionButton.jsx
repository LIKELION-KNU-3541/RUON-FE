import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useResponsiveScale } from '../utils/responsive';

export default function ConditionButton({ label, selected = false, onPress, prefix }) {
  const { moderateScale } = useResponsiveScale();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className="flex-row min-h-[37px] items-center justify-center rounded-[17px] p-[10px]"
      style={{
        borderWidth: 1,
        borderColor: selected ? '#FFF9F1' : 'rgba(255, 255, 255, 0.38)',
        backgroundColor: selected ? '#FFF9F1' : 'transparent',
        overflow: 'hidden',
        ...(!selected && Platform.OS === 'ios' ? {
          shadowColor: '#5D3216',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.14,
          shadowRadius: 4,
        } : {}),
      }}
      activeOpacity={0.75}
      onPress={onPress}
    >
      {!selected ? (
        Platform.OS === 'ios' ? (
          <BlurView
            pointerEvents="none"
            intensity={22}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
        ) : (
          <LinearGradient
            pointerEvents="none"
            colors={[
              'rgba(255, 249, 241, 0.2)',
              'rgba(255, 250, 245, 0.03)',
              'rgba(255, 250, 245, 0.02)',
              'rgba(255, 249, 241, 0.2)',
            ]}
            locations={[0, 0.35, 0.65, 1]}
            start={{ x: 0.45, y: 0 }}
            end={{ x: 0.55, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        )
      ) : null}

      {prefix ? (
        <View className="mr-1">
          {prefix}
        </View>
      ) : null}
      <Text className="font-pretendard-semibold" style={{ color: selected ? '#915626' : '#FFF9F1', fontSize: moderateScale(14) }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
