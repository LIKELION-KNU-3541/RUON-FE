import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResponsiveScale } from '../../../shared/utils/responsive';
import PhotoGuideModal from '../components/PhotoGuideModal';
import BottomNavigation from '../../../shared/components/BottomNavigation';
import InfoBox from '../../../shared/components/InfoBox';
import InputGlass from '../../../shared/components/InputGlass';
import { getProducts, deleteProduct, updateUsageStatus, getAnalysisSummary } from '../api/productsApi';
import CameraIcon from '../../../../assets/icons/vanityPage_camera.svg';
import UploadIcon from '../../../../assets/icons/vanityPage_upload.svg';
import SummaryIcon1 from '../../../../assets/icons/vanityPage_icon1.svg';
import SummaryIcon2 from '../../../../assets/icons/vanityPage_icon2.svg';
import SummaryIcon3 from '../../../../assets/icons/vanityPage_icon3.svg';
import SummaryIcon4 from '../../../../assets/icons/vanityPage_icon4.svg';
import TrashIcon from '../../../../assets/icons/trash_icon.svg';

const backgroundSource = require('../../../../assets/images/MainHome-bg.png');

// analysisCategory <-> 화면 표시 매핑
const CATEGORY_META = {
  KEEP_USING: { icon: SummaryIcon1, color: '#6ECF86' },
  PAUSE: { icon: SummaryIcon2, color: '#FF907F' },
  SELECTIVE_USE: { icon: SummaryIcon3, color: '#F7D76D' },
  NEEDS_REVIEW: { icon: SummaryIcon4, color: '#A567B1' },
};

const FILTERS = [
  { key: 'all', label: '전체', category: undefined },
  { key: 'safe', label: '사용 유지', category: 'KEEP_USING' },
  { key: 'caution', label: '잠시 보류', category: 'PAUSE' },
  { key: 'selective', label: '선택 사용', category: 'SELECTIVE_USE' },
  { key: 'danger', label: '추가 확인', category: 'NEEDS_REVIEW' },
];

const PAGE_SIZE = 5;

