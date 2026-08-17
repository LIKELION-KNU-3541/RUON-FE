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
import StatusIcon1 from '../../../../assets/icons/vanityPage_icon1.svg';
import StatusIcon2 from '../../../../assets/icons/vanityPage_icon2.svg';
import StatusIcon3 from '../../../../assets/icons/vanityPage_icon3.svg';
import StatusIcon4 from '../../../../assets/icons/vanityPage_icon4.svg';
import CareIcon from '../../../../assets/icons/result_green_icon.svg';

const backgroundSource = require('../../../../assets/images/MainHome-bg.png');

const STATUS_LABEL = {
  safe: '사용 유지',
  caution: '잠시 보류',
  selective: '선택 사용',
  danger: '추가 확인',
};

const STATUS_ICON = {
  safe: StatusIcon1,
  caution: StatusIcon2,
  selective: StatusIcon3,
  danger: StatusIcon4,
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
  const StatusIcon = STATUS_ICON[product.safetyLevel] ?? STATUS_ICON.safe;
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
            <StatusIcon width={30} height={30} />
            <View style={styles.statusTextCol}>
              <Text style={styles.statusTitle}>{statusLabel}</Text>
              <Text style={styles.statusDesc}>{product.usageNote}</Text>
            </View>
          </View>

          {/* 추천 카드 */}
          {product.recommendation && (
            <View style={styles.statusCard}>
              <View style={styles.careIconCircle}>
                <CareIcon width={16} height={16} />
              </View>
              <View style={styles.statusTextCol}>
                <Text style={styles.statusTitle}>{product.recommendation.title}</Text>
                <Text style={styles.statusDesc}>{product.recommendation.note}</Text>
              </View>
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
              <Text style={styles.infoValue}>
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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    height: 128,
    marginBottom: 20,
    overflow: 'hidden',
  },
  productImageWrapper: {
    width: 102,
    height: '100%',
    backgroundColor: '#F0E4D6',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 32,
  },
  productName: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    lineHeight: 17,
    color: '#945C2D',
  },
  productInfoLine: {
    flexDirection: 'row',
  },
  productInfoLabel: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 10,
    lineHeight: 12,
    color: '#C47D41',
    width: 70,
  },
  productInfoValue: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 10,
    lineHeight: 12,
    color: '#C47D41',
  },
  // 상태 / 추천 카드
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFFF8',
    borderWidth: 0.5,
    borderColor: '#BE9D82',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 19,
    marginBottom: 20,
  },
  careIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E0FFD4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTextCol: {
    flex: 1,
    gap: 10,
  },
  statusTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    lineHeight: 17,
    color: '#945C2D',
  },
  statusDesc: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 10,
    lineHeight: 12,
    color: '#8C8279',
  },
  // 가져온 정보
  sectionTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    lineHeight: 17,
    color: '#945C2D',
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: '#FFF9F1',
    borderWidth: 0.5,
    borderColor: '#BE9D82',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  infoLabel: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 11,
    lineHeight: 13,
    color: '#755235',
    width: 60,
    flexShrink: 0,
  },
  infoValue: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 11,
    lineHeight: 13,
    color: '#755235',
    flex: 1,
    flexWrap: 'wrap',
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
