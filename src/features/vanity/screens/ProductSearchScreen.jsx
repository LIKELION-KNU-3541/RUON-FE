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
// TODO: 서버 연동 시 DUMMY_RECENT_SEARCHES import 삭제 및 API 호출로 대체
import { DUMMY_RECENT_SEARCHES } from '../data/dummyData';

/**
 * 제품 검색 화면
 * @param {function} onBack - 뒤로 가기
 * @param {function} onSearch - 검색어 제출 콜백 (query: string)
 */
export default function ProductSearchScreen({ onBack, onSearch }) {
  const { scale, moderateScale } = useResponsiveScale();
  const [query, setQuery] = useState('');

  // TODO: 서버 연동 시 아래 더미 최근 검색어 삭제 및 유저 검색 히스토리 API로 대체
  const recentSearches = DUMMY_RECENT_SEARCHES;

  const handleSubmit = () => {
    if (query.trim()) {
      onSearch?.(query.trim());
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

        {/* 검색 입력창 */}
        <View style={[styles.searchBar, { marginHorizontal: scale(24) }]}>
          <TextInput
            style={styles.searchInput}
            placeholder="제품명, 브랜드명으로 검색"
            placeholderTextColor="#C4A98A"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSubmit}
            returnKeyType="search"
            autoFocus
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.searchIcon}>
            <Text style={styles.searchIconText}>🔍</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, { paddingHorizontal: scale(24) }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* 주변 검색 섹션 (TODO: 위치 기반 API 연동 필요) */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: moderateScale(14) }]}>
              주변 검색
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipRow}
            >
              {/* TODO: 서버 연동 시 위치 기반 주변 검색 API 결과로 대체 */}
              {['피부과 권장', '임신부 안전', '저자극', '무향'].map((chip) => (
                <TouchableOpacity
                  key={chip}
                  style={styles.chip}
                  onPress={() => {
                    setQuery(chip);
                    onSearch?.(chip);
                  }}
                >
                  <Text style={styles.chipText}>{chip}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* 최근 검색 섹션 */}
          <View style={styles.section}>
            <View style={styles.sectionRow}>
              <Text style={[styles.sectionTitle, { fontSize: moderateScale(14) }]}>
                최근 검색
              </Text>
              {/* TODO: 서버 연동 시 검색 기록 전체 삭제 API 호출 */}
              <TouchableOpacity>
                <Text style={styles.clearAll}>전체 삭제</Text>
              </TouchableOpacity>
            </View>

            {recentSearches.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.recentItem}
                onPress={() => {
                  setQuery(item.name);
                  onSearch?.(item.name);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.clockIcon}>🕐</Text>
                <Text style={styles.recentText}>{item.name}</Text>
                <Text style={styles.recentArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 검색 불가 안내 */}
          <View style={styles.noticeBox}>
            <Text style={styles.noticeIcon}>ℹ️</Text>
            <Text style={styles.noticeText}>
              검색 결과에 제품이 없다면 카메라로 성분표를 직접 찍어 분석할 수 있어요.
            </Text>
          </View>
        </ScrollView>
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
    marginBottom: 24,
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
  searchIconText: {
    fontSize: 18,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 28,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Pretendard-SemiBold',
    color: '#3D2B1F',
    marginBottom: 12,
  },
  clearAll: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: '#B9A18F',
  },
  chipRow: {
    gap: 8,
    paddingVertical: 2,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5EDE3',
    borderWidth: 1,
    borderColor: '#EDE3D9',
  },
  chipText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 13,
    color: '#945C2D',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDE3D9',
  },
  clockIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  recentText: {
    flex: 1,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    color: '#3D2B1F',
  },
  recentArrow: {
    fontSize: 18,
    color: '#C4A98A',
  },
  noticeBox: {
    flexDirection: 'row',
    backgroundColor: '#FDF8F4',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EDE3D9',
    gap: 10,
  },
  noticeIcon: {
    fontSize: 16,
    marginTop: 1,
  },
  noticeText: {
    flex: 1,
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: '#A97550',
    lineHeight: 18,
  },
});
