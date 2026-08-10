import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import HomeIcon from '../../../assets/icons/home-icon.svg';
import MyPageIcon from '../../../assets/icons/mypage-icon.svg';
import RoutineIcon from '../../../assets/icons/routine-icon.svg';
import VanityIcon from '../../../assets/icons/vanity-icon.svg';
import { useResponsiveScale } from '../utils/responsive';

const ITEMS = [
  { icon: HomeIcon, label: '홈', fillOnActive: true },
  { icon: RoutineIcon, label: '루틴' },
  { icon: VanityIcon, label: '화장대' },
  { icon: MyPageIcon, label: '마이페이지' },
];

export default function BottomNavigation({ activeIndex = 0 }) {
  const { scale, moderateScale } = useResponsiveScale();
  return (
    <View
      className="absolute bottom-0 left-0 right-0"
      style={{
        height: scale(99),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#FFFEFC',
        borderColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 1,
        shadowColor: '#75685F',
        shadowOffset: {
          width: 0,
          height: -8,
        },
        shadowOpacity: 0.18,
        shadowRadius: 22,
        elevation: 18,
        zIndex: 20,
      }}
    >
      <View className="flex-row justify-around" style={{ paddingHorizontal: 5, paddingTop: scale(20) }}>
        {ITEMS.map(({ icon, label, fillOnActive }, index) => {
          const active = index === activeIndex;
          const Icon = icon;

          return (
            <TouchableOpacity
              key={label}
              className="items-center"
              style={{ width: 70 }}
              activeOpacity={0.65}
            >
              <Icon
                width={scale(16)}
                height={scale(16)}
                stroke="#A7632D"
                fill={active && fillOnActive ? '#A7632D' : 'none'}
              />

              <Text
                className={`${
                  active
                    ? 'font-pretendard-semibold text-[#A7632D]'
                    : 'font-pretendard-regular text-[#A7632D]'
                }`}
                style={{ marginTop: 3, fontSize: moderateScale(10) }}
              > 
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
