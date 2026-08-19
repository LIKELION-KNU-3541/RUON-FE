import React, { useState } from 'react';
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

const FIGMA_WIDTH = 360;
const FIGMA_HEIGHT = 800;

export default function SurveyConditionScreen({ onNext, surveyData, updateSurveyData }) {
  const [selected, setSelected] = useState(surveyData?.condition || '출산 후');
  const options = ['임신 중', '출산 후', '수유 중'];

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const scaleW = (px) => (px / FIGMA_WIDTH) * SCREEN_WIDTH;
  const scaleH = (px) => (px / FIGMA_HEIGHT) * SCREEN_HEIGHT;

  const handleNext = () => {
    updateSurveyData({ condition: selected });
    onNext();
  };

  return (
    <View className="flex-1 bg-[#4A311F] relative">
      <StatusBar style="light" />

      <ImageBackground
        source={require('../../../../assets/images/4p5p6p_bg.png')}
        className="flex-1 relative"
        resizeMode="cover"
      >
        <View style={{ position: 'absolute', left: scaleW(40), top: scaleH(84), width: scaleW(273) }} className="z-10">
          <Text className="text-[#FFF9F1] text-[24px] font-bold leading-[34px]">
            현재 어떤 상태이신가요?
          </Text>
          <Text style={{ marginTop: scaleH(10) }} className="text-[#FFF9F1] text-[14px] font-medium leading-[24px]">
            {"임신부터 출산 후, 수유 기간까지\n지금의 나에게 맞는 케어를 도와드릴게요."}
          </Text>
        </View>

        <View style={{ position: 'absolute', left: scaleW(24), right: scaleW(24), top: scaleH(230) }} className="z-10">
          {options.map((opt, index) => {
            const isSelected = selected === opt;
            return (
              <TouchableOpacity
                key={opt}
                activeOpacity={0.85}
                onPress={() => setSelected(opt)}
                style={{ marginTop: index > 0 ? scaleH(20) : 0 }}
              >
                {isSelected ? (
                  <View
                    style={{ height: scaleH(50), paddingLeft: scaleW(20) }}
                    className="w-full rounded-[16px] justify-center bg-[#FFF9F1]"
                  >
                    <Text className="text-[16px] font-medium leading-[19px] text-[#945C2D]">
                      {opt}
                    </Text>
                  </View>
                ) : (
                  <InputGlass
                    glass="large"
                    style={{ width: scaleW(312), height: scaleH(50), paddingLeft: scaleW(20) }}
                  >
                    <Text className="text-[16px] font-medium leading-[19px] text-[#FFF9F1]">
                      {opt}
                    </Text>
                  </InputGlass>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <BottomButton title="다음" onPress={handleNext} activeDot={2} />
      </ImageBackground>
    </View>
  );
}
