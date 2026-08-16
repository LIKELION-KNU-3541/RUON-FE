import React from 'react';
import { ImageBackground, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '../../../shared/components/PageHeader';
import RoutineProduct from '../components/RoutineProduct';
import RoutineNotice from '../components/RoutineNotice';
import RoutineConditionModal from '../components/RoutineConditionModal';
import RoutineStandardCard from '../components/RoutineStandardCard';
import { ROUTINE_THEMES } from '../constants/routineThemes';
import ConditionIcon from '../../../../assets/icons/condition-icon.svg';
import AvailableTimeIcon from '../../../../assets/icons/availableTime-icon.svg';
import NothingIcon from '../../../../assets/icons/nothing-icon.svg';

const eveningBackgroundSource = require('../../../../assets/images/TodayCheckIn-bg.png');

const ROUTINE_PRODUCTS = {
  morning: [
    {
      category: '순한 세안',
      productName: '몽디에스 클렌징 워터',
      description: '미산성 클렌징 워터로 아침의 잔여 유분을 순하게 정리해요.',
      usage: '미산성 클렌징 워터로 아침의 잔여 유분을 순하게 정리해요.',
      image: require('../../../../assets/images/CleansingWater.png'),
      imageWidth: 88,
      imageHeight: 136,
      imageMarginTop: 7,
      fromVanity: true,
    },
    {
      category: '진정 케어',
      productName: '닥터올가 카렌듈라 수딩젤',
      description: '카렌듈라꽃수와 보습 성분으로 붉음·열감 부위를 가볍게 진정해요.',
      usage: '시큰·화끈함이 많아 처음에는 좁은 부위에 테스트해 주세요.',
      image: require('../../../../assets/images/SoothingGel.png'),
      imageWidth: 82,
      imageHeight: 122,
      fromVanity: true,
    },
    {
      category: '장벽 보습',
      productName: '차앤맘 피토세린 모이스처 로션',
      description: '임신 중 건조해진 피부의 보습과 장벽 케어를 도와요.',
      usage: '답답하거나 열감이 느껴지면 사용량을 줄여주세요.',
      image: require('../../../../assets/images/Rotion.png'),
      imageWidth: 82,
      imageHeight: 120,
      fromVanity: true,
    },
  ],
  evening: [
    {
      category: '순한 세안',
      productName: '몽디에스 클렌징 워터',
      description: '하루 동안 피부에 쌓인 노폐물을 부드럽게 닦아내요.',
      image: require('../../../../assets/images/CleansingWater.png'),
      imageWidth: 88,
      imageHeight: 136,
      imageMarginTop: 7,
      fromVanity: true,
    },
    {
      category: '진정 케어',
      productName: '닥터올가 카렌듈라 수딩젤',
      description: '민감해진 피부에 수분을 더해 편안하게 진정시켜요.',
      image: require('../../../../assets/images/SoothingGel.png'),
      imageWidth: 82,
      imageHeight: 122,
      fromVanity: true,
    },
    {
      category: '장벽 보습',
      productName: '차앤맘 피토세린 모이스처 로션',
      description: '잠들기 전 피부가 마르지 않도록 보습막을 더해요.',
      image: require('../../../../assets/images/Rotion.png'),
      imageWidth: 82,
      imageHeight: 120,
      fromVanity: true,
    },
  ],
};

export default function RoutineStandardScreen({
  mode = 'morning',
  onBack,
  onOpenCondition,
  conditions = [],
  availableTime = null,
  products,
}) {
  const [conditionModalVisible, setConditionModalVisible] = React.useState(
    conditions.length === 0 || !availableTime,
  );
  const theme = ROUTINE_THEMES[mode];
  const title = mode === 'evening' ? '저녁 루틴' : '아침 루틴';
  const routineProducts = products ?? ROUTINE_PRODUCTS[mode] ?? [];
  const hasConditions = conditions.length > 0;
  const hasAvailableTime = Boolean(availableTime);
  const eveningCriteriaColors = mode === 'evening'
    ? {
        backgroundColor: 'rgba(255,255,255,0.80)',
        titleColor: '#945C2D',
        contentColor: '#BE9D82',
        iconColor: '#BE9D82',
      }
    : {};

  const content = (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: mode === 'evening' ? 'transparent' : theme.screenBackground }}
    >
      <StatusBar
        barStyle={mode === 'evening' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.screenBackground}
      />
      <PageHeader title={title} onBack={onBack} color={theme.text} />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 42 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row justify-between gap-[16px] pt-[20px]">
          <RoutineStandardCard
            title="컨디션"
            content={hasConditions ? `${conditions[0]}${conditions.length > 1 ? ` 외 ${conditions.length - 1}개` : ''}` : '기록이 없어요'}
            icon={hasConditions ? ConditionIcon : NothingIcon}
            theme={theme}
            onPress={onOpenCondition}
            {...eveningCriteriaColors}
          />
          <RoutineStandardCard
            title="가능한 시간"
            content={availableTime ?? '기록이 없어요'}
            icon={hasAvailableTime ? AvailableTimeIcon : NothingIcon}
            theme={theme}
            onPress={onOpenCondition}
            {...eveningCriteriaColors}
          />
        </View>

        <View className="mt-[20px]" style={{ gap: 20 }}>
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
          <RoutineNotice theme={theme} content={"안전한 사용을 위해 제품의 전체 성분과 사용 조건을\n다시 확인하고, 불편감이 지속되면 전문가와 상담해주세요."} />
        </View>
      </ScrollView>
      <RoutineConditionModal
        visible={conditionModalVisible}
        onSelectCondition={() => {
          setConditionModalVisible(false);
          onOpenCondition?.();
        }}
        onDismiss={() => setConditionModalVisible(false)}
      />
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
