import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import SafetyBadge from './SafetyBadge';

/**
 * 화장대 메인 화면의 제품 리스트 개별 아이템
 * @param {object} product - 제품 데이터
 * @param {function} onPress - 탭 시 상세 화면으로 이동
 */
export default function VanityProductItem({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.75} onPress={onPress}>
      {/* 제품 이미지 */}
      <View style={styles.imageWrapper}>
        {product.image ? (
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>📦</Text>
          </View>
        )}
      </View>

      {/* 제품 정보 */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.brand}>{product.brand}</Text>
        <View style={styles.badgeRow}>
          <SafetyBadge level={product.safetyLevel} label={product.safetyLabel} />
        </View>
      </View>

      {/* 우측 화살표 */}
      <View style={styles.arrowWrapper}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    shadowColor: '#C4A98A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  imageWrapper: {
    width: 56,
    height: 56,
    marginRight: 12,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#F5EDE3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  name: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 13,
    color: '#3D2B1F',
    lineHeight: 18,
    marginBottom: 2,
  },
  brand: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
    color: '#B9A18F',
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
  },
  arrowWrapper: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 22,
    color: '#C4A98A',
    lineHeight: 24,
  },
});
