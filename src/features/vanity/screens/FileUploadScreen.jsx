import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import UploadIcon from '../../../../assets/icons/upload_icon.svg';

/**
 * 파일 업로드 화면
 * 갤러리에서 이미지를 선택해 onNext(uri)로 전달 (카메라는 사용하지 않음)
 * @param {function} onBack - 뒤로 가기 / 닫기
 * @param {function} onNext - "다음" 버튼 탭 (uri: string)
 */
export default function FileUploadScreen({ onBack, onNext }) {
  const [photoUri, setPhotoUri] = useState(null);

  const handlePickFile = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '갤러리 접근 권한이 필요합니다.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.9,
      allowsEditing: false,
    });
    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleClear = () => setPhotoUri(null);

  const handleNext = () => {
    if (!photoUri) return;
    onNext?.(photoUri);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Text style={styles.headerIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>파일 업로드</Text>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Text style={styles.headerIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>제품 사진을 업로드하면{'\n'}정보를 분석해요</Text>
      <Text style={styles.subtitle}>
        제품 정면, 라벨 또는 전성분표가{'\n'}잘 보이는 이미지를 업로드해 주세요.
      </Text>

      {photoUri ? (
        <View style={styles.previewWrap}>
          <Image source={{ uri: photoUri }} style={styles.previewImage} resizeMode="cover" />
          <TouchableOpacity style={styles.clearBtn} activeOpacity={0.8} onPress={handleClear}>
            <Text style={styles.clearBtnText}>✕</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.dropZone} activeOpacity={0.85} onPress={handlePickFile}>
          <UploadIcon width={79} height={81} style={styles.uploadIcon} />
          <Text style={styles.dropTitle}>파일을 업로드해 주세요</Text>
          <Text style={styles.dropSub}>JPG, PNG 파일만 가능</Text>
          <View style={styles.selectBtn}>
            <Text style={styles.selectBtnText}>사진 선택하기</Text>
          </View>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.nextBtn, !photoUri && styles.nextBtnDisabled]}
        activeOpacity={0.8}
        disabled={!photoUri}
        onPress={handleNext}
      >
        <Text style={styles.nextBtnText}>다음</Text>
      </TouchableOpacity>

      {photoUri && (
        <TouchableOpacity style={styles.reuploadBtn} activeOpacity={0.8} onPress={handlePickFile}>
          <Text style={styles.reuploadBtnText}>다시 업로드</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FBF9F7',
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  headerBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: 20,
    color: '#945C2D',
  },
  headerTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: '#945C2D',
  },
  title: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    lineHeight: 28,
    color: '#945C2D',
    textAlign: 'center',
    marginTop: 24,
  },
  subtitle: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 13,
    lineHeight: 20,
    color: '#BE9D82',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 32,
  },
  dropZone: {
    flex: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#BE9D82',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    marginBottom: 24,
  },
  uploadIcon: {
    marginBottom: 10,
  },
  dropTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    lineHeight: 17,
    color: '#945C2D',
    marginBottom: 10,
  },
  dropSub: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    lineHeight: 14,
    color: '#945C2D',
    marginBottom: 20,
  },
  selectBtn: {
    backgroundColor: '#945C2D',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  selectBtnText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    color: '#FFF9F1',
  },
  previewWrap: {
    flex: 1,
    marginBottom: 24,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#F0E4D6',
  },
  clearBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnText: {
    fontSize: 13,
    color: '#945C2D',
  },
  nextBtn: {
    backgroundColor: '#945C2D',
    borderRadius: 20,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  nextBtnDisabled: {
    opacity: 0.4,
  },
  nextBtnText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: '#FFF9F1',
  },
  reuploadBtn: {
    backgroundColor: '#FFF9F1',
    borderWidth: 1,
    borderColor: '#E8D9CB',
    borderRadius: 20,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  reuploadBtnText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 15,
    color: '#945C2D',
  },
});
