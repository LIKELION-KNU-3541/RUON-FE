import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InfoBox from '../../../shared/components/InfoBox';
// TODO: 서버 연동 시 DUMMY_PRODUCTS import 삭제 및 API 응답 데이터 사용
import { DUMMY_PRODUCTS } from '../data/dummyData';

const backgroundSource = require('../../../../assets/images/MainHome-bg.png');

const STATUS_LABEL = {
  safe: '사용 유지',
  caution: '잠시 보류',
  selective: '선택 사용',
  danger: '추가 확인',
};

const STATUS_ICON = {
  safe: '👍',
  caution: '⏸️',
  selective: '🌙',
  danger: '👤',
};

/**
 * 제품 확인 / 상세 화면
 * @param {object} product - 제품 데이터 (없으면 더미 첫 번째 제품 사용)
 * @param {function} onBack - 뒤로 가기
 * @param {function} onAddToVanity - "화장대에 추가하기" 버튼 콜백
 */
export default function ProductDetailScreen({ product: productProp, onBack, onAddToVanity }) {
  // TODO: 서버 연동 시 아래 더미 폴백 삭제 (product은 항상 API 응답에서 옴)
  const product = productProp ?? DUMMY_PRODUCTS[0];
  const { basicInfo } = product;
  const [ingredientsExpanded, setIngredientsExpanded] = useState(false);

  const statusLabel = STATUS_LABEL[product.safetyLevel] ?? STATUS_LABEL.safe;
  const statusIcon = STATUS_ICON[product.safetyLevel] ?? STATUS_ICON.safe;
  const fullIngredients = basicInfo.fullIngredients ?? basicInfo.mainIngredients;
  const ingredientsPreview = `${fullIngredients.split(',')[0].trim()} 외 전성분 확인`;

  return (
    <ImageBackground source={backgroundSource} resizeMode="cover" style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn} onPress={onBack} activeOpacity={0.7}>
            <Text style={styles.headerBtnText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>제품 확인</Text>
          <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
            <Text style={styles.headerCloseText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 제품 이미지 + 기본 정보 카드 */}
          <View style={styles.productCard}>
            <View style={styles.productImageWrapper}>
              {product.image ? (
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.productImagePlaceholder}>🧴</Text>
              )}
            </View>
            <View style={styles.productCardInfo}>
              <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
              <View style={styles.productInfoLine}>
                <Text style={styles.productInfoLabel}>브랜드</Text>
                <Text style={styles.productInfoValue}>{product.brand}</Text>
              </View>
              <View style={styles.productInfoLine}>
                <Text style={styles.productInfoLabel}>카테고리</Text>
                <Text style={styles.productInfoValue}>{product.steps?.[0] ?? '-'}</Text>
              </View>
            </View>
          </View>

          {/* 사용 상태 카드 */}
          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <View style={styles.statusIconCircle}>
                <Text style={styles.statusIcon}>{statusIcon}</Text>
              </View>
              <Text style={styles.statusTitle}>{statusLabel}</Text>
            </View>
            <Text style={styles.statusDesc}>{product.usageNote}</Text>
          </View>

          {/* 추천 카드 */}
          {product.recommendation && (
            <View style={styles.statusCard}>
              <View style={styles.statusHeader}>
                <View style={styles.statusIconCircle}>
                  <Text style={styles.statusIcon}>💧</Text>
                </View>
                <Text style={styles.statusTitle}>{product.recommendation.title}</Text>
              </View>
              <Text style={styles.statusDesc}>{product.recommendation.note}</Text>
            </View>
          )}

          {/* 가져온 정보 */}
          <Text style={styles.sectionTitle}>가져온 정보</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>제품명</Text>
              <Text style={styles.infoValue}>{basicInfo.productName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>브랜드</Text>
              <Text style={styles.infoValue}>{basicInfo.brand}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>용량</Text>
              <Text style={styles.infoValue}>{basicInfo.volume}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>주요 성분</Text>
              <Text style={styles.infoValue}>{basicInfo.mainIngredients}</Text>
            </View>
            <TouchableOpacity
              style={styles.infoRow}
              activeOpacity={0.7}
              onPress={() => setIngredientsExpanded((v) => !v)}
            >
              <Text style={styles.infoLabel}>전성분</Text>
              <Text style={[styles.infoValue, styles.infoValueLink]}>
                {ingredientsExpanded ? fullIngredients : ingredientsPreview}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 정보 이용 안내 */}
          <InfoBox />
        </ScrollView>

        {/* 화장대에 추가하기 버튼 (하단 고정) */}
        <View style={styles.addBar}>
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.85}
            onPress={() => onAddToVanity?.(product)}
          >
            <Text style={styles.addBtnText}>화장대에 추가하기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  headerBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBtnText: {
    fontSize: 28,
    color: '#945C2D',
    lineHeight: 30,
  },
  headerCloseText: {
    fontSize: 16,
    color: '#945C2D',
  },
  headerTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    color: '#945C2D',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  // 제품 카드
  productCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  productImageWrapper: {
    width: 64,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F0E4D6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productImagePlaceholder: {
    fontSize: 28,
  },
  productCardInfo: {
    flex: 1,
    gap: 6,
  },
  productName: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 15,
    color: '#945C2D',
    marginBottom: 2,
  },
  productInfoLine: {
    flexDirection: 'row',
  },
  productInfoLabel: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: '#C47D41',
    width: 60,
  },
  productInfoValue: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: '#C47D41',
  },
  // 상태 / 추천 카드
  statusCard: {
    backgroundColor: '#F3FAF4',
    borderWidth: 1,
    borderColor: '#CFEBD6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  statusIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DFF3E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIcon: {
    fontSize: 15,
  },
  statusTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 15,
    color: '#2E7D4F',
  },
  statusDesc: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: '#5C8A6C',
    lineHeight: 18,
  },
  // 가져온 정보
  sectionTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 15,
    color: '#945C2D',
    marginTop: 8,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  infoLabel: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 13,
    color: '#BE9D82',
    width: 80,
    flexShrink: 0,
  },
  infoValue: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 13,
    color: '#945C2D',
    flex: 1,
    flexWrap: 'wrap',
  },
  infoValueLink: {
    color: '#A9652F',
    textDecorationLine: 'underline',
  },
  // 하단 추가 버튼
  addBar: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 12,
  },
  addBtn: {
    backgroundColor: '#945C2D',
    borderRadius: 16,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
