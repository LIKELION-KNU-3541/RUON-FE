import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

const CHIP_HORIZONTAL_PADDING = 20;
const CHIP_GAP = 10;
const estimateChipWidth = (label) =>
  [...label].reduce((width, character) => width + (character === ' ' ? 5.5 : 11), CHIP_HORIZONTAL_PADDING);

export default function ConditionCard({ options = [] }) {
  const { width } = useWindowDimensions();
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const availableWidth = measuredWidth || width - 88;

  const visibleCount = useMemo(() => {
    const optionWidths = options.map(estimateChipWidth);
    const totalWidth = optionWidths.reduce((sum, itemWidth) => sum + itemWidth, 0)
      + Math.max(options.length - 1, 0) * CHIP_GAP;
    if (totalWidth <= availableWidth) return options.length;

    for (let count = options.length - 1; count >= 0; count -= 1) {
      const hidden = options.length - count;
      const overflowWidth = estimateChipWidth(`외 (${hidden})개`);
      const chipsWidth = optionWidths.slice(0, count).reduce((sum, itemWidth) => sum + itemWidth, 0);
      const gapCount = count > 0 ? count : 0;
      if (chipsWidth + overflowWidth + gapCount * CHIP_GAP <= availableWidth) return count;
    }
    return 0;
  }, [availableWidth, options]);

  const visibleOptions = options.slice(0, visibleCount);
  const hiddenCount = options.length - visibleCount;

  return (
    <View className="h-[113px] overflow-hidden rounded-2xl bg-white px-[20px] py-[24px]">
      <Text className="mb-[14px] font-pretendard-regular text-[15px] text-[#9D6B48]">
        오늘의 피부 상태를 알려주세요
      </Text>
      <View className="flex-row gap-[10px] overflow-hidden" onLayout={({ nativeEvent }) => setMeasuredWidth(nativeEvent.layout.width)}>
        {visibleOptions.map((item) => (
          <TouchableOpacity key={item} className="h-[33px] items-center justify-center rounded-full bg-ruon-main1 p-[10px]" activeOpacity={0.7}>
            <Text className="font-pretendard-medium text-[11px] text-white">{item}</Text>
          </TouchableOpacity>
        ))}
        {hiddenCount > 0 && (
          <TouchableOpacity className="h-[33px] items-center justify-center rounded-full bg-ruon-main1 p-[10px]" activeOpacity={0.7}>
            <Text className="font-pretendard-medium text-[11px] text-white">외 ({hiddenCount})개</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
