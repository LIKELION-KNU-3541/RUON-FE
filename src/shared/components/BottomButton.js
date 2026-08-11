import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';

const FIGMA_WIDTH = 360;
const FIGMA_HEIGHT = 800;

/**
 * Common Bottom Action / Confirm Button Component
 * Supports unified Figma sizing (360x800 base scale), optional pagination dots, and optional previous step link.
 */
export default function BottomButton({
  title = '다음',
  onPress,
  activeDot,
  onPrev,
  prevText = '이전 단계 수정하기',
  disabled = false,
}) {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const scaleW = (px) => (px / FIGMA_WIDTH) * SCREEN_WIDTH;
  const scaleH = (px) => (px / FIGMA_HEIGHT) * SCREEN_HEIGHT;

  return (
    <View
      style={{
        position: 'absolute',
        left: scaleW(24),
        right: scaleW(24),
        bottom: scaleH(45),
      }}
      className="items-center z-10"
    >
      {/* Optional Previous Link */}
      {onPrev && (
        <TouchableOpacity onPress={onPrev} className="mb-4">
          <Text className="text-[#FFF9F1]/80 text-[14px] font-light underline">
            {prevText}
          </Text>
        </TouchableOpacity>
      )}

      {/* Optional Pagination Indicator Dots */}
      {activeDot && (
        <View className="flex-row justify-center items-center gap-2 mb-4">
          <View
            className={`h-[8px] rounded-full ${activeDot === 1 ? 'w-[32px] bg-[#FFF9F1]' : 'w-[8px] bg-[#D3C7B7]/40'
              }`}
          />
          <View
            className={`h-[8px] rounded-full ${activeDot === 2 ? 'w-[32px] bg-[#FFF9F1]' : 'w-[8px] bg-[#D3C7B7]/40'
              }`}
          />
          <View
            className={`h-[8px] rounded-full ${activeDot === 3 ? 'w-[32px] bg-[#FFF9F1]' : 'w-[8px] bg-[#D3C7B7]/40'
              }`}
          />
        </View>
      )}

      {/* Main Action Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        disabled={disabled}
        style={{ height: scaleH(52) }}
        className="w-full bg-[#FFF9F1] rounded-[20px] items-center justify-center shadow-lg"
      >
        <Text className="text-[#945C2D] font-semibold text-[16px] tracking-tight">
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
