import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { BlurView } from 'expo-blur';
import {
  GlassView,
  isGlassEffectAPIAvailable,
} from 'expo-glass-effect';

import HomeIcon from '../../../assets/icons/home-icon.svg';
import MyPageIcon from '../../../assets/icons/mypage-icon.svg';
import RoutineIcon from '../../../assets/icons/routine-icon.svg';
import VanityIcon from '../../../assets/icons/vanity-icon.svg';
import { useResponsiveScale } from '../utils/responsive';

const ACTIVE_COLOR = '#A7632D';

const ITEMS = [
  {
    icon: HomeIcon,
    label: '홈',
    fillOnActive: true,
  },
  {
    icon: RoutineIcon,
    label: '루틴',
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
  onTabChange,
}) {
  const { scale, moderateScale } = useResponsiveScale();

  const useNativeGlass =
    Platform.OS === 'ios' &&
    isGlassEffectAPIAvailable();

  const navigationItems = (
    <View
      style={[
        styles.content,
        {
          paddingHorizontal: scale(18),
          paddingTop: scale(20),
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
                stroke={ACTIVE_COLOR}
                fill={
                  active && fillOnActive
                    ? ACTIVE_COLOR
                    : 'none'
                }
              />

              <Text
                style={{
                  marginTop: scale(5),
                  color: ACTIVE_COLOR,
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
    <View
      pointerEvents="box-none"
      style={[
        styles.positioner,
        {
          height: scale(110),
        },
      ]}
    >
      {/* 바 위쪽 구분용 그림자 */}
      <View
        pointerEvents="none"
        style={[
          styles.shadowLayer,
          {
            borderTopLeftRadius: scale(28),
            borderTopRightRadius: scale(28),
          },
        ]}
      />

      {/* 실제 Glass Bar */}
      {useNativeGlass ? (
        <GlassView
          style={[
            styles.glassContainer,
            {
              borderTopLeftRadius: scale(28),
              borderTopRightRadius: scale(28),
            },
          ]}
        >
          {navigationItems}
        </GlassView>
      ) : (
        <BlurView
          intensity={25}
          tint="default"
          experimentalBlurMethod={
            Platform.OS === 'android'
              ? 'dimezisBlurView'
              : undefined
          }
          style={[
            styles.glassContainer,
            {
              borderTopLeftRadius: scale(28),
              borderTopRightRadius: scale(28),
            },
          ]}
        >
          {navigationItems}
        </BlurView>
      )}
    </View>
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

  shadowLayer: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: 'transparent',

    ...Platform.select({
      ios: {
        shadowColor: '#6B5647',
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },

      android: {
        elevation: 12,
      },
    }),
  },

  glassContainer: {
    flex: 1,

    // radius 밖으로 blur가 튀어나가지 않게
    overflow: 'hidden',

    // 여기에는 backgroundColor 넣지 않음
    backgroundColor: 'transparent',

    // 위쪽 테두리만 은은하게
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,

    borderColor: 'rgba(255,255,255,0.45)',
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