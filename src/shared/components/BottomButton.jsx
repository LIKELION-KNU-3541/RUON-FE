import React from 'react';
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native';

const FIGMA_WIDTH = 360;
const FIGMA_HEIGHT = 800;

const INDICATOR = {
  1: require('../../../assets/images/glass_button/indicator1@x3.png'),
  2: require('../../../assets/images/glass_button/indicator2@x3.png'),
  3: require('../../../assets/images/glass_button/indicator3@x3.png'),
};

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

      {/* Optional Pagination Indicator */}
      {activeDot && (
        <Image
          source={INDICATOR[activeDot]}
          style={{ width: scaleW(64), height: scaleH(8), marginBottom: scaleH(28) }}
          resizeMode="stretch"
        />
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
