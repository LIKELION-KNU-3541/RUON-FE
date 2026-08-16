import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useResponsiveScale } from '../../../shared/utils/responsive';
import RightArrow from '../../../../assets/icons/Rarrow.svg';
import RoutineGlassBackground from './RoutineGlassBackground';

export default function RoutineProduct({ product, index, theme, onPress }) {
  const { scale, moderateScale } = useResponsiveScale();
  const stepNumber = String(index + 1).padStart(2, '0');
  const isRecommended = product.isRecommended ?? product.recommended ?? false;
  const evening = theme?.screenBackground === '#9A5B2C';

  return (
    <Pressable
      className="overflow-hidden rounded-[16px] border"
      style={{
        backgroundColor: isRecommended ? theme.recommendedCard : theme.card,
        borderColor: isRecommended ? theme.recommendedBorder : theme.border,
      }}
      accessibilityRole="button"
      accessibilityLabel={`${stepNumber}단계 ${product.category}, ${product.productName}`}
      onPress={() => onPress?.(product, index)}
    >
      <RoutineGlassBackground visible={evening && !isRecommended} />
      <View className="h-[216px] flex-row">
        <View className="w-[32%] px-[18px] pb-[16px] pt-[15px]">
          <View
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{
              backgroundColor: isRecommended ? theme.recommendedNumber : theme.number,
              borderWidth: evening && !isRecommended ? 1 : 0,
              borderColor: evening && !isRecommended ? 'rgba(255,249,241,0.42)' : 'transparent',
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
          </View>
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
      </View>
    </Pressable>
  );
}
