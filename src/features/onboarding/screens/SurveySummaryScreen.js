import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BottomButton from '../../../shared/components/BottomButton';
import InputGlass from '../../../shared/components/InputGlass';

// PNG line art images are exported at @3x resolution
// 4p5p6p_top_circle.png: 612x762, 204x254
// 4p5p6p_btm_circle.png: 426x855, 142x285

const FIGMA_WIDTH = 360;
const FIGMA_HEIGHT = 800;

export default function SurveySummaryScreen({ onPrev, onComplete, surveyData }) {
  const condition = surveyData?.condition || '임신중';
  const weeks = surveyData?.weeks || '24주';
  const concerns = surveyData?.concerns?.join(' · ') || '건조함· 민감함· 가려움';
  const skinType = surveyData?.skinType || '건성';

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const scaleW = (px) => (px / FIGMA_WIDTH) * SCREEN_WIDTH;
  const scaleH = (px) => (px / FIGMA_HEIGHT) * SCREEN_HEIGHT;

  return (
    <View className="flex-1 bg-[#4A311F] relative">
      <StatusBar style="light" />

      {/* 1. Base Background Image (welcome_bg.png) */}
      <ImageBackground
        source={require('../../../../assets/images/4p5p6p_bg.png')}
        className="flex-1 relative"
        resizeMode="cover"
      >
        {/* 2. Circle Line Art 4p5p6p_bg.png 다른페이지와 같은 이유로 비활성화
        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 1 }}>
          <Image source={require('../../../../assets/images/4p5p6p_top_circle.png')} style={{ position: 'absolute', right: 0, top: 0, width: scaleW(204), height: scaleW(254) }} resizeMode="stretch" />
          <Image source={require('../../../../assets/images/4p5p6p_btm_circle.png')} style={{ position: 'absolute', left: 0, top: scaleH(440), width: scaleW(142), height: scaleW(285) }} resizeMode="stretch" />
        </View>
        */}

        {/* 3. Header Title & Subtitle (top: 84px) */}
        <View style={{ position: 'absolute', left: scaleW(24), right: scaleW(24), top: scaleH(84) }} className="items-center z-10">
          <Text className="text-[#FFF9F1] text-[24px] font-bold leading-[34px] text-center">
            맞춤 케어 준비가 완료되었어요
          </Text>
          <Text style={{ marginTop: scaleH(10) }} className="text-[#FFF9F1] text-[14px] font-medium leading-[24px] text-center">
            {"입력해주신 정보를 바탕으로\n지금의 나에게 맞는 케어를 시작해볼게요."}</Text>
        </View>

        {/* 4. Glass Check Asset — 헤더 하단(176)과 표 상단(376) 사이 중앙 정렬, 136px x 136px */}
        <View style={{ position: 'absolute', left: 0, right: 0, top: scaleH(208) }} className="items-center justify-center z-10">
          <Image
            source={require('../../../../assets/images/glass_button/glass_check@x3.png')}
            style={{ width: scaleW(136), height: scaleW(136) }}
            resizeMode="contain"
          />
        </View>

        {/* 5. Summary Details Card (top: 376px, height: 228px) */}
        <InputGlass
          glass="table"
          style={{
            position: 'absolute',
            left: scaleW(24),
            top: scaleH(376),
            width: scaleW(312),
            height: scaleH(228),
            paddingTop: scaleH(20),
            paddingBottom: scaleH(20),
            paddingLeft: scaleW(16),
            paddingRight: scaleW(13),
          }}
          className="z-10"
        >
          <View style={{ flex: 1, gap: scaleH(20) }}>
            {/* Row 1: 현재 상태 */}
            <View style={{ gap: scaleH(20) }}>
              <View className="flex-row justify-between items-center">
                <Text className="text-white text-[14px] leading-[17px] font-semibold">현재 상태</Text>
                <Text className="text-white text-[14px] leading-[17px] font-normal">{condition}</Text>
              </View>
              <View style={{ height: 0, borderBottomWidth: 0.5, borderBottomColor: '#F7C79E' }} />
            </View>

            {/* Row 2: 임신 주차 */}
            <View style={{ gap: scaleH(20) }}>
              <View className="flex-row justify-between items-center">
                <Text className="text-white text-[14px] leading-[17px] font-semibold">임신 주차</Text>
                <Text className="text-white text-[14px] leading-[17px] font-normal">{weeks}</Text>
              </View>
              <View style={{ height: 0, borderBottomWidth: 0.5, borderBottomColor: '#F7C79E' }} />
            </View>

            {/* Row 3: 피부 고민 */}
            <View style={{ gap: scaleH(20) }}>
              <View className="flex-row justify-between items-center">
                <Text className="text-white text-[14px] leading-[17px] font-semibold">피부 고민</Text>
                <Text className="text-white text-[14px] leading-[17px] font-normal max-w-[180px]" numberOfLines={1}>
                  {concerns}
                </Text>
              </View>
              <View style={{ height: 0, borderBottomWidth: 0.5, borderBottomColor: '#F7C79E' }} />
            </View>

            {/* Row 4: 피부 타입 (구분선 없음) */}
            <View className="flex-row justify-between items-center">
              <Text className="text-white text-[14px] leading-[17px] font-semibold">피부 타입</Text>
              <Text className="text-white text-[14px] leading-[17px] font-normal">{skinType}</Text>
            </View>
          </View>
        </InputGlass>

        {/* 6. Previous Step Link (top: 634px) */}
        <View style={{ position: 'absolute', left: 0, right: 0, top: scaleH(634) }} className="items-center justify-center z-10">
          <TouchableOpacity onPress={onPrev} activeOpacity={0.7}>
            <Text className="text-[#FFF9F1] text-[14px] leading-[26px] font-light underline">이전 단계 수정하기</Text>
          </TouchableOpacity>
        </View>

        {/* 7. Reusable Bottom Action Button */}
        <BottomButton
          title="시작하기"
          onPress={onComplete}
        />
      </ImageBackground>
    </View>
  );
}
