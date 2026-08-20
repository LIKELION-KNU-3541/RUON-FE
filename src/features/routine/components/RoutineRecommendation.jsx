import React from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import { useResponsiveScale } from '../../../shared/utils/responsive';
import Rarrow from '../../../../assets/icons/Rarrow.svg';
const eveningRecommendationBackground = require('../../../../assets/images/RoutineRecommendation-bg.png');

const REACTION_CONDITIONS = {
  1: '건조',
  2: '홍조',
  3: '평소',
  4: '편안',
  5: '촉촉',
};

export default function RoutineRecommendation({ recommendation, theme, onPress }) {
  const { scale, moderateScale } = useResponsiveScale();
  const evening = theme?.screenBackground === '#9A5B2C';
  const tipCondition = REACTION_CONDITIONS[recommendation?.basedOnReactionScore];
  const tipTitle = recommendation?.recommendedAction ?? '내일 루틴을 준비하고 있어요';
  const tipDescription = recommendation?.explanation ?? '오늘의 반응을 바탕으로 추천을 불러오고 있어요.';

  return (
    <Pressable
      className="overflow-hidden rounded-[21px] border"
      style={{
        backgroundColor: evening ? 'transparent' : theme.card,
        borderColor: evening ? 'transparent' : theme.border,
        overflow: evening ? 'visible' : 'hidden',
        width: '100%',
        alignSelf: 'stretch',
      }}
      accessibilityRole="button"
      accessibilityLabel={tipTitle}
      onPress={onPress}
    >
      <ImageBackground
        source={evening ? eveningRecommendationBackground : undefined}
        resizeMode="stretch"
        className="flex-row items-center p-[20px]"
        style={{ alignSelf: 'stretch' }}
      >
        <View className="flex-1">
          <View className="self-start rounded-[6px] p-[4px]" style={{ backgroundColor: theme.badge }}>
            <Text className="font-pretendard-semibold" style={{ fontSize: moderateScale(6), color: theme.revtext }}>
              {tipCondition ? `${tipCondition} 반응 반영` : '반응 분석 중'}
            </Text>
          </View>
          <Text className="mt-[5px] font-pretendard-semibold" style={{ color: theme.text, fontSize: moderateScale(14)}}>{tipTitle}</Text>
          <Text className="mt-[5px] font-pretendard-regular leading-[12px]" style={{ color: theme.text, fontSize: moderateScale(10)}}>{tipDescription}</Text>
        </View>
        <Rarrow
          width={scale(6)}
          height={scale(11)}
          color={theme.text}
        />
      </ImageBackground>
    </Pressable>
  );
}
