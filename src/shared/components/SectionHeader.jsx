import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Rarrow from '../../../assets/icons/Rarrow.svg';

export default function SectionHeader({ title, actionLabel = '자세히 보기' }) {
  return (
    <View className="mt-[20px] mb-[10px] flex-row items-center justify-between">
      <Text className="font-pretendard-semibold text-[14px] text-ruon-text">
        {title}
      </Text>
      <TouchableOpacity className="flex-row items-center" activeOpacity={0.65}>
        <Text className="mr-[10px] font-pretendard-medium text-[10px] text-ruon-text">
          {actionLabel}
        </Text>
        <Rarrow width={3} height={6} /> 
      </TouchableOpacity>
    </View>
  );
}
