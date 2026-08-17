import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import HomeIcon from '../../../assets/icons/home-icon.svg';
import MyPageIcon from '../../../assets/icons/mypage-icon.svg';
import RoutineIcon from '../../../assets/icons/routine-icon.svg';
import VanityIcon from '../../../assets/icons/vanity-icon.svg';
import { useResponsiveScale } from '../utils/responsive';

const DEFAULT_ACTIVE_COLOR = '#945C2D';
const DEFAULT_INACTIVE_COLOR = '#BE9D82';
const eveningNavigationBackground = require('../../../assets/images/GNB-bg.png');
const morningNavigationBackground = require('../../../assets/images/MGNB-bg.png');

const ITEMS = [
  {
    icon: HomeIcon,
    label: '홈',
    fillOnActive: true,
  },
  {
    icon: RoutineIcon,
    label: '루틴',
    fillOnActive: true,
  },
  {
    icon: VanityIcon,
    label: '화장대',
    fillOnActive: true,
  },
  {
    icon: MyPageIcon,
    label: '마이페이지',
  },
];

export default function BottomNavigation({
  activeIndex = 0,
  theme,
  mode,
  onTabChange,
}) {
  const { scale, moderateScale } = useResponsiveScale();
  const activeColor = theme?.text ?? DEFAULT_ACTIVE_COLOR;
  const inactiveColor = theme?.subtext ?? DEFAULT_INACTIVE_COLOR;
  const navigationBackground = mode === 'evening'
    ? eveningNavigationBackground
    : morningNavigationBackground;

  const navigationItems = (
    <View
      style={[
        styles.content,
        {
          paddingHorizontal: scale(18),
          paddingTop: scale(47),
        },
      ]}
    >
      {ITEMS.map(
        ({ icon, label, fillOnActive }, index) => {
          const active = index === activeIndex;
          const Icon = icon;
          
          // tabKey mapping based on label
          let tabKey = 'home';
          if (label === '루틴') tabKey = 'routine';
          if (label === '화장대') tabKey = 'vanity';
          if (label === '마이페이지') tabKey = 'mypage';

          return (
            <TouchableOpacity
              key={label}
              accessibilityRole="tab"
              accessibilityState={{
                selected: active,
              }}
              activeOpacity={0.65}
              style={[
                styles.item,
                {
                  width: scale(68),
                },
              ]}
              onPress={() => onTabChange?.(tabKey)}
            >
              <Icon
                width={scale(16)}
                height={scale(16)}
                color={active ? activeColor : inactiveColor}
                stroke={active ? activeColor : inactiveColor}
                fill={
                  active && fillOnActive
                    ? activeColor
                    : 'none'
                }
              />

              <Text
                style={{
                  marginTop: scale(5),
                  color: active ? activeColor : inactiveColor,
                  fontFamily: active
                    ? 'Pretendard-SemiBold'
                    : 'Pretendard-Regular',
                  fontSize: moderateScale(10),
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        }
      )}
    </View>
  );

  return (
    <ImageBackground
      source={navigationBackground}
      resizeMode="stretch"
      imageStyle={{ width: '100%', height: '100%' }}
      pointerEvents="box-none"
      style={[
        styles.positioner,
        {
          height: scale(110),
        },
      ]}
    >
      {navigationItems}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  positioner: {
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,

    zIndex: 20,
  },

  content: {
    flex: 1,

    flexDirection: 'row',

    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },

  item: {
    minHeight: 50,

    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
