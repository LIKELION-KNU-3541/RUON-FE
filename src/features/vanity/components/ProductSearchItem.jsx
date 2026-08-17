import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

/**
 * 제품 검색 결과 개별 아이템
 * @param {object} product - 검색 결과 제품
 * @param {boolean} selected - 선택 여부
 * @param {function} onPress - 탭 핸들러
 */
export default function ProductSearchItem({ product, selected = false, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.containerSelected]}
      activeOpacity={0.75}
      onPress={onPress}
    >
      {/* 제품 이미지 */}
      <View style={styles.imageWrapper}>
        {product.image ? (
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderIcon}>🧴</Text>
          </View>
        )}
      </View>

      {/* 제품 정보 */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.brand}>{product.brand}</Text>
        {product.rating != null && (
          <Text style={styles.rating}>⭐ {product.rating} ({product.reviewCount?.toLocaleString()})</Text>
        )}
        {product.volume && (
          <Text style={styles.volume}>• {product.volume}</Text>
        )}
      </View>

      {/* 선택 체크 */}
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioInner} />}
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
    borderWidth: 1.5,
    borderColor: '#EDE3D9',
  },
  containerSelected: {
    borderColor: '#945C2D',
    backgroundColor: '#FFF8F2',
  },
  imageWrapper: {
    width: 56,
    height: 64,
    marginRight: 12,
    borderRadius: 8,
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
  imagePlaceholderIcon: {
    fontSize: 26,
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
    marginBottom: 3,
  },
  rating: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
    color: '#A97550',
    marginBottom: 2,
  },
  volume: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
    color: '#B9A18F',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D4C0B0',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#945C2D',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#945C2D',
  },
});
