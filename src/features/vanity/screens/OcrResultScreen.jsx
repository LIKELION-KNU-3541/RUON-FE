import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// TODO: 서버 연동 시 DUMMY_PRODUCTS import 삭제 및 API(OCR) 응답 데이터 사용
import { DUMMY_PRODUCTS } from '../data/dummyData';

const backgroundSource = require('../../../../assets/images/MainHome-bg.png');

function EditableField({ label, value, expandable, expanded, onToggleExpand }) {
  return (
    <View style={styles.fieldCard}>
      <View style={styles.fieldTop}>
        <View style={styles.fieldLabelRow}>
          <Text style={styles.fieldLabel}>{label}</Text>
          {expandable && (
            <TouchableOpacity onPress={onToggleExpand} hitSlop={8} style={styles.chevronBtn}>
              <Text style={styles.chevron}>{expanded ? '⌃' : '⌄'}</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.editIcon}>✎</Text>
      </View>
      <Text style={styles.fieldValue} numberOfLines={expandable && !expanded ? 1 : undefined}>
        {value}
      </Text>
    </View>
  );
}

/**
 * OCR 분석 결과 확인 화면
 * 인식된 제품 정보를 항목별로 보여주고, 전성분은 펼쳐보기 지원
 * @param {object} product - 인식된 제품 데이터 (없으면 더미 첫 번째 제품 사용)
 * @param {function} onClose - 닫기 (X)
 * @param {function} onBack - "이전" 버튼
 * @param {function} onNext - "다음" 버튼
 */
export default function OcrResultScreen({ product: productProp, onClose, onBack, onNext }) {
  // TODO: 서버 연동 시 아래 더미 폴백 삭제 (product은 항상 API 응답에서 옴)
  const product = productProp ?? DUMMY_PRODUCTS[0];
  const { basicInfo } = product;
  const [ingredientsExpanded, setIngredientsExpanded] = useState(false);

  return (
    <ImageBackground source={backgroundSource} resizeMode="cover" style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.sparkle}>✦</Text>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>OCR 분석 결과</Text>
        <Text style={styles.subtitle}>
          인식된 제품 정보를 확인해주세요.{'\n'}잘못 인식된 정보는 직접 수정할 수 있어요.
        </Text>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.imageCard}>
            {product.image ? (
              <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
            ) : (
              <Text style={styles.imagePlaceholder}>🧴</Text>
            )}
          </View>

          <EditableField label="제품명" value={basicInfo.productName} />
          <EditableField label="브랜드" value={basicInfo.brand} />
          <EditableField label="용량" value={basicInfo.volume} />
          <EditableField
            label="전성분"
            value={basicInfo.fullIngredients ?? basicInfo.mainIngredients}
            expandable
            expanded={ingredientsExpanded}
            onToggleExpand={() => setIngredientsExpanded((v) => !v)}
          />
        </ScrollView>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.prevBtn} activeOpacity={0.8} onPress={onBack}>
            <Text style={styles.prevBtnText}>이전</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextBtn} activeOpacity={0.8} onPress={() => onNext?.(product)}>
            <Text style={styles.nextBtnText}>다음</Text>
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
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 24,
  },
  sparkle: {
    fontSize: 20,
    color: '#945C2D',
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 18,
    color: '#945C2D',
  },
  title: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 22,
    lineHeight: 32,
    color: '#945C2D',
    textAlign: 'center',
    marginTop: 6,
  },
  subtitle: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 13,
    lineHeight: 19,
    color: '#BE9D82',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  imageCard: {
    width: 120,
    height: 150,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    fontSize: 44,
  },
  fieldCard: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  fieldTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  fieldLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  fieldLabel: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: '#BE9D82',
  },
  chevronBtn: {
    paddingHorizontal: 2,
  },
  chevron: {
    fontSize: 13,
    color: '#BE9D82',
  },
  editIcon: {
    fontSize: 13,
    color: '#BE9D82',
  },
  fieldValue: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 15,
    lineHeight: 22,
    color: '#945C2D',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    marginBottom: 24,
  },
  prevBtn: {
    flex: 1,
    height: 58,
    borderRadius: 20,
    backgroundColor: '#F6E9D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevBtnText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: '#945C2D',
  },
  nextBtn: {
    flex: 1,
    height: 58,
    borderRadius: 20,
    backgroundColor: '#945C2D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtnText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: '#FFF9F1',
  },
});
