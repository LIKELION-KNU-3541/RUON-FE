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
import { SvgXml } from 'react-native-svg';
import BottomButton from '../../../shared/components/BottomButton';
import { checkSvgXml } from '../../../../assets/images/check_svg';

// PNG line art images are exported at @3x resolution
// 4p5p6p_top_circle.png: 612x762, 204x254
// 4p5p6p_btm_circle.png: 426x855, 142x285

const FIGMA_WIDTH = 360;
const FIGMA_HEIGHT = 800;

export default function SurveySummaryScreen({ onPrev, surveyData }) {
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

        {/* 4. Exact check.svg Vector Asset (top: 210px, 96px x 96px) */}
        <View style={{ position: 'absolute', left: 0, right: 0, top: scaleH(210) }} className="items-center justify-center z-10">
          <SvgXml xml={checkSvgXml} width={scaleW(96)} height={scaleW(96)} />
        </View>

        {/* 5. Summary Details Card (top: 335px, height: 228px -> bottom: 563px) */}
        <View
          style={{
            position: 'absolute',
            left: scaleW(24),
            right: scaleW(24),
            top: scaleH(335),
            height: scaleH(228),
          }}
          className="bg-white/10 rounded-[20px] border border-white/20 px-5 py-2 z-10"
        >
          {/* Row 1: 현재 상태 */}
          <View style={{ borderBottomWidth: 0.8, borderBottomColor: 'rgba(255, 249, 241, 0.2)' }} className="flex-1 flex-row justify-between items-center px-3">
            <Text className="text-[#FFF9F1] text-[14px] font-semibold">현재 상태</Text>
            <Text className="text-[#FFF9F1] text-[14px] font-normal">{condition}</Text>
          </View>

          {/* Row 2: 임신 주차 */}
          <View style={{ borderBottomWidth: 0.8, borderBottomColor: 'rgba(255, 249, 241, 0.2)' }} className="flex-1 flex-row justify-between items-center px-3">
            <Text className="text-[#FFF9F1] text-[14px] font-semibold">임신 주차</Text>
            <Text className="text-[#FFF9F1] text-[14px] font-normal">{weeks}</Text>
          </View>

          {/* Row 3: 피부 고민 */}
          <View style={{ borderBottomWidth: 0.8, borderBottomColor: 'rgba(255, 249, 241, 0.2)' }} className="flex-1 flex-row justify-between items-center px-3">
            <Text className="text-[#FFF9F1] text-[14px] font-semibold">피부 고민</Text>
            <Text className="text-[#FFF9F1] text-[14px] font-normal max-w-[180px] text-right" numberOfLines={1}>
              {concerns}
            </Text>
          </View>

          {/* Row 4: 피부 타입*/}
          <View className="flex-1 flex-row justify-between items-center px-3">
            <Text className="text-[#FFF9F1] text-[14px] font-semibold">피부 타입</Text>
            <Text className="text-[#FFF9F1] text-[14px] font-normal">{skinType}</Text>
          </View>
        </View>

        {/* 6. Previous Step Link (1:1 Midpoint: top: 623px) */}
        <View style={{ position: 'absolute', left: 0, right: 0, top: scaleH(623) }} className="items-center justify-center z-10">
          <TouchableOpacity onPress={onPrev} activeOpacity={0.7}>
            <Text className="text-[#FFF9F1]/80 text-[14px] font-light underline">이전 단계 수정하기</Text>
          </TouchableOpacity>
        </View>

        {/* 7. Reusable Bottom Action Button */}
        <BottomButton
          title="시작하기"
          onPress={() => alert('맞춤 루틴 시작!')}
        />
      </ImageBackground>
    </View>
  );
}
