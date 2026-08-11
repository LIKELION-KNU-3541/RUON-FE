import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const GUIDE_STEPS = [
  {
    id: 1,
    emoji: '📦',
    title: '성분표를 선명하게',
  },
  {
    id: 2,
    emoji: '📸',
    title: '밝은 곳에서',
  },
  {
    id: 3,
    emoji: '✅',
    title: '한 제품씩',
  },
];

/**
 * 사진 촬영 가이드 모달
 * @param {boolean} visible
 * @param {function} onClose
 * @param {function} onCapture - "촬영하기" 버튼 탭
 */
export default function PhotoGuideModal({ visible, onClose, onCapture }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* 배경 어둡게 */}
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

      <View style={styles.sheet}>
        <View style={styles.handle} />

        <Text style={styles.title}>사진 촬영 가이드</Text>
        <Text style={styles.subtitle}>
          분석 정확도를 높이기 위해 아래 가이드를 따라주세요.
        </Text>

        {/* 가이드 스텝 */}
        <View style={styles.steps}>
          {GUIDE_STEPS.map((step, index) => (
            <View key={step.id} style={styles.stepRow}>
              {/* 이미지 영역 (추후 실제 가이드 이미지로 교체) */}
              <View style={styles.stepImage}>
                <Text style={styles.stepEmoji}>{step.emoji}</Text>
              </View>
              <View style={styles.stepInfo}>
                <Text style={styles.stepTitle}>{step.title}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* CTA 버튼 */}
        <TouchableOpacity style={styles.captureBtn} activeOpacity={0.8} onPress={onCapture}>
          <Text style={styles.captureBtnText}>촬영하기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: '#E0D0C4',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    lineHeight: 21,
    color: '#945C2D',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    color: '#945C2D',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 24,
  },
  steps: {
    marginBottom: 28,
    gap: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF8F4',
    borderRadius: 14,
    padding: 14,
  },
  stepImage: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#F0E4D6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  stepEmoji: {
    fontSize: 26,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    lineHeight: 17,
    color: '#945C2D',
  },
  captureBtn: {
    backgroundColor: '#945C2D',
    borderRadius: 16,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  captureBtnText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
