import React, { useEffect, useState } from 'react';
import { BackHandler, ImageBackground, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ConditionButton from '../../../shared/components/ConditionButton';
import PageHeader from '../../../shared/components/PageHeader';
import { useResponsiveScale } from '../../../shared/utils/responsive';
import PencilIcon from '../../../../assets/icons/pencil-icon.svg';

const CONDITIONS = [
  '건조해요', '민감해요', '가려워요',
  '트러블이 있어요', '당겨요', '붉어졌어요',
  '열감이 있어요', '각질이 올라와요',
  '평소와 같아요',
];

const CONDITION_ROWS = [
  CONDITIONS.slice(0, 3),
  CONDITIONS.slice(3, 6),
  CONDITIONS.slice(6, 8),
  CONDITIONS.slice(8, 9),
];

const TIME_OPTIONS = ['30초 퀵루틴', '기본 루틴', '여유 루틴'];
const backgroundSource = require('../../../../assets/images/TodayCheckIn-bg.png');

export default function ConditionPage({ initialConditions = [], onBack, onApply }) {
  const { scale, moderateScale } = useResponsiveScale();
  const [conditions, setConditions] = useState(initialConditions);
  const [time, setTime] = useState(null);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack();
      return true;
    });
    return () => subscription.remove();
  }, [onBack]);

  const toggleCondition = (condition) => {
    setConditions((current) =>
      current.includes(condition)
        ? current.filter((item) => item !== condition)
        : [...current, condition],
    );
  };

  return (
    <ImageBackground source={backgroundSource} resizeMode="cover" style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="light-content" backgroundColor="#B97943" />
        <PageHeader title="오늘의 컨디션" onBack={onBack} color="#FFF9F1" />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: scale(24), paddingBottom: 45 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="mt-[30px] text-center font-pretendard-semibold color-ruon-sub2" style={{ fontSize: moderateScale(17) }}>
            지금 피부가 어떤 느낌인가요?
          </Text>

          <View className="mt-[30px]" style={{ gap: 32 }}>
            {CONDITION_ROWS.map((row, rowIndex) => (
              <View key={rowIndex} className="flex-row justify-center" style={{ gap: 10 }}>
                {row.map((condition) => (
                  <ConditionButton
                    key={condition}
                    label={condition}
                    selected={conditions.includes(condition)}
                    onPress={() => toggleCondition(condition)}
                  />
                ))}
                {rowIndex === CONDITION_ROWS.length - 1 && (
                  <ConditionButton label="직접 작성" prefix={<PencilIcon />} />
                )}
              </View>
            ))}
          </View>

          <Text className="mt-[32px] text-center font-pretendard-semibold color-ruon-sub2" style={{ fontSize: moderateScale(17) }}>
            오늘 사용 가능한 시간
          </Text>

          <View className="mt-[30px] flex-row justify-center" style={{ gap: 10 }}>
            {TIME_OPTIONS.map((option) => {
              const selected = time === option;
              return (
                <TouchableOpacity
                  key={option}
                  className="h-[37px] items-center justify-center rounded-[16px] bg-[#FFF8F2] px-[10px]"
                  style={{
                    borderColor: selected ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
                    backgroundColor: selected ? '#FFF9F2' : 'rgba(255,255,255,0.08)',
                  }}
                  activeOpacity={0.75}
                  onPress={() => setTime(option)}
                >
                  <Text className="font-pretendard-semibold" style={{ color: selected ? '#915626' : '#FFF9F1', fontSize: moderateScale(14) }}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View className="flex-1 items-center justify-center">
            <LinearGradient colors={['rgba(255, 255, 255, 0)', '#FFFFFF']} 
              
              start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}
              style={{ width: 2, height: scale(45) }}/>
          </View>

          <Text className="text-center font-pretendard-medium color-ruon-sub2" style={{ fontSize: moderateScale(17), lineHeight: moderateScale(27) }}>
            컨디션을 반영해{`\n`}오늘의 루틴을 조정해드릴게요
          </Text>

          <TouchableOpacity
            className="mt-[31px] h-[61px] items-center justify-center rounded-[20px] bg-[#FFF9F1]"
            activeOpacity={0.8}
            onPress={() => onApply(conditions)}
          >
            <Text className="font-pretendard-semibold text-[#A25C2C]" style={{ fontSize: moderateScale(16) }}>
              반영하기
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