export default function VanityPage({
  onNavigateCamera,
  onNavigateFileUpload,
  onNavigateDetail,
  onTabChange,
}) {
  const { scale, moderateScale } = useResponsiveScale();
  const [showPhotoGuide, setShowPhotoGuide] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [summaryCards, setSummaryCards] = useState([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [viewingDiscontinued, setViewingDiscontinued] = useState(false);

  const activeCategory = FILTERS.find((f) => f.key === activeFilter)?.category;

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const params = viewingDiscontinued
        ? { usageStatus: 'DISCONTINUED', page, size: PAGE_SIZE }
        : { category: activeCategory, page, size: PAGE_SIZE };
      const result = await getProducts(params);
      setProducts(result.products);
      setTotalPages(result.totalPages || 1);
    } catch (e) {
      // TODO: 에러 처리(토스트 등)
    } finally {
      setIsLoading(false);
    }
  };

  const loadSummary = async () => {
    try {
      const result = await getAnalysisSummary();
      setSummaryCards(result.analysisCards || []);
    } catch (e) {
      // TODO: 에러 처리
    }
  };

  useEffect(() => {
    loadProducts();
  }, [activeFilter, page, viewingDiscontinued]);

  useEffect(() => {
    loadSummary();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [activeFilter, viewingDiscontinued]);

  const selectFilter = (key) => {
    setViewingDiscontinued(false);
    setActiveFilter(key);
  };

  const handleCaptureGuide = () => {
    setShowPhotoGuide(false);
    onNavigateCamera?.();
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleEnterDeleteMode = () => {
    setIsDeleteMode(true);
    setSelectedIds([]);
  };

  const handleCancelDelete = () => {
    setIsDeleteMode(false);
    setSelectedIds([]);
  };

  const handleConfirmDelete = async () => {
    if (selectedIds.length === 0) return;
    try {
      await Promise.all(selectedIds.map((id) => deleteProduct(id)));
    } catch (e) {
      // TODO: 에러 처리
    }
    setIsDeleteMode(false);
    setSelectedIds([]);
    loadProducts();
    loadSummary();
  };

  const handleConfirmDiscontinue = async () => {
    if (selectedIds.length === 0) return;
    try {
      await Promise.all(selectedIds.map((id) => updateUsageStatus(id, 'DISCONTINUED')));
    } catch (e) {
      // TODO: 에러 처리
    }
    setIsDeleteMode(false);
    setSelectedIds([]);
    setViewingDiscontinued(true);
    loadSummary();
  };

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
              <CameraIcon width={28} height={28} style={styles.ctaIcon} />
              <Text style={styles.ctaBtnTitle}>사진 촬영</Text>
              <Text style={styles.ctaBtnDesc}>제품 사진으로{'\n'}분석해요</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.ctaBtn}
              activeOpacity={0.8}
              onPress={() => onNavigateFileUpload?.()}
            >
              <UploadIcon width={28} height={28} style={styles.ctaIcon} />
              <Text style={styles.ctaBtnTitle}>파일 업로드</Text>
              <Text style={styles.ctaBtnDesc}>사진 파일로{'\n'}분석해요</Text>
            </TouchableOpacity>
          </View>

          {/* 분석 요약 */}
          <View style={styles.summarySection}>
            <Text style={styles.sectionTitle}>분석 요약</Text>
            <View style={styles.summaryRow}>
              {summaryCards.map((card) => {
                const meta = CATEGORY_META[card.category] || CATEGORY_META.NEEDS_REVIEW;
                const SummaryIcon = meta.icon;
                return (
                  <View key={card.category} style={styles.summaryCard}>
                    <SummaryIcon width={30} height={30} style={styles.summaryIcon} />
                    <Text style={styles.summaryLabel}>{card.title}</Text>
                    <Text style={[styles.summaryCount, { color: meta.color }]}>
                      {String(card.count).padStart(2, '0')}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.routineSection}>
            <View style={styles.tagsRow}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {FILTERS.map((filter) => {
                  const active = !viewingDiscontinued && activeFilter === filter.key;
                  return (
                    <TouchableOpacity
                      key={filter.key}
                      activeOpacity={0.8}
                      onPress={() => selectFilter(filter.key)}
                    >
                      {active ? (
                        <View style={styles.tagActive}>
                          <Text style={styles.tagTextActive}>{filter.label}</Text>
                        </View>
                      ) : (
                        <InputGlass
                          glass={filter.key === 'all' ? 'vanity_s' : 'vanity'}
                          style={styles.tagInactive}
                        >
                          <Text style={styles.tagTextInactive}>{filter.label}</Text>
                        </InputGlass>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>

              {!isDeleteMode && (
                <View style={styles.topActionRow}>
                  <TouchableOpacity onPress={() => setViewingDiscontinued((v) => !v)}>
                    {viewingDiscontinued ? (
                      <View style={styles.tagActive}>
                        <Text style={styles.tagTextActive}>사용 중단</Text>
                      </View>
                    ) : (
                      <InputGlass glass="vanity" style={styles.tagInactive}>
                        <Text style={styles.tagTextInactive}>사용 중단</Text>
                      </InputGlass>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={handleEnterDeleteMode}
                  >
                    <TrashIcon width={11} height={12} style={{ marginRight: 4 }} />
                    <Text style={{ color: '#E78483', fontSize: 11, fontFamily: 'Pretendard-Regular' }}>삭제</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* 제품 리스트 */}
            {viewingDiscontinued && (
              <Text style={styles.discontinuedLabel}>사용 중단한 제품</Text>
            )}
            {isLoading ? (
              <ActivityIndicator color="#945C2D" style={{ marginVertical: 40 }} />
            ) : (
              <View style={styles.productList}>
                {products.map((product) => {
                  const meta = CATEGORY_META[product.analysisCategory] || CATEGORY_META.NEEDS_REVIEW;
                  const SafetyIcon = meta.icon;
                  const isSelected = selectedIds.includes(product.productId);

                  return (
                    <TouchableOpacity
                      key={product.productId}
                      style={[styles.productCard, isDeleteMode && isSelected && styles.productCardSelected]}
                      activeOpacity={0.7}
                      onPress={() =>
                        isDeleteMode ? toggleSelect(product.productId) : onNavigateDetail?.(product)
                      }
                    >
                      {isDeleteMode && (
                        <View style={[styles.checkCircle, isSelected && styles.checkCircleSelected]}>
                          {isSelected && <Text style={styles.checkMark}>✓</Text>}
                        </View>
                      )}
                      <View style={styles.productImgPlaceholder}>
                        {product.imageUrl ? (
                          <Image source={{ uri: product.imageUrl }} style={styles.productImg} resizeMode="cover" />
                        ) : (
                          <Text style={{ fontSize: 28 }}>🧴</Text>
                        )}
                      </View>
                      <View style={styles.productInfo}>
                        <Text style={styles.productTitle} numberOfLines={1}>{product.productName}</Text>
                        <Text style={styles.productDesc} numberOfLines={2}>{product.description}</Text>
                      </View>
                      <View style={styles.statusIconRow}>
                        <SafetyIcon width={30} height={30} />
                        {!isDeleteMode && <Text style={styles.statusChevron}>&gt;</Text>}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {/* Pagination */}
            <View style={styles.pagination}>
              <TouchableOpacity
                style={styles.pageBtn}
                disabled={page <= 1}
                onPress={() => setPage((p) => Math.max(1, p - 1))}
              >
                <Text style={styles.pageBtnText}>&lt;</Text>
              </TouchableOpacity>
              <Text style={styles.pageText}>{page} <Text style={{ fontWeight: '400' }}>/ {totalPages}</Text></Text>
              <TouchableOpacity
                style={styles.pageBtn}
                disabled={page >= totalPages}
                onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                <Text style={styles.pageBtnText}>&gt;</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer Info */}
          <View style={{ marginBottom: 40 }}>
            <View style={{ marginHorizontal: -24, marginTop: 28, height: 6, backgroundColor: '#D8C0AD' }} />
            <InfoBox />
          </View>

        </ScrollView>
      </SafeAreaView>

      {/* 삭제 모드 액션 바 (삭제/취소) */}
      {isDeleteMode && (
        <View
          pointerEvents="box-none"
          style={[styles.deleteBarWrap, { left: scale(24), right: scale(24), bottom: scale(130) }]}
        >
          <TouchableOpacity activeOpacity={0.85} onPress={handleConfirmDelete}>
            <BlurView intensity={20} tint="light" style={[styles.deletePill, { height: scale(52), borderRadius: scale(40) }]}>
              <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(221, 127, 120, 0.3)', borderRadius: scale(40) }]} />
              <TrashIcon width={18} height={18} style={{ marginRight: 8 }} />
              <Text style={styles.deletePillText}>삭제 {selectedIds.length}</Text>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} onPress={handleConfirmDiscontinue} style={{ marginTop: 10 }}>
            <BlurView intensity={20} tint="light" style={[styles.discontinuePill, { height: scale(52), borderRadius: scale(40) }]}>
              <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(148, 92, 45, 0.3)', borderRadius: scale(40) }]} />
              <Text style={{ fontSize: 16, marginRight: 8 }}>🚫</Text>
              <Text style={styles.discontinuePillText}>사용 중단 {selectedIds.length}</Text>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} onPress={handleCancelDelete} style={{ marginTop: 10 }}>
            <BlurView intensity={20} tint="light" style={[styles.cancelPill, { height: scale(52), borderRadius: scale(40) }]}>
              <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255, 249, 241, 0.5)', borderRadius: scale(40) }]} />
              <Text style={styles.cancelPillText}>취소</Text>
            </BlurView>
          </TouchableOpacity>
        </View>
      )}

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
    gap: 16,
    marginBottom: 40,
  },
  ctaBtn: {
    flex: 1,
    aspectRatio: 148 / 145,
    backgroundColor: '#F6E9D7',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  ctaIcon: {
    marginBottom: 10,
  },
  ctaBtnTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 15,
    lineHeight: 18,
    color: '#945C2D',
    marginBottom: 10,
  },
  ctaBtnDesc: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 15,
    color: '#945C2D',
    textAlign: 'center',
    lineHeight: 25,
  },
  summarySection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    lineHeight: 17,
    color: '#945C2D',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 8,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingTop: 15,
    paddingBottom: 22,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  summaryIcon: {
    marginBottom: 15,
  },
  summaryLabel: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
    lineHeight: 16,
    color: '#945C2D',
    marginBottom: 15,
  },
  summaryCount: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 11,
    lineHeight: 12,
  },
  routineSection: {
    marginBottom: 0,
  },
  tagsRow: {
    flexDirection: 'column',
    marginBottom: 20,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagTextInactive: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
    lineHeight: 13,
    color: '#BE9D82',
  },
  topActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 20,
  },
  discontinuedLabel: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 13,
    color: '#945C2D',
    marginBottom: 10,
  },
  productList: {
    gap: 10,
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
  productCardSelected: {
    backgroundColor: '#F6E9D7',
  },
  productImgPlaceholder: {
    width: 30,
    height: 70,
    backgroundColor: '#EDE3D9',
    borderRadius: 8,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  productImg: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 13,
    lineHeight: 16,
    color: '#945C2D',
    marginBottom: 10,
  },
  productDesc: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
    color: '#945C2D',
    lineHeight: 19,
  },
  statusIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    marginLeft: 10,
  },
  statusChevron: {
    fontSize: 12,
    color: '#BE9D82',
  },
  checkCircle: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FBF9F7',
    borderWidth: 0.5,
    borderColor: '#BE9D82',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  checkCircleSelected: {
    backgroundColor: '#945C2D',
    borderColor: '#945C2D',
  },
  checkMark: {
    color: '#F5F5F5',
    fontSize: 8,
    fontWeight: 'bold',
    lineHeight: 9,
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
  deleteBarWrap: {
    position: 'absolute',
    zIndex: 25,
  },
  deletePill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#BE9D82',
    overflow: 'hidden',
  },
  deletePillText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    letterSpacing: -0.4,
    color: '#E78483',
  },
  discontinuePill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#BE9D82',
    overflow: 'hidden',
  },
  discontinuePillText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    letterSpacing: -0.4,
    color: '#945C2D',
  },
  cancelPill: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#BE9D82',
    overflow: 'hidden',
  },
  cancelPillText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    letterSpacing: -0.4,
    color: '#BE9D82',
  },
});
