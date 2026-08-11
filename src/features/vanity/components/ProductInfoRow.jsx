import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * 제품 기본정보 한 행 (라벨 + 값)
 */
export default function ProductInfoRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDE3D9',
  },
  label: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: '#B9A18F',
    width: 90,
    flexShrink: 0,
  },
  value: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: '#3D2B1F',
    flex: 1,
    flexWrap: 'wrap',
  },
});
