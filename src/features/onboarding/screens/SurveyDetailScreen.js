import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BottomButton from '../../../shared/components/BottomButton';

// PNG line art images are exported at @3x resolution
// 4p5p6p_top_circle.png: 612x762, 204x254
// 4p5p6p_btm_circle.png: 426x855, 142x285

const FIGMA_WIDTH = 360;
const FIGMA_HEIGHT = 800;

export default function SurveyDetailScreen({ onNext, surveyData, updateSurveyData }) {
  const [weeks, setWeeks] = useState(surveyData?.weeks || '');
  const [isFocused, setIsFocused] = useState(false);
  const [concerns, setConcerns] = useState(surveyData?.concerns || []);
  const [skinType, setSkinType] = useState(surveyData?.skinType || '건성');

  const concernOptions = ['건조함', '민감함', '트러블', '가려움', '색소침착', '붓기'];
  const skinTypeOptions = ['건성', '중성', '지성', '복합성'];


  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const scaleW = (px) => (px / FIGMA_WIDTH) * SCREEN_WIDTH;
  const scaleH = (px) => (px / FIGMA_HEIGHT) * SCREEN_HEIGHT;

  const toggleConcern = (item) => {
    if (concerns.includes(item)) {
      setConcerns(concerns.filter((c) => c !== item));
    } else {
      setConcerns([...concerns, item]);
    }
  };

  const handleNext = () => {
    const finalWeeks = weeks ? (weeks.endsWith('주') ? weeks : `${weeks}주`) : '24주';
    updateSurveyData({ weeks: finalWeeks, concerns, skinType });
    onNext();
  };

  return (
    <View className="flex-1 bg-[#4A311F] relative">
      <StatusBar style="light" />

      {/* 1. Base Background Image (welcome_bg.png) */}
      <ImageBackground
        source={require('../../../../assets/images/4p5p6p_bg.png')}
        className="flex-1 relative"
        resizeMode="cover"
      >
        {/* 2. Circle Line Art 다른 페이지와 같은 이유로 라인아트 비활성화
        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 1 }}>
          <Image source={require('../../../../assets/images/4p5p6p_top_circle.png')} style={{ position: 'absolute', right: 0, top: 0, width: scaleW(204), height: scaleW(254) }} resizeMode="stretch" />
          <Image source={require('../../../../assets/images/4p5p6p_btm_circle.png')} style={{ position: 'absolute', left: 0, top: scaleH(440), width: scaleW(142), height: scaleW(285) }} resizeMode="stretch" />
        </View>
        */}

        <ScrollView contentContainerStyle={{ paddingBottom: scaleH(140) }} className="flex-1 z-10">
          {/* 3. Frame 37726 (Title Header: top: 84px) */}
          <View style={{ marginTop: scaleH(84), marginLeft: scaleW(40), width: scaleW(193) }}>
            <Text className="text-[#FFF9F1] text-[24px] font-bold leading-[34px]">
              정보를 입력해주세요
            </Text>
            <Text style={{ marginTop: scaleH(10) }} className="text-[#FFF9F1] text-[14px] font-medium leading-[24px]">
              현재 상태에 맞춰 성분 기준과 루틴을 추천해드릴게요
            </Text>
          </View>

          {/* 4. Form Controls Container */}
          <View style={{ marginTop: scaleH(44), paddingHorizontal: scaleW(24) }}>
            {/* Week Input (Left placeholder "?? 24" in #DEAA7A disappears on focus; Right "�? is fixed in #FFF9F1) */}
            <View style={{ height: scaleH(50) }} className="w-full bg-white/10 rounded-[16px] border border-white/20 flex-row items-center px-5 mb-7">
              <TextInput
                value={weeks}
                onChangeText={setWeeks}
                keyboardType="numeric"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={isFocused ? '' : '예) 24'}
                placeholderTextColor="#DEAA7A"
                className="flex-1 text-[#FFF9F1] text-[14px] font-normal p-0"
              />
              <Text className="text-[#FFF9F1] text-[14px] font-normal ml-2">주</Text>
            </View>

            <View className="mb-7">
              <Text className="text-[#FFF9F1] text-[16px] font-medium leading-[19px] mb-3">
                피부 고민 (복수 선택 가능)
              </Text>
              <View className="flex-row flex-wrap gap-2.5">
                {concernOptions.map((item) => {
                  const isSelected = concerns.includes(item);
                  return (
                    <TouchableOpacity
                      key={item}
                      activeOpacity={0.85}
                      onPress={() => toggleConcern(item)}
                      style={{ height: scaleH(43) }}
                      className={`px-4 rounded-[16px] items-center justify-center ${isSelected ? 'bg-white' : 'bg-white/10'
                        }`}
                    >
                      <Text
                        className={`text-[14px] font-normal leading-[17px] ${isSelected ? 'text-[#945C2D]' : 'text-[#FFF9F1]'
                          }`}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-[#FFF9F1] text-[16px] font-medium leading-[19px] mb-3">
                피부 타입 (1개 필수 선택)
              </Text>
              <View className="flex-row flex-wrap gap-2.5">
                {skinTypeOptions.map((item) => {
                  const isSelected = skinType === item;
                  return (
                    <TouchableOpacity
                      key={item}
                      activeOpacity={0.85}
                      onPress={() => setSkinType(item)}
                      style={{ height: scaleH(43) }}
                      className={`px-4 rounded-[16px] items-center justify-center ${isSelected ? 'bg-white' : 'bg-white/10'
                        }`}
                    >
                      <Text
                        className={`text-[14px] font-normal leading-[17px] ${isSelected ? 'text-[#945C2D]' : 'text-[#FFF9F1]'
                          }`}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* 5. Reusable Bottom Action Button */}
        <BottomButton title="다음" onPress={handleNext} activeDot={3} />
      </ImageBackground>
    </View>
  );
}
