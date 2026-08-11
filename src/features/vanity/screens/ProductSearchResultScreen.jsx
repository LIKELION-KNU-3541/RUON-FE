import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useResponsiveScale } from '../../../shared/utils/responsive';
import ProductSearchItem from '../components/ProductSearchItem';
// TODO: 서버 연동 시 DUMMY_SEARCH_RESULTS import 삭제 및 API 호출로 대체
import { DUMMY_SEARCH_RESULTS } from '../data/dummyData';

/**
 * 제품 검색 결과 화면
 * @param {string} query - 검색어
 * @param {function} onBack - 뒤로 가기
 * @param {function} onSelectProduct - 제품 선택 완료 콜백 (product)
 */
export default function ProductSearchResultScreen({ query = '', onBack, onSelectProduct }) {
  const { scale, moderateScale } = useResponsiveScale();
  const [searchText, setSearchText] = useState(query);
  const [selectedId, setSelectedId] = useState(null);

  // TODO: 서버 연동 시 아래 더미 데이터 삭제하고 검색 API 결과로 대체
  const results = DUMMY_SEARCH_RESULTS;

  const handleConfirm = () => {
    const selected = results.find((r) => r.id === selectedId);
    if (selected) {
      onSelectProduct?.(selected);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea}>
        {/* 헤더 */}
        <View style={[styles.header, { paddingHorizontal: scale(24) }]}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <Text style={styles.backBtnText}>‹</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { fontSize: moderateScale(18) }]}>제품 검색</Text>
          <View style={styles.backBtn} />
        </View>

        {/* 검색창 */}
        <View style={[styles.searchBar, { marginHorizontal: scale(24) }]}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => { }}
            returnKeyType="search"
            placeholder="제품명, 브랜드명으로 검색"
            placeholderTextColor="#C4A98A"
          />
          <TouchableOpacity style={styles.searchIcon}>
            <Text>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* 검색 결과 */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingHorizontal: scale(24), paddingBottom: selectedId ? 110 : 40 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* 검색어 표시 */}
          <View style={styles.queryRow}>
            <Text style={styles.queryLabel}>검색어: </Text>
            <Text style={styles.queryText}>"{searchText}"</Text>
          </View>

          {/* 결과 목록 */}
          {results.map((product) => (
            <ProductSearchItem
              key={product.id}
              product={product}
              selected={selectedId === product.id}
              onPress={() =>
                setSelectedId((prev) => (prev === product.id ? null : product.id))
              }
            />
          ))}

          {/* 결과 없음 안내 */}
          {results.length === 0 && (
            <View style={styles.noResult}>
              <Text style={styles.noResultEmoji}>🔍</Text>
              <Text style={styles.noResultText}>검색 결과가 없어요</Text>
              <Text style={styles.noResultSub}>
                카메라로 성분표를 직접 찍어 분석해보세요
              </Text>
            </View>
          )}
        </ScrollView>

        {/* 선택 확정 버튼 */}
        {selectedId && (
          <View style={[styles.confirmBar, { paddingHorizontal: scale(24) }]}>
            <TouchableOpacity
              style={styles.confirmBtn}
              activeOpacity={0.85}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmBtnText}>이 제품으로 확인하기</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    marginTop: 16,
    marginBottom: 16,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnText: {
    fontSize: 28,
    color: '#3D2B1F',
    lineHeight: 30,
  },
  headerTitle: {
    fontFamily: 'Pretendard-SemiBold',
    color: '#3D2B1F',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5EDE3',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    color: '#3D2B1F',
    height: 50,
  },
  searchIcon: {
    padding: 4,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 4,
  },
  queryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  queryLabel: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    color: '#B9A18F',
  },
  queryText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 13,
    color: '#945C2D',
  },
  noResult: {
    alignItems: 'center',
    paddingTop: 60,
  },
  noResultEmoji: {
    fontSize: 48,
    marginBottom: 14,
  },
  noResultText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: '#3D2B1F',
    marginBottom: 8,
  },
  noResultSub: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    color: '#B9A18F',
    textAlign: 'center',
  },
  confirmBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 34,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EDE3D9',
  },
  confirmBtn: {
    backgroundColor: '#945C2D',
    borderRadius: 16,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
