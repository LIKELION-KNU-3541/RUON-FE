import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// TODO: 서버 연동 시 DUMMY_PRODUCTS import 삭제 및 API(OCR) 응답 데이터 사용
import { DUMMY_PRODUCTS } from '../data/dummyData';
import ResultIcon from '../../../../assets/icons/result_icon.svg';
import PencilIcon from '../../../../assets/icons/update_pencil_icon.svg';

const backgroundSource = require('../../../../assets/images/MainHome-bg.png');

/**
 * 인식 결과 항목 한 줄 (라벨 + 값 + 연필 버튼)
 * 연필을 누르면 값을 직접 수정할 수 있는 입력 모드로 전환됨
 */
function EditableField({
  label,
  value,
  onChangeValue,
  expandable,
  expanded,
  onToggleExpand,
  isEditing,
  onStartEdit,
  onFinishEdit,
}) {
  return (
    <View style={styles.fieldRow}>
      <View style={styles.fieldTextCol}>
        <View style={styles.fieldLabelRow}>
          <Text style={styles.fieldLabel}>{label}</Text>
          {expandable && !isEditing && (
            <TouchableOpacity onPress={onToggleExpand} hitSlop={8}>
              <Text style={styles.chevron}>{expanded ? '⌃' : '⌄'}</Text>
            </TouchableOpacity>
          )}
        </View>

        {isEditing ? (
          <TextInput
            style={styles.fieldInput}
            value={value}
            onChangeText={onChangeValue}
            autoFocus
            multiline={expandable}
            onSubmitEditing={!expandable ? onFinishEdit : undefined}
            onBlur={onFinishEdit}
            returnKeyType="done"
          />
        ) : (
          <Text style={styles.fieldValue} numberOfLines={expandable && !expanded ? 1 : undefined}>
            {value}
          </Text>
        )}
      </View>

      <TouchableOpacity
        hitSlop={8}
        onPress={isEditing ? onFinishEdit : onStartEdit}
      >
        {isEditing ? (
          <Text style={styles.editIcon}>✓</Text>
        ) : (
          <PencilIcon width={18} height={18} />
        )}
      </TouchableOpacity>
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
  const [editingField, setEditingField] = useState(null);
  const [fields, setFields] = useState({
    productName: basicInfo.productName,
    brand: basicInfo.brand,
    volume: basicInfo.volume,
    ingredients: basicInfo.fullIngredients ?? basicInfo.mainIngredients,
  });

  const updateField = (key, text) => {
    setFields((prev) => ({ ...prev, [key]: text }));
  };

  const startEdit = (key) => {
    if (key === 'ingredients') setIngredientsExpanded(true);
    setEditingField(key);
  };

  const finishEdit = () => setEditingField(null);

  const handleNext = () => {
    onNext?.({
      ...product,
      name: fields.productName,
      brand: fields.brand,
      volume: fields.volume,
      basicInfo: {
        ...basicInfo,
        productName: fields.productName,
        brand: fields.brand,
        volume: fields.volume,
        fullIngredients: fields.ingredients,
      },
    });
  };

  return (
    <ImageBackground source={backgroundSource} resizeMode="cover" style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <ResultIcon width={24} height={24} />
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
          <View style={styles.card}>
            <View style={styles.imageCard}>
              {product.image ? (
                <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
              ) : (
                <Text style={styles.imagePlaceholder}>🧴</Text>
              )}
            </View>

            <View style={styles.fieldsColumn}>
              <EditableField
                label="제품명"
                value={fields.productName}
                onChangeValue={(text) => updateField('productName', text)}
                isEditing={editingField === 'productName'}
                onStartEdit={() => startEdit('productName')}
                onFinishEdit={finishEdit}
              />
              <EditableField
                label="브랜드"
                value={fields.brand}
                onChangeValue={(text) => updateField('brand', text)}
                isEditing={editingField === 'brand'}
                onStartEdit={() => startEdit('brand')}
                onFinishEdit={finishEdit}
              />
              <EditableField
                label="용량"
                value={fields.volume}
                onChangeValue={(text) => updateField('volume', text)}
                isEditing={editingField === 'volume'}
                onStartEdit={() => startEdit('volume')}
                onFinishEdit={finishEdit}
              />
              <EditableField
                label="전성분"
                value={fields.ingredients}
                onChangeValue={(text) => updateField('ingredients', text)}
                expandable
                expanded={ingredientsExpanded}
                onToggleExpand={() => setIngredientsExpanded((v) => !v)}
                isEditing={editingField === 'ingredients'}
                onStartEdit={() => startEdit('ingredients')}
                onFinishEdit={finishEdit}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.prevBtn} activeOpacity={0.8} onPress={onBack}>
            <Text style={styles.prevBtnText}>이전</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextBtn} activeOpacity={0.8} onPress={handleNext}>
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
    fontSize: 14,
    lineHeight: 20,
    color: '#BE9D82',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FBF9F7',
    borderWidth: 0.5,
    borderColor: '#BE9D82',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 17,
    alignItems: 'center',
  },
  imageCard: {
    width: 95,
    height: 119,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    fontSize: 40,
  },
  fieldsColumn: {
    width: '100%',
    gap: 10,
  },
  fieldRow: {
    width: '100%',
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF9F1',
    borderWidth: 0.5,
    borderColor: '#BE9D82',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  fieldTextCol: {
    flex: 1,
  },
  fieldLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 5,
  },
  fieldLabel: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    lineHeight: 14,
    color: '#BE9D82',
  },
  chevron: {
    fontSize: 13,
    color: '#BE9D82',
  },
  fieldValue: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    lineHeight: 19,
    color: '#945C2D',
  },
  fieldInput: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    lineHeight: 19,
    color: '#945C2D',
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#945C2D',
  },
  editIcon: {
    fontSize: 18,
    color: '#945C2D',
    marginLeft: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
    marginBottom: 24,
  },
  prevBtn: {
    flex: 1,
    height: 61,
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
    height: 61,
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
