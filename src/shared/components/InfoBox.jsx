import React from 'react';
import { Image, Text, View } from 'react-native';

const GUIDE_ITEMS = [
  '본 서비스는 제품의 안전성이나 사용 가능 여부를 직접 판단하거나 보장하지 않습니다.',
  '현재 확인 가능한 공신력 있는 제품 및 성분 정보를 기반으로 정보를 정리합니다.',
  '더 자세한 확인이 필요한 경우, 제품 라벨·제조사 안내를 참고하거나 전문가와 상담하세요.',
  '본 서비스는 의료 진단이나 치료를 위한 것이 아니며, 정보 확인과 일상 루틴 관리에 도움을 드리기 위한 서비스입니다.',
];

export default function InfoBox() {
  return (
    <View className="mt-[30px] overflow-hidden rounded-[12px] border border-[#A9652F] bg-[#FDF9F5]">
      <View className="px-[18px] pb-[12px] pt-[14px]">
        <View className="mb-[14px] flex-row items-center">
          <Image
            source={require('../../../assets/images/warning.png')}
            className="h-[19px] w-[19px]"
            resizeMode="contain"
          />
          <Text className="ml-[10px] font-pretendard-medium text-[10px] text-[#A9652F]">
            정보 이용 안내
          </Text>
        </View>

        <View className="gap-[1px]">
          {GUIDE_ITEMS.map((item) => (
            <View key={item} className="flex-row">
              <Text className="mr-[6px] font-pretendard-regular text-[8px] leading-[13px] color-ruon-sub1">
                ·
              </Text>
              <Text className="flex-1 font-pretendard-regular text-[8px] leading-[13px] color-ruon-sub1">
                {item}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View className="flex-row justify-between border-t border-[#D8C0AD] px-[10px] py-[12px]">
        <View className="flex-row items-center">
          <Text className="font-pretendard-semibolde text-[6px] text-[#BE9D82]">
            정보 출처
          </Text>
          <Text className="ml-[10px] font-pretendard-regular text-[6px] text-[#BE9D82]">
            제조사 공식 정보
          </Text>
        </View>

        <View className="flex-row items-center">
          <Text className="font-pretendard-semibold text-[6px] text-[#BE9D82]">
            마지막 검토
          </Text>
          <Text className="ml-[10px] font-pretendard-regular text-[6px] text-[#BE9D82]">
            2026.08.20
          </Text>
        </View>
      </View>
    </View>
  );
}
