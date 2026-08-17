import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

/**
 * "제품 다시 찾기" 바텀시트 모달
 * 분석 결과 확인 화면에서 "아니요" 선택 시 표시
 * @param {boolean} visible
 * @param {function} onClose - 배경 탭 / 취소 버튼
 * @param {function} onCamera - "사진 촬영" 선택
 * @param {function} onFileUpload - "파일 업로드" 선택
 */
export default function ResearchAgainModal({ visible, onClose, onCamera, onFileUpload }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

      <View style={styles.sheet}>
        <View style={styles.handle} />

        <Text style={styles.title}>제품 다시 찾기</Text>
        <Text style={styles.subtitle}>
          인식된 제품이 다르다면{'\n'}원하는 방법으로 다시 검색해 주세요.
        </Text>

        <View style={styles.optionRow}>
          <TouchableOpacity style={styles.optionBtn} activeOpacity={0.8} onPress={onCamera}>
            <View style={styles.optionIconWrapper}>
              <Text style={styles.optionIcon}>📷</Text>
            </View>
            <Text style={styles.optionTitle}>사진 촬영</Text>
            <Text style={styles.optionDesc}>제품 사진으로{'\n'}분석해요</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionBtn} activeOpacity={0.8} onPress={onFileUpload}>
            <View style={styles.optionIconWrapper}>
              <Text style={styles.optionIcon}>📄</Text>
            </View>
            <Text style={styles.optionTitle}>파일 업로드</Text>
            <Text style={styles.optionDesc}>사진 파일로{'\n'}분석해요</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.8} onPress={onClose}>
          <Text style={styles.cancelBtnText}>취소</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(40,37,35,0.5)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBF9F7',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  handle: {
    width: 54,
    height: 2,
    backgroundColor: 'rgba(190,157,130,0.5)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    lineHeight: 21,
    color: '#945C2D',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    lineHeight: 23,
    color: '#945C2D',
    textAlign: 'center',
    marginBottom: 32,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  optionBtn: {
    flex: 1,
    aspectRatio: 148 / 145,
    backgroundColor: '#F6E9D7',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  optionIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF9F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  optionIcon: {
    fontSize: 14,
  },
  optionTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 15,
    color: '#945C2D',
    marginBottom: 6,
  },
  optionDesc: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    color: '#945C2D',
    textAlign: 'center',
    lineHeight: 18,
  },
  cancelBtn: {
    backgroundColor: '#945C2D',
    borderRadius: 20,
    height: 61,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: '#FFF9F1',
  },
});
