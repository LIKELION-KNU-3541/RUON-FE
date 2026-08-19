import React from 'react';
import { ImageBackground, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MoonIcon from '../../../../assets/icons/akar-icons_moon-fill.svg';
import SunIcon from '../../../../assets/icons/morning.svg';
import RUON from '../../../../assets/icons/RUON_brown.svg';
import BottomNavigation from '../../../shared/components/BottomNavigation';
import InfoBox from '../../../shared/components/InfoBox';
import SectionHeader from '../../../shared/components/SectionHeader';
import { useResponsiveScale } from '../../../shared/utils/responsive';
import ConditionCard from '../components/ConditionCard';
import PregnancyCard from '../components/PregnancyCard';
import RoutineCard from '../components/RoutineCard';
import { getTodayRoutine, toRoutineTimeLabel } from '../../routine/api/routineApi';

const backgroundSource = require('../../../../assets/images/MainHome-bg.png');

export default function HomeScreen({
  conditions = [],
  surveyData,
  userProfile,
  onOpenCondition,
  onTabChange,
  userId = process.env.EXPO_PUBLIC_USER_ID ?? 1,
}) {
  const { scale, moderateScale } = useResponsiveScale();
  const [todayRoutine, setTodayRoutine] = React.useState(null);
  const [routineLoading, setRoutineLoading] = React.useState(true);
  const profile = userProfile?.data ?? userProfile;
  const userName = profile?.name?.trim() || '지은';

  React.useEffect(() => {
    const controller = new AbortController();

    setRoutineLoading(true);
    getTodayRoutine(userId, { signal: controller.signal })
      .then(setTodayRoutine)
      .catch((requestError) => {
        if (requestError.name !== 'CanceledError' && requestError.code !== 'ERR_CANCELED') {
          setTodayRoutine(null);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setRoutineLoading(false);
      });

    return () => controller.abort();
  }, [userId]);

  const availableTimeLabel = todayRoutine?.routineTimeAvailable
    ? toRoutineTimeLabel(todayRoutine.routineTimeAvailable)
    : '가능 시간 미등록';
  const morningStepCount = todayRoutine?.steps?.filter(
    (step) => step.timeOfDay === 'MORNING',
  ).length ?? 0;
  const eveningStepCount = todayRoutine?.steps?.filter(
    (step) => step.timeOfDay === 'EVENING',
  ).length ?? 0;
  const morningDescription = routineLoading ? '루틴 불러오는 중' : `${availableTimeLabel}\n총 ${morningStepCount}단계`;
  const eveningDescription = routineLoading ? '루틴 불러오는 중' : `${availableTimeLabel}\n총 ${eveningStepCount}단계`;

  return (
    <ImageBackground source={backgroundSource} resizeMode="cover" style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="dark-content" backgroundColor="#FFF9F1" />
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 45,
            paddingBottom: 105
          }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <RUON width={scale(51)} height={scale(24)} />
            <Text className="font-pretendard-semibold text-ruon-text" style={{ marginTop: 24, fontSize: moderateScale(22), lineHeight: moderateScale(32) }}>{userName}님,{`\n`}오늘 피부는 어떤가요?</Text>
            <Text className="font-pretendard-medium text-ruon-muted" style={{ marginTop: 8, fontSize: moderateScale(14), lineHeight: moderateScale(21) }}>임신 중 달라지는 피부 상태에 맞춰,{`\n`}오늘의 케어를 준비했어요.</Text>
          </View>
          <PregnancyCard surveyData={surveyData} userProfile={profile} />
          <SectionHeader title="오늘의 컨디션" onPress={onOpenCondition} />
          <ConditionCard options={conditions} />
          <SectionHeader title="루틴 요약" />
          <View className="flex-row gap-[18px]">
            <RoutineCard icon={SunIcon} title="아침 루틴" description={morningDescription} />
            <RoutineCard icon={MoonIcon} title="저녁 루틴" description={eveningDescription} />
          </View>
          <View className="-mx-[24px] mt-[28px] h-[6px] bg-[#D8C0AD]" />
          <InfoBox />
        </ScrollView>
      </SafeAreaView>
      <BottomNavigation activeIndex={0} onTabChange={onTabChange} />
    </ImageBackground>
  );
}
