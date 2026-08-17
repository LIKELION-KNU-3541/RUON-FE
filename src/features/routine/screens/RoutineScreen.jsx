import React from 'react';
import { ImageBackground, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../../../shared/components/BottomNavigation';
import SectionHeader from '../../../shared/components/SectionHeader';
import { useResponsiveScale } from '../../../shared/utils/responsive';
import RoutinePreview from '../components/RoutinePreview';
import RoutineReactionCard from '../components/RoutineReactionCard'; 
import RoutineRecommendation from '../components/RoutineRecommendation';
import RoutineStandardCard from '../components/RoutineStandardCard';
import RoutineToggle from '../components/RoutineToggle';
import ConditionIcon from '../../../../assets/icons/condition-icon.svg';
import AvailableTimeIcon from '../../../../assets/icons/availableTime-icon.svg';
import NothingIcon from '../../../../assets/icons/nothing-icon.svg';
import VanityIcon from '../../../../assets/icons/vanity-icon.svg';
import { ROUTINE_THEMES } from '../constants/routineThemes';


const backgroundSource = require('../../../../assets/images/MainHome-bg.png');
const eveningBackgroundSource = require('../../../../assets/images/TodayCheckIn-bg.png');

const ROUTINES = {
  morning: {
    label: '아침', previewTitle: '아침 루틴 미리보기',
    products: [{ label: '클렌징 워터', image: require("../../../../assets/images/CleansingWater.png") }, { label: '수딩젤', image: require("../../../../assets/images/SoothingGel.png") }, { label: '모이스처 로션', image: require("../../../../assets/images/Rotion.png") }],
    tipCondition: '건조', tipTitle: '내일은 보습을 먼저 챙겨요', tipDescription: '기록된 반응을 바탕으로\n세정을 줄이고 보습 중심으로 조정했어요.',
  },
  evening: {
    label: '저녁', previewTitle: '저녁 루틴 미리보기',
    products: [{ label: '클렌징 워터', image: require("../../../../assets/images/CleansingWater.png") }, { label: '수딩 토너', image: require("../../../../assets/images/SoothingToner.png") }, { label: '모이스처 로션', image: require("../../../../assets/images/Rotion.png") }, { label: '집중 크림', image: require("../../../../assets/images/Cream.png") }],
    tipCondition: '편안한',tipTitle: '오늘의 보습 루틴을 유지해요', tipDescription: '오늘 피부 컨디션도 보고 다음 루틴도 이어가요.',
  },
};

export default function RoutinePage({
  mode = 'morning',
  conditions = [],
  availableTime = null,
  onModeChange,
  onTabChange,
  onOpenCondition,
  onOpenStandard,
  onOpenTomorrowRoutine,
}) {
  const { moderateScale } = useResponsiveScale();
  const theme = ROUTINE_THEMES[mode];
  const routine = ROUTINES[mode];
  const evening = mode === 'evening';
  const hasConditions = conditions.length > 0;
  const hasAvailableTime = Boolean(availableTime);

  const content = (
    <SafeAreaView className="flex-1">
      <StatusBar
        barStyle={evening ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <View className="pt-[20px] pb-[5px] px-[24px] justify-between">
        <RoutineToggle mode={mode} onChange={onModeChange} theme={theme}></RoutineToggle>
      </View>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 149}}>
        
        <View className="flex-1" style={{ marginTop: 35, gap: 7}}>
          <Text className="font-pretendard-semibold" style={{ fontSize: moderateScale(22), color: theme.text}}>오늘의 {routine.label} 루틴 안내 </Text>
          <Text className="font-pretandard-medium marginTop-[7px]" style={{ fontSize: moderateScale(14), color: theme.subtext, lineHeight: 20}}>오늘은 보유 제품으로{'\n'}진정과 장벽 케어에 집중할게요.</Text>
        </View>
        
        <SectionHeader
          title="오늘의 기준"
          containerStyle={{ marginTop: 40}}
          theme={theme}
          onPress={onOpenCondition}
        ></SectionHeader>
        <View className="flex-row justify-between gap-[16px] ">
          <RoutineStandardCard
            title="컨디션"
            content={hasConditions ? `${conditions[0]}${conditions.length > 1 ? ` 외 ${conditions.length - 1}개` : ''}` : '기록이 없어요'}
            icon={hasConditions ? ConditionIcon : NothingIcon}
            theme={theme}
          ></RoutineStandardCard>
          <RoutineStandardCard
            title="가능한 시간"
            content={availableTime ?? '기록이 없어요'}
            icon={hasAvailableTime ? AvailableTimeIcon : NothingIcon}
            theme={theme}
          ></RoutineStandardCard>
        </View>
        
        <SectionHeader
          title={routine.previewTitle}
          containerStyle={{ marginTop: 30}}
          theme={theme}
          onPress={onOpenStandard}
        ></SectionHeader>
        <RoutinePreview products={routine.products} evening={evening} />

        <View className="mt-[30px] mb-[10px] flex-row justify-between">
          <Text className="font-pretendard-semibold " style={{fontSize: moderateScale(14), color: theme.text}} >반응 기록</Text>
          <Text className="font-pretendard-medium" style={{fontSize: moderateScale(10), color: theme.subtext}} >기록된 반응은 다음 루틴에 반영돼요</Text>
        </View>
        <RoutineReactionCard theme={theme}></RoutineReactionCard>
      
        <View className="mt-[30px] mb-[10px] flex-row gap-[10px]">
          <VanityIcon fill={theme.text}></VanityIcon>
          <Text className="font-pretendard-semibold" style={{fontSize: moderateScale(14), color: theme.text}} >내일 루틴 추천</Text>
        </View>
        <RoutineRecommendation
          theme={theme}
          routine={routine}
          onPress={onOpenTomorrowRoutine}
        ></RoutineRecommendation>
      </ScrollView>
      <BottomNavigation activeIndex={1} onTabChange={onTabChange} theme={theme} mode={mode} />
      
    </SafeAreaView>

  );

  if (evening) {
    return (
      <ImageBackground source={eveningBackgroundSource} resizeMode="cover" style={{ flex: 1 }}>
        {content}
      </ImageBackground>
    );
  }
  return <ImageBackground source={backgroundSource} resizeMode="cover" style={{ flex: 1 }}>{content}</ImageBackground>;
}
