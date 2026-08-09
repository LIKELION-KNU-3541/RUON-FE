import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import MoonIcon from '../../../../assets/icons/akar-icons_moon-fill.svg';
import SunIcon from '../../../../assets/icons/morning.svg';
import RUON from '../../../../assets/images/RUON.svg';
import BackgroundImage from '../../../shared/components/BackgroundImage';
import BottomNavigation from '../../../shared/components/BottomNavigation';
import InfoBox from '../../../shared/components/InfoBox';
import SectionHeader from '../../../shared/components/SectionHeader';
import ConditionCard from '../components/ConditionCard';
import PregnancyCard from '../components/PregnancyCard';
import RoutineCard from '../components/RoutineCard';

export default function HomePage() {
  return (
    <SafeAreaView className="flex-1 bg-ruon-sub2">
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F1" />
      <BackgroundImage />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 44, paddingBottom: 130 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="pt-[8px]">
          <RUON width={51} height={24}/>
          <Text className="mt-[24px] font-pretendard-semibold text-main-title text-ruon-text">
            지은님,
            {'\n'}
            오늘 피부는 어떤가요?
          </Text>
          <Text className="mt-[8px] font-pretendard-medium text-sub1 text-ruon-muted">
            임신 중 달라지는 피부 상태에 맞춰,
            {'\n'}
            오늘의 케어를 준비했어요.
          </Text>
        </View>

        <PregnancyCard />

        <SectionHeader title="오늘의 컨디션" />
        <ConditionCard options={['건조함', '민감함', '가려움', '붓기', '피부결']} />

        <SectionHeader title="루틴 요약" />
        <View className="flex-row gap-[18px]">
          <RoutineCard
            icon={SunIcon}
            title="아침 루틴"
            description={'수분 충전 & 보호\n3단계, 12분'}
          />
          <RoutineCard
            icon={MoonIcon}
            title="저녁 루틴"
            description={'진정 & 재생 케어\n3단계, 15분'}
          />
        </View>

        <View className="-mx-[24px] mt-[28px] h-[6px] bg-[#D8C0AD]" />
        <InfoBox />
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
}
