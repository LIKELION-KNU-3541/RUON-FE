import React from 'react';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';
import { useResponsiveScale } from '../../../shared/utils/responsive';
import RightArrow from '../../../../assets/icons/Rarrow.svg';

const eveningCardBackground = require('../../../../assets/images/RoutineProduct-bg.png');
const eveningNumberBackground = require('../../../../assets/images/RoutineProductNum-bg.png');

export default function RoutineProduct({ product, index, theme, onPress }) {
  const { scale, moderateScale } = useResponsiveScale();
  const stepNumber = String(index + 1).padStart(2, '0');
  const isRecommended = product.isRecommended ?? product.recommended ?? false;
  const evening = theme?.screenBackground === '#9A5B2C';
  const showEveningImage = evening && !isRecommended;

  return (
    <Pressable
      className="overflow-hidden rounded-[16px] border"
      style={{
        backgroundColor: isRecommended ? theme.recommendedCard : showEveningImage ? 'transparent' : theme.card,
        borderColor: isRecommended ? theme.recommendedBorder : showEveningImage ? 'transparent' : theme.border,
        overflow: showEveningImage ? 'visible' : 'hidden',
        width: '100%',
        alignSelf: 'stretch',
      }}
      accessibilityRole="button"
      accessibilityLabel={`${stepNumber}단계 ${product.category}, ${product.productName}`}
      onPress={() => onPress?.(product, index)}
    >
      <ImageBackground
        source={showEveningImage ? eveningCardBackground : undefined}
        resizeMode="stretch"
        className="h-[216px] flex-row"
        style={{ alignSelf: 'stretch' }}
      >
        <View className="w-[32%] px-[18px] pb-[16px] pt-[15px]">
          <ImageBackground
            source={showEveningImage ? eveningNumberBackground : undefined}
            resizeMode="stretch"
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{
              backgroundColor: isRecommended ? theme.recommendedNumber : showEveningImage ? 'transparent' : theme.number,
              borderWidth: evening && !isRecommended && !showEveningImage ? 1 : 0,
              borderColor: evening && !isRecommended && !showEveningImage ? 'rgba(255,249,241,0.42)' : 'transparent',
            }}
          >
            <Text
              className="font-pretendard-semibold"
              style={{
                color: isRecommended ? theme.recommendedNumberText : '#FFF9F1',
                fontSize: moderateScale(15),
              }}
            >
              {stepNumber}
            </Text>
          </ImageBackground>
          <Image
            source={product.image}
            resizeMode="contain"
            style={{ width: scale(60), height: scale(110), margin: scale(20), alignSelf: 'center' }}
          />
        </View>

        <View className="w-[68%] pb-[22px] pr-[24px] pt-[27px]">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-[12px]">
              <View className="flex-row items-center" style={{ gap: scale(7) }}>
                <Text className="font-pretendard-semibold" style={{ color: theme.text, fontSize: moderateScale(16) }}>
                  {product.category}
                </Text>
                {(isRecommended || product.fromVanity) && (
                  <View
                    className="rounded-[7px] px-[6px] py-[5px]"
                    style={{ backgroundColor: isRecommended ? theme.recommendedBadge : '#E1F7D6' }}
                  >
                    <Text
                      className="font-pretendard-semibold"
                      style={{
                        color: isRecommended ? theme.recommendedBadgeText : '#63AB63',
                        fontSize: moderateScale(6),
                      }}
                    >
                      {isRecommended ? '추천' : '내 화장대'}
                    </Text>
                  </View>
                )}
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
