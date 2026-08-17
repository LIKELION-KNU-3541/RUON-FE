import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Rarrow from '../../../../assets/icons/Rarrow.svg';
import { useResponsiveScale } from '../../../shared/utils/responsive';

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const calculateDueDate = (weeks) => {
  const currentWeek = Number.parseInt(weeks, 10);
  if (!Number.isFinite(currentWeek)) return null;

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + Math.max(40 - currentWeek, 0) * 7);
  return formatDate(dueDate);
};

export default function PregnancyCard({ surveyData }) {
  const { scale, moderateScale } = useResponsiveScale();
  const condition = surveyData?.condition || '임신 중';
  const weeks = surveyData?.weeks || '';
  const concerns = surveyData?.concerns || [];
  const isPregnant = condition === '임신 중';
  const weekNumber = Number.parseInt(weeks, 10);
  const title = isPregnant && Number.isFinite(weekNumber)
    ? `임신 ${weekNumber}주차`
    : condition;
  const details = concerns.filter(Boolean).join(' · ');
  const dueDate = isPregnant ? calculateDueDate(weeks) : null;

  return (
    <TouchableOpacity
      className="flex-row items-center bg-white"
      style={{ marginTop: 20, borderRadius: scale(16), padding: 20 }}
      activeOpacity={0.75}
    >
      <View className="flex-1">
        <Text className="font-pretendard-medium text-ruon-main1" style={{ fontSize: moderateScale(20) }}>
          {title}
        </Text>
        {details ? (
          <Text className="mt-[3px] font-pretendard-regular text-ruon-cardSubtext" style={{ fontSize: moderateScale(11) }}>
            {details}
          </Text>
        ) : null}
        {dueDate ? (
          <Text className="mt-[12px] font-pretendard-medium text-ruon-text" style={{ fontSize: moderateScale(14) }}>
            예상 출산일 : {dueDate}
          </Text>
        ) : null}
      </View>
      <Rarrow width={scale(7)} height={scale(14)} />
    </TouchableOpacity>
  );
}
