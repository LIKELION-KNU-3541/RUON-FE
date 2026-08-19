import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ResearchAgainModal from '../components/ResearchAgainModal';
import ResultIcon from '../../../../assets/icons/result_icon.svg';

const backgroundSource = require('../../../../assets/images/MainHome-bg.png');

/**
 * 분석 결과 확인 화면 ("이 제품이 맞나요?")
 * @param {object} scanResult - AnalyzingScreen에서 넘어온 스캔 결과 ({ scanId, product, imageUrl, analysis })
 * @param {function} onClose - 닫기 (X)
 * @param {function} onConfirm - "네, 맞아요" 버튼
 * @param {function} onNavigateCamera - "제품 다시 찾기" 시트에서 "사진 촬영" 선택
 * @param {function} onNavigateFileUpload - "제품 다시 찾기" 시트에서 "파일 업로드" 선택
 */
export default function ProductConfirmScreen({
  product: scanResult,
  onClose,
  onConfirm,
  onNavigateCamera,
  onNavigateFileUpload,
}) {
  const [showResearchModal, setShowResearchModal] = useState(false);
  const { product, imageUrl } = scanResult;

  const handleRetryCamera = () => {
    setShowResearchModal(false);
    onNavigateCamera?.();
  };

  const handleRetryFileUpload = () => {
    setShowResearchModal(false);
    onNavigateFileUpload?.();
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

        <Text style={styles.title}>이 제품이 맞나요?</Text>
        <Text style={styles.subtitle}>인식된 제품 정보를 확인해주세요.</Text>

        <View style={styles.imageCard}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
          ) : (
            <Text style={styles.imagePlaceholder}>🧴</Text>
          )}
        </View>

        <Text style={styles.productName}>{product.productName ?? '제품명을 확인할 수 없어요'}</Text>

        <View style={styles.infoBlock}>
          <View style={styles.infoLine}>
            <Text style={styles.infoText}>브랜드</Text>
            <Text style={styles.infoText}>{product.brandName ?? '-'}</Text>
          </View>
          <View style={styles.infoLine}>
            <Text style={styles.infoText}>용량</Text>
            <Text style={styles.infoText}>{product.capacity ?? '-'}</Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.rejectBtn} activeOpacity={0.8} onPress={() => setShowResearchModal(true)}>
            <Text style={styles.rejectBtnText}>아니요</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.8} onPress={() => onConfirm?.(scanResult)}>
            <Text style={styles.confirmBtnText}>네, 맞아요</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ResearchAgainModal
        visible={showResearchModal}
        onClose={() => setShowResearchModal(false)}
        onCamera={handleRetryCamera}
        onFileUpload={handleRetryFileUpload}
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
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
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
    marginBottom: 50,
  },
  imageCard: {
    width: 179,
    aspectRatio: 179 / 224.63,
    alignSelf: 'center',
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
    fontSize: 56,
  },
  productName: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    lineHeight: 21,
    color: '#945C2D',
    textAlign: 'center',
    marginBottom: 32,
  },
  infoBlock: {
    width: 179,
    alignSelf: 'center',
    gap: 6,
  },
  infoLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    lineHeight: 17,
    color: '#C47D41',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 'auto',
    marginBottom: 24,
  },
  rejectBtn: {
    flex: 1,
    height: 61,
    borderRadius: 20,
    backgroundColor: '#F6E9D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectBtnText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: '#945C2D',
  },
  confirmBtn: {
    flex: 1,
    height: 61,
    borderRadius: 20,
    backgroundColor: '#945C2D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: '#FFF9F1',
  },
});
