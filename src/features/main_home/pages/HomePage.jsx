import React from 'react';
import { ImageBackground, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MoonIcon from '../../../../assets/icons/akar-icons_moon-fill.svg';
import SunIcon from '../../../../assets/icons/morning.svg';
import RUON from '../../../../assets/images/RUON.svg';
import BottomNavigation from '../../../shared/components/BottomNavigation';
import InfoBox from '../../../shared/components/InfoBox';
import SectionHeader from '../../../shared/components/SectionHeader';
import { useResponsiveScale } from '../../../shared/utils/responsive';
import ConditionCard from '../components/ConditionCard';
import PregnancyCard from '../components/PregnancyCard';
import RoutineCard from '../components/RoutineCard';

const backgroundSource = require('../../../../assets/images/MainHome-bg.png');

export default function HomePage({ conditions = [], onOpenCondition, onTabChange }) {
  const { scale, moderateScale } = useResponsiveScale();
  return (
    <ImageBackground source={backgroundSource} resizeMode="cover" style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="dark-content" backgroundColor="#FFF9F1" />
        <ScrollView className="flex-1" style={{ marginBottom: scale(99) }} contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 45, paddingBottom: 130 }} showsVerticalScrollIndicator={false}>
          <View>
            <RUON width={scale(51)} height={scale(24)} />
            <Text className="font-pretendard-semibold text-ruon-text" style={{ marginTop: 24, fontSize: moderateScale(22), lineHeight: moderateScale(32) }}>지은님,{`\n`}오늘 피부는 어떤가요?</Text>
            <Text className="font-pretendard-medium text-ruon-muted" style={{ marginTop: 8, fontSize: moderateScale(14), lineHeight: moderateScale(21) }}>임신 중 달라지는 피부 상태에 맞춰,{`\n`}오늘의 케어를 준비했어요.</Text>
          </View>
          <PregnancyCard />
          <SectionHeader title="오늘의 컨디션" onPress={onOpenCondition} />
          <ConditionCard options={conditions} />
          <SectionHeader title="루틴 요약" />
          <View className="flex-row gap-[18px]">
            <RoutineCard icon={SunIcon} title="아침 루틴" description={'수분 충전 & 보호\n3단계, 12분'} />
            <RoutineCard icon={MoonIcon} title="저녁 루틴" description={'진정 & 재생 케어\n3단계, 15분'} />
          </View>
          <View className="-mx-[24px] mt-[28px] h-[6px] bg-[#D8C0AD]" />
          <InfoBox />
        </ScrollView>
        <BottomNavigation activeIndex={0} onTabChange={onTabChange} />
      </SafeAreaView>
    </ImageBackground>
  );
}
