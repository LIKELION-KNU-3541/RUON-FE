import React from 'react';
import { Text, View } from 'react-native';
import { useResponsiveScale } from '../../../shared/utils/responsive';
import NoticeIcon from '../../../../assets/icons/notice-icon.svg';


export default function RoutineNotice({ theme, content }) {
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
        {content}
      </Text>
    </View>
  );
}
