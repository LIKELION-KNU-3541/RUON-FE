import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResponsiveScale } from '../../../shared/utils/responsive';
import PhotoGuideModal from '../components/PhotoGuideModal';
import BottomNavigation from '../../../shared/components/BottomNavigation';
import InfoBox from '../../../shared/components/InfoBox';
import { DUMMY_PRODUCTS } from '../data/dummyData';

const backgroundSource = require('../../../../assets/images/MainHome-bg.png');

const FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'safe', label: '사용 유지' },
  { key: 'caution', label: '잠시 보류' },
  { key: 'selective', label: '선택 사용' },
  { key: 'danger', label: '추가 확인' },
];

export default function VanityPage({
  onNavigateCamera,
  onNavigateFileUpload,
  onNavigateSearch,
  onNavigateDetail,
  onTabChange,
}) {
  const { scale, moderateScale } = useResponsiveScale();
  const [showPhotoGuide, setShowPhotoGuide] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleCaptureGuide = () => {
    setShowPhotoGuide(false);
    onNavigateCamera?.();
  };

  const getSafetyStyle = (level) => {
    switch (level) {
      case 'safe':
        return { bg: '#E0FFD4', icon: '✔️' };
      case 'caution':
        return { bg: '#FFE5DB', icon: '🛑' };
      case 'selective':
        return { bg: '#FFF7D1', icon: '🌙' };
      case 'danger':
      default:
        return { bg: '#FFE6FF', icon: '👤' };
    }
  };

  const filteredProducts =
    activeFilter === 'all'
      ? DUMMY_PRODUCTS
      : DUMMY_PRODUCTS.filter((product) => product.safetyLevel === activeFilter);

  return (
    <ImageBackground source={backgroundSource} resizeMode="cover" style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F1" />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: scale(150) }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              내 화장대에서{'\n'}오늘 쓸 제품을 정리해요
            </Text>
            <Text style={styles.headerSub}>
              보유 제품 정보를 확인해{'\n'}지금 활용할 제품과 추가로 살펴볼 제품을 정리해요.
            </Text>
          </View>

          {/* CTA Buttons */}
          <View style={styles.ctaRow}>
            <TouchableOpacity
              style={styles.ctaBtn}
              activeOpacity={0.8}
              onPress={() => setShowPhotoGuide(true)}
            >
              <View style={styles.ctaIconWrapper}>
                <Text style={{ fontSize: 24 }}>📷</Text>
              </View>
              <Text style={styles.ctaBtnTitle}>사진 촬영</Text>
              <Text style={styles.ctaBtnDesc}>제품 사진으로{'\n'}분석해요</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.ctaBtn}
              activeOpacity={0.8}
              onPress={() => onNavigateFileUpload?.()}
            >
              <View style={styles.ctaIconWrapper}>
                <Text style={{ fontSize: 24 }}>📁</Text>
              </View>
              <Text style={styles.ctaBtnTitle}>파일 업로드</Text>
              <Text style={styles.ctaBtnDesc}>사진 파일로{'\n'}분석해요</Text>
            </TouchableOpacity>
          </View>

          {/* 분석 요약 */}
          <View style={styles.summarySection}>
            <Text style={styles.sectionTitle}>분석 요약</Text>
            <View style={styles.summaryRow}>
              {/* 사용 유지 */}
              <View style={styles.summaryCard}>
                <View style={[styles.summaryIconBg, { backgroundColor: '#E0FFD4' }]}>
                  <Text style={{ fontSize: 12 }}>✔️</Text>
                </View>
                <Text style={styles.summaryLabel}>사용 유지</Text>
                <Text style={[styles.summaryCount, { color: '#6ECF86' }]}>08</Text>
              </View>

              {/* 잠시 보류 */}
              <View style={styles.summaryCard}>
                <View style={[styles.summaryIconBg, { backgroundColor: '#FFE5DB' }]}>
                  <Text style={{ fontSize: 12 }}>🛑</Text>
                </View>
                <Text style={styles.summaryLabel}>잠시 보류</Text>
                <Text style={[styles.summaryCount, { color: '#FF907F' }]}>04</Text>
              </View>

              {/* 선택 사용 */}
              <View style={styles.summaryCard}>
                <View style={[styles.summaryIconBg, { backgroundColor: '#FFF7D1' }]}>
                  <Text style={{ fontSize: 12 }}>🌙</Text>
                </View>
                <Text style={styles.summaryLabel}>선택 사용</Text>
                <Text style={[styles.summaryCount, { color: '#F7D76D' }]}>03</Text>
              </View>

              {/* 추가 확인 */}
              <View style={styles.summaryCard}>
                <View style={[styles.summaryIconBg, { backgroundColor: '#FFE6FF' }]}>
                  <Text style={{ fontSize: 12 }}>👤</Text>
                </View>
                <Text style={styles.summaryLabel}>추가 확인</Text>
                <Text style={[styles.summaryCount, { color: '#A567B1' }]}>02</Text>
              </View>
            </View>
          </View>

          <View style={styles.routineSection}>
            <View style={styles.tagsRow}>
              <View style={{ flexDirection: 'row', gap: 7 }}>
                {FILTERS.map((filter) => {
                  const active = activeFilter === filter.key;
                  return (
                    <TouchableOpacity
                      key={filter.key}
                      style={active ? styles.tagActive : styles.tagInactive}
                      activeOpacity={0.8}
                      onPress={() => setActiveFilter(filter.key)}
                    >
                      <Text style={active ? styles.tagTextActive : styles.tagTextInactive}>
                        {filter.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginTop: 14 }}>
                <Text style={{ color: '#E78483', fontSize: 12, marginRight: 4 }}>🗑️</Text>
                <Text style={{ color: '#E78483', fontSize: 11, fontFamily: 'Pretendard-Regular' }}>삭제</Text>
              </TouchableOpacity>
            </View>

            {/* 제품 리스트 (더미 데이터 매핑) */}
            <View style={styles.productList}>

              {filteredProducts.map((product) => {
                const { bg, icon } = getSafetyStyle(product.safetyLevel);

                return (
                  <TouchableOpacity
                    key={product.id}
                    style={styles.productCard}
                    activeOpacity={0.7}
                    onPress={() => onNavigateDetail?.(product)}
                  >
                    <View style={styles.productImgPlaceholder}>
                      <Text style={{ fontSize: 28 }}>🧴</Text>
                    </View>
                    <View style={styles.productInfo}>
                      <Text style={styles.productTitle} numberOfLines={1}>{product.name}</Text>
                      <Text style={styles.productDesc} numberOfLines={2}>{product.usageNote}</Text>
                    </View>
                    <View style={[styles.statusIconBg, { backgroundColor: bg }]}>
                      <Text style={{ fontSize: 14 }}>{icon}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}

            </View>

            {/* Pagination */}
            <View style={styles.pagination}>
              <TouchableOpacity style={styles.pageBtn}><Text style={styles.pageBtnText}>&lt;</Text></TouchableOpacity>
              <Text style={styles.pageText}>1 <Text style={{ fontWeight: '400' }}>/ 3</Text></Text>
              <TouchableOpacity style={styles.pageBtn}><Text style={styles.pageBtnText}>&gt;</Text></TouchableOpacity>
            </View>
          </View>

          {/* Footer Info */}
          <View style={{ marginBottom: 40 }}>
            <View style={{ marginHorizontal: -24, marginTop: 28, height: 6, backgroundColor: '#D8C0AD' }} />
            <InfoBox />
          </View>

        </ScrollView>
      </SafeAreaView>

      {/* 바텀 네비게이션 적용 */}
      <BottomNavigation activeIndex={2} onTabChange={onTabChange} />

      {/* 사진 촬영 가이드 모달 */}
      <PhotoGuideModal
        visible={showPhotoGuide}
        onClose={() => setShowPhotoGuide(false)}
        onCapture={handleCaptureGuide}
      />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  header: {
    marginBottom: 40,
  },
  headerTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 22,
    lineHeight: 32,
    color: '#945C2D',
    marginBottom: 8,
  },
  headerSub: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: '#BE9D82',
  },
  ctaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  ctaBtn: {
    width: '48%',
    aspectRatio: 148 / 145,
    backgroundColor: '#F6E9D7',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  ctaIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  ctaBtnTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 15,
    color: '#945C2D',
    marginBottom: 4,
  },
  ctaBtnDesc: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    color: '#945C2D',
    textAlign: 'center',
    lineHeight: 18,
  },
  summarySection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 15,
    color: '#945C2D',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    width: '23%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
  },
  summaryIconBg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  summaryLabel: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
    color: '#945C2D',
    marginBottom: 5,
  },
  summaryCount: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 11,
  },
  routineSection: {
    marginBottom: 0,
  },
  tagsRow: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  tagActive: {
    backgroundColor: '#945C2D',
    padding: 10,
    borderRadius: 16,
  },
  tagTextActive: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
    lineHeight: 13,
    color: '#FFF9F1',
  },
  tagInactive: {
    backgroundColor: 'rgba(150, 92, 45, 0.1)',
    padding: 10,
    borderRadius: 16,
  },
  tagTextInactive: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
    lineHeight: 13,
    color: '#BE9D82',
  },
  productList: {
    gap: 15,
  },
  productCard: {
    width: '100%',
    height: 113,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 0.5,
    borderColor: '#BE9D82',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  productImgPlaceholder: {
    width: 30,
    height: 70,
    backgroundColor: '#EDE3D9',
    borderRadius: 8,
    marginRight: 20,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 13,
    color: '#945C2D',
    marginBottom: 6,
  },
  productDesc: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
    color: '#945C2D',
    lineHeight: 18,
  },
  statusIconBg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    height: 60,
    borderRadius: 16,
    paddingHorizontal: 20,
    backgroundColor: '#F6E9D7',
  },
  pageBtn: {
    width: 25,
    height: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#BE9D82',
    backgroundColor: '#FFF9F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageBtnText: {
    color: '#945C2D',
    fontSize: 12,
  },
  pageText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: '#945C2D',
  },
});
