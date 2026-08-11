import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * 주의/위험 성분 카드
 * @param {'caution'|'danger'} level
 * @param {string} name - 성분명
 * @param {string} description - 설명 텍스트
 */
export default function WarningIngredientCard({ level = 'caution', name, description }) {
  const isWarning = level === 'caution';
  const bg = isWarning ? '#FFF8EC' : '#FEF0F0';
  const borderColor = isWarning ? '#F5C56A' : '#F5A0A0';
  const labelColor = isWarning ? '#D4901B' : '#C0392B';
  const labelBg = isWarning ? '#FDECC5' : '#FADCDC';
  const labelText = isWarning ? '주의 성분' : '위험 성분';
  const dotColor = isWarning ? '#F39C12' : '#E74C3C';

  return (
    <View style={[styles.card, { backgroundColor: bg, borderColor }]}>
      <View style={styles.header}>
        <View style={[styles.dot, { backgroundColor: dotColor }]} />
        <Text style={styles.name}>{name}</Text>
        <View style={[styles.levelBadge, { backgroundColor: labelBg }]}>
          <Text style={[styles.levelText, { color: labelColor }]}>{labelText}</Text>
        </View>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 8,
  },
  name: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 13,
    color: '#3D2B1F',
    flex: 1,
  },
  levelBadge: {
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  levelText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 10,
  },
  description: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: '#5A4035',
    lineHeight: 18,
  },
});
