import React from 'react';
import { ImageBackground, Image, Text, View } from 'react-native';

const backgrounds = {
  morning: require('../../../../assets/images/MorningRoutine-bg.png'),
  evening: require('../../../../assets/images/EveningRoutine-bg.png'),
};

function formatProductLabel(label = '') {
  const words = label.trim().split(/\s+/);
  if (words.length < 2) return label;

  let bestSplit = 1;
  let smallestDifference = Infinity;

  for (let index = 1; index < words.length; index += 1) {
    const firstLineLength = words.slice(0, index).join(' ').length;
    const secondLineLength = words.slice(index).join(' ').length;
    const difference = Math.abs(firstLineLength - secondLineLength);

    if (difference < smallestDifference) {
      smallestDifference = difference;
      bestSplit = index;
    }
  }

  return `${words.slice(0, bestSplit).join(' ')}\n${words.slice(bestSplit).join(' ')}`;
}

function Bottle({ index, product }) {
  const hasImage = Boolean(product.image);

  return (
    <View className="relative h-[240px] w-[55px] items-center">
      <Text className="absolute top-[28px] font-pretendard font-extrabold text-[10px] text-[#FBF9F7]">
        Step 0{index + 1}
      </Text>
      <View className="absolute top-[82px] h-[96px] w-[55px] items-center justify-center">
        {hasImage ? (
          <Image
            resizeMode="contain"
            source={product.image}
            style={{ width: 55, height: 96 }}
          />
        ) : (
          <View className="h-[72px] w-[34px] rounded-[8px] bg-white/30" />
        )}
      </View>
      <Text
        className="absolute bottom-[25px] w-[90px] text-center font-pretendard-regular text-[10px] leading-[13px] text-[#FBF9F7]"
        numberOfLines={2}
      >
        {formatProductLabel(product.label)}
      </Text>
    </View>
  );
}

export default function RoutinePreview({ products, evening }) {
  return (
    <ImageBackground className="relative overflow-hidden h-[240px] rounded-[16px]" 
      source={evening ? backgrounds.evening : backgrounds.morning} style={{ flex: 1}}>
      <View className="relative h-[240px] items-center overflow-hidden rounded-[18px]">
        {products.length === 0 && (
          <View className="flex-1 items-center justify-center px-[24px]">
            <Text className="text-center font-pretendard-medium text-[12px] text-[#FBF9F7]">
              등록된 루틴 제품이 없어요.
            </Text>
          </View>
        )}
        {products.length > 0 && (
          <>
        <View className="absolute left-[42px] right-[42px] top-[63px] h-2">
          <View
            className="absolute left-0 right-0 h-[1px] bg-white/80"
            style={{ top: '50%', transform: [{ translateY: -0.5 }] }}
          />
          <View className="absolute left-[11px] top-0 w-[254px] flex-row justify-between">
            {products.map((product, index) => (
              <View key={product.id ?? `${product.label}-${index}`} className="w-[55px] items-center">
                <View className="rounded-[50%] w-2 h-2 bg-[#FBF9F7]" />
              </View>
            ))}
          </View>
        </View>
        <View className="absolute left-[53px] top-0 h-[240px] w-[254px] flex-row justify-between">
          {products.map((product, index) => <Bottle key={product.id ?? `${product.label}-${index}`} index={index} product={product} />)}</View>
          </>
        )}
      </View>
    </ImageBackground>
  );
}
