import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import HomeIcon from '../../../assets/icons/home-icon.svg';
import MyPageIcon from '../../../assets/icons/mypage-icon.svg';
import RoutineIcon from '../../../assets/icons/routine-icon.svg';
import VanityIcon from '../../../assets/icons/vanity-icon.svg';

const ITEMS = [
  { icon: HomeIcon, label: '홈' },
  { icon: RoutineIcon, label: '루틴' },
  { icon: VanityIcon, label: '화장대' },
  { icon: MyPageIcon, label: '마이페이지' },
];

export default function BottomNavigation({ activeIndex = 0 }) {
  return (
    <View
      className="absolute bottom-0 left-0 right-0 h-[99px] rounded-t-[40px]"
      style={{
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
      <View className="flex-row justify-around px-[20px] pt-[20px]">
        {ITEMS.map(({ icon, label }, index) => {
          const active = index === activeIndex;
          const Icon = icon;

          return (
            <TouchableOpacity
              key={label}
              className="w-[70px] items-center"
              activeOpacity={0.65}
            >
              <Icon
                width={20}
                height={20}
                stroke="#A7632D"
              />

              <Text
                className={`mt-[5px] text-[10px] ${
                  active
                    ? 'font-pretendard-semibold text-[#A7632D]'
                    : 'font-pretendard-regular text-[#A7632D]'
                }`}
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
