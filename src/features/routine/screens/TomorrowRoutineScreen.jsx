import React from 'react';
import { ImageBackground, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '../../../shared/components/PageHeader';
import { useResponsiveScale } from '../../../shared/utils/responsive';
import RoutineNotice from '../components/RoutineNotice';
import RoutineProduct from '../components/RoutineProduct';
import { ROUTINE_THEMES } from '../constants/routineThemes';
import VanityIcon from '../../../../assets/icons/vanity-icon.svg';

const eveningBackgroundSource = require('../../../../assets/images/TodayCheckIn-bg.png');

const TOMORROW_PRODUCTS = {
  morning: [
    {
      category: '부드러운 세정',
      productName: '세타필 젠틀 스킨 클렌저',
      description: '피부 당김을 고려해 비거품 타입의 세정 제품을 제안했어요.',
      image: require('../../../../assets/images/CleansingWater.png'),
      isRecommended: true,
    },
    {
      category: '보습 집중',
      productName: '차앤맘 피토세린 모이스처 로션',
      description: '건조한 볼과 입가부터 충분히 보습해요.',
      image: require('../../../../assets/images/Rotion.png'),
      fromVanity: true,
    },
  ],
  evening: [
    {
      category: '순한 세안',
      productName: '몽디에스 클렌징 워터',
      description: '피부에 남은 노폐물을 자극 없이 부드럽게 정리해요.',
      image: require('../../../../assets/images/CleansingWater.png'),
      fromVanity: true,
    },
    {
      category: '수분 진정',
      productName: '닥터올가 카렌듈라 수딩젤',
      description: '민감해진 피부에 수분을 더해 편안하게 진정시켜요.',
      image: require('../../../../assets/images/SoothingGel.png'),
      fromVanity: true,
    },
    {
      category: '보습 로션',
      productName: '차앤맘 피토세린 모이스처 로션',
      description: '건조한 볼과 입가부터 레이어링해 보습해요.',
      image: require('../../../../assets/images/Rotion.png'),
      fromVanity: true,
    },
  ],
};

export default function TomorrowRoutineScreen({ mode = 'morning', onBack, products }) {
  const { moderateScale } = useResponsiveScale();
  const theme = ROUTINE_THEMES[mode];
  const routineProducts = products ?? TOMORROW_PRODUCTS[mode] ?? [];
  const hasRecommendedProduct = routineProducts.some(
    (product) => product.isRecommended ?? product.recommended ?? false,
  );

  const content = (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: mode === 'evening' ? 'transparent' : theme.screenBackground }}
    >
      <StatusBar
        barStyle={mode === 'evening' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.screenBackground}
      />
      <PageHeader title="내일 루틴 추천" onBack={onBack} color={theme.text} />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 42 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center pb-[30px] pt-[10px]">
          <VanityIcon fill={theme.text} width={24} height={24}></VanityIcon>
          <Text
            className="mt-[8px] text-center font-pretendard-semibold"
            style={{ color: theme.text, fontSize: moderateScale(22), lineHeight: moderateScale(32) }}
          >
            {hasRecommendedProduct ? '내일 세정은 부드럽게,\n보습은 듬뿍 챙겨요' : '루틴을 그대로 이어가요'}
          </Text>
          <Text
            className="mt-[15px] text-center font-pretendard-medium"
            style={{ color: theme.subtext, fontSize: moderateScale(14), lineHeight: moderateScale(20) }}
          >
            {hasRecommendedProduct
              ? '세정 제품 교체를 제안하고,\n루틴을 2단계로 줄여 보습에 집중하도록 구성했어요.'
              : '오늘 사용한 제품과 순서가 피부에 편안했어요.\n내일도 같은 루틴을 유지할게요.'}
          </Text>
        </View>

        <View style={{ gap: 20 }}>
          {routineProducts.map((product, index) => (
            <RoutineProduct
              key={product.id ?? `${product.productName}-${index}`}
              product={product}
              index={index}
              theme={theme}
            />
          ))}
        </View>

        <View className="mt-[20px]">
          <RoutineNotice theme={theme} content={"미리 구성한 루틴으로,\n내일 피부 상태와 가능한 시간에 맞게 다시 조정할 수 있어요."} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  if (mode === 'evening') {
    return (
      <ImageBackground source={eveningBackgroundSource} resizeMode="cover" style={{ flex: 1 }}>
        {content}
      </ImageBackground>
    );
  }

  return content;
}
