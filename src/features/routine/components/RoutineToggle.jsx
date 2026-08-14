import React from 'react';
import { Text, Pressable, View } from 'react-native';
import MorningIcon from '../../../../assets/icons/morning.svg';
import MoonIcon from '../../../../assets/icons/akar-icons_moon-fill.svg';
import { useResponsiveScale } from '../../../shared/utils/responsive';

export default function RoutineToggle({ mode, onChange, theme }) {
  const { moderateScale } = useResponsiveScale();
  return (
    <View className="flex-row justify-between">
      {['morning', 'evening'].map((item) => {
        const active = mode === item;
        const iconColor = active ? theme.toggleActiveText : theme.toggleInactiveText;
        const Icon = item === 'morning' ? MorningIcon : MoonIcon;
        return (
          <Pressable
            accessibilityRole="button"
            key={item}
            onPress={() => onChange(item)}
            style={[{ width: '47%', alignItems: 'center', borderRadius: 16, paddingVertical: 10 },
              active && { backgroundColor: theme.toggleActive },
              mode === 'evening' && !active && { borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.35)' }]}
          >
            <View className="flex-row items-center gap-[5px]">
              <Icon width={16} height={16} fill={iconColor} color={iconColor} />
              <Text style={{ fontFamily: 'Pretendard-SemiBold', fontSize: moderateScale(14), color: iconColor }}>
                {item === 'morning' ? '아침 루틴' : '저녁 루틴'}
              </Text>
            </View>
          </Pressable>
        );
      })} 
    </View>
  );
}
