import React from 'react';
import { Text, View } from 'react-native';
import { useResponsiveScale } from '../../../shared/utils/responsive';
import NoticeIcon from '../../../../assets/icons/notice-icon.svg';


export default function RoutineNotice({ theme }) {
  const { moderateScale } = useResponsiveScale();
  const evening = theme?.screenBackground === '#9A5B2C';
  const noticeColor = evening ? '#FFDFC4' : '#BE9D82';

  return (
    <View
      className="flex-row items-center rounded-[20px] border p-[15px] gap-[10px] "
      style={{
        backgroundColor: evening ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.45)',
        borderColor: evening ? 'rgba(255,255,255,0.28)' : '#CDA887',
      }}
    >
      <NoticeIcon width={17} height={17} fill={noticeColor}></NoticeIcon>
      <Text
        className="flex-1 font-pretendard-regular"
        style={{ color: noticeColor, fontSize: moderateScale(10)}}
      >
        안전한 사용을 위해 제품의 전체 성분과 사용 조건을{'\n'}다시 확인하고, 불편감이 지속되면 전문가와 상담해주세요.
      </Text>
    </View>
  );
}
