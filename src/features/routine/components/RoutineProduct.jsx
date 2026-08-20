import React from 'react';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';
import { useResponsiveScale } from '../../../shared/utils/responsive';
import { ROUTINE_CATEGORY_LABELS } from '../constants/routineLabels';
import RightArrow from '../../../../assets/icons/Rarrow.svg';

const eveningCardBackground = require('../../../../assets/images/RoutineProduct-bg.png');
const eveningNumberBackground = require('../../../../assets/images/RoutineProductNum-bg.png');

export default function RoutineProduct({ product, index, theme, onPress }) {
  const { scale, moderateScale } = useResponsiveScale();
  const stepNumber = String(index + 1).padStart(2, '0');
  const productHeading = ROUTINE_CATEGORY_LABELS[product.action]
    ?? product.category
    ?? product.brandName
    ?? '';
  const evening = theme?.screenBackground === '#9A5B2C';
  const showEveningImage = evening;

  return (
    <Pressable
      className="overflow-hidden rounded-[16px] border"
      style={{
        backgroundColor: showEveningImage ? 'transparent' : theme.card,
        borderColor: showEveningImage ? 'transparent' : theme.border,
        overflow: showEveningImage ? 'visible' : 'hidden',
        width: '100%',
        alignSelf: 'stretch',
      }}
      accessibilityRole="button"
      accessibilityLabel={`${stepNumber}단계 ${productHeading}, ${product.productName}`}
      onPress={() => onPress?.(product, index)}
    >
      <ImageBackground
        source={showEveningImage ? eveningCardBackground : undefined}
        resizeMode="stretch"
        className="h-[216px] flex-row"
        style={{ alignSelf: 'stretch' }}
      >
        <View className="w-[32%] px-[18px] pb-[14px] pt-[15px]">
          <ImageBackground
            source={showEveningImage ? eveningNumberBackground : undefined}
            resizeMode="stretch"
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{
              backgroundColor: showEveningImage ? 'transparent' : theme.number,
            }}
          >
            <Text
              className="font-pretendard-semibold"
              style={{
                color: '#FFF9F1',
                fontSize: moderateScale(15),
              }}
            >
              {stepNumber}
            </Text>
          </ImageBackground>
          <Image
            source={product.image}
            resizeMode="contain"
            style={{ width: scale(80), height: scale(132), marginTop: scale(10) }}
          />
        </View>

        <View className="w-[68%] pb-[22px] pr-[24px] pt-[27px]">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-[12px]">
              <View className="flex-row items-center" style={{ gap: scale(7) }}>
                <Text className="font-pretendard-semibold" style={{ color: theme.text, fontSize: moderateScale(16) }}>
                  {productHeading}
                </Text>
                <View className="rounded-[7px] bg-[#E1F7D6] px-[6px] py-[5px]">
                  <Text
                    className="font-pretendard-semibold text-[#63AB63]"
                    style={{ fontSize: moderateScale(6) }}
                  >
                    내 화장대
                  </Text>
                </View>
              </View>
              <Text
                className="mt-[5px] font-pretendard-semibold"
                style={{ color: theme.text, fontSize: moderateScale(15), lineHeight: moderateScale(20) }}
              >
                {product.productName}
              </Text>
            </View>
            <RightArrow width={scale(8)} height={scale(15)} color={theme.text} />
          </View>

          <Text
            className="absolute bottom-[25px] left-0 right-[24px] font-pretendard-regular"
            style={{ color: theme.text, fontSize: moderateScale(12), lineHeight: moderateScale(17) }}
          >
            {product.description}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}
