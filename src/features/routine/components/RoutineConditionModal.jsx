import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useResponsiveScale } from '../../../shared/utils/responsive';

export default function RoutineConditionModal({ visible, onSelectCondition, onDismiss }) {
  const { moderateScale } = useResponsiveScale();

  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent onRequestClose={onDismiss}>
      <View className="flex-1 justify-end bg-black/40">
        <View className="rounded-t-[28px] bg-[#FFFCF9] px-[24px] pb-[34px] pt-[18px]">
          <View className="mb-[35px] h-[3px] w-[55px] self-center rounded-full bg-[#DFC5AE]" />
          <View className="items-center">
            <Svg width="58" height="54" viewBox="0 0 58 54" fill="none">
              <Path
                d="M25.55 5.7a4 4 0 0 1 6.9 0l22 38A4 4 0 0 1 51 49.7H7a4 4 0 0 1-3.45-6l22-38Z"
                stroke="#ED8589"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <Path d="M29 18v15" stroke="#ED8589" strokeWidth="4" strokeLinecap="round" />
              <Path d="M29 41h.01" stroke="#ED8589" strokeWidth="5" strokeLinecap="round" />
            </Svg>
          </View>
          <Text
            className="mt-[25px] text-center font-pretendard-semibold"
            style={{ color: '#A25F2D', fontSize: moderateScale(20) }}
          >
            오늘의 컨디션을 알려주세요
          </Text>
          <Text
            className="mt-[20px] text-center font-pretendard-medium"
            style={{ color: '#C08A60', fontSize: moderateScale(14), lineHeight: moderateScale(24) }}
          >
            나에게 맞는 루틴을 추천해드리기 위해{`\n`}오늘의 피부 상태를 알려주세요.
          </Text>

          <Pressable
            className="mt-[58px] h-[61px] items-center justify-center rounded-[20px] bg-[#A7642D]"
            accessibilityRole="button"
            onPress={onSelectCondition}
          >
            <Text className="font-pretendard-semibold text-[#FFF9F1]" style={{ fontSize: moderateScale(16) }}>
              컨디션 선택하기
            </Text>
          </Pressable>
          <Pressable
            className="mt-[12px] h-[61px] items-center justify-center rounded-[20px] border border-[#DFC5AE]"
            accessibilityRole="button"
            onPress={onDismiss}
          >
            <Text className="font-pretendard-semibold text-[#A7642D]" style={{ fontSize: moderateScale(16) }}>
              나중에 할게요
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
