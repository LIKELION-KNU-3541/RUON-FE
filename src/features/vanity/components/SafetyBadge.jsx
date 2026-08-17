import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * 안전성 뱃지 컴포넌트
 * @param {'safe'|'caution'|'danger'} level
 * @param {string} label - 표시할 텍스트 (기본값 자동 설정)
 * @param {'sm'|'md'} size
 */
export default function SafetyBadge({ level = 'safe', label, size = 'sm' }) {
  const config = {
    safe: {
      bg: '#EAF7EF',
      text: '#27AE60',
      dotColor: '#27AE60',
      defaultLabel: '사용 가능',
    },
    caution: {
      bg: '#FFF8EC',
      text: '#F39C12',
      dotColor: '#F39C12',
      defaultLabel: '주의 필요',
    },
    danger: {
      bg: '#FEF0F0',
      text: '#E74C3C',
      dotColor: '#E74C3C',
      defaultLabel: '사용 금지',
    },
  };

  const { bg, text: textColor, dotColor, defaultLabel } = config[level] || config.safe;
  const displayLabel = label || defaultLabel;

  const isMd = size === 'md';

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: bg },
        isMd ? styles.badgeMd : styles.badgeSm,
      ]}
    >
      <View style={[styles.dot, { backgroundColor: dotColor }]} />
      <Text
        style={[
          styles.label,
          { color: textColor },
          { fontSize: isMd ? 12 : 10 },
        ]}
      >
        {displayLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeSm: {
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  badgeMd: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 9999,
    marginRight: 4,
  },
  label: {
    fontFamily: 'Pretendard-Medium',
  },
});
