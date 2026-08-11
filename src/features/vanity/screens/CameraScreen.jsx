import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

/**
 * 카메라 화면
 * 사진 촬영 또는 갤러리 선택 후 onPhotoTaken(uri) 콜백 호출
 * @param {function} onBack - 뒤로 가기
 * @param {function} onPhotoTaken - 촬영/선택 완료 콜백 (uri: string)
 */
export default function CameraScreen({ onBack, onPhotoTaken }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef(null);

  // 갤러리에서 사진 선택
  const handleGalleryPick = async () => {
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
      onPhotoTaken?.(result.assets[0].uri);
    }
  };

  // 카메라로 촬영
  const handleCapture = async () => {
    if (!cameraRef.current || isCapturing) return;
    setIsCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.9 });
      onPhotoTaken?.(photo.uri);
    } catch (e) {
      Alert.alert('오류', '사진 촬영에 실패했어요.');
    } finally {
      setIsCapturing(false);
    }
  };

  // 카메라 권한 요청 중
  if (!permission) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color="#945C2D" />
      </View>
    );
  }

  // 권한 없음
  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.permText}>카메라 접근 권한이 필요해요</Text>
        <TouchableOpacity style={styles.permBtn} onPress={requestPermission}>
          <Text style={styles.permBtnText}>권한 허용하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backLink} onPress={onBack}>
          <Text style={styles.backLinkText}>돌아가기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {/* 카메라 뷰 */}
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        {/* 상단 닫기 버튼 */}
        <TouchableOpacity style={styles.closeBtn} onPress={onBack}>
          <Text style={styles.closeBtnText}>✕</Text>
        </TouchableOpacity>

        {/* 가이드 프레임 */}
        <View style={styles.frameGuide}>
          <Text style={styles.frameGuideText}>성분표가 잘 보이도록 맞춰주세요</Text>
        </View>

        {/* 하단 컨트롤 */}
        <View style={styles.bottomControls}>
          {/* 갤러리 버튼 */}
          <TouchableOpacity style={styles.sideBtn} onPress={handleGalleryPick}>
            <Text style={styles.sideBtnIcon}>🖼️</Text>
            <Text style={styles.sideBtnLabel}>갤러리</Text>
          </TouchableOpacity>

          {/* 셔터 버튼 */}
          <TouchableOpacity
            style={[styles.shutter, isCapturing && styles.shutterCapturing]}
            onPress={handleCapture}
            activeOpacity={0.8}
            disabled={isCapturing}
          >
            {isCapturing ? (
              <ActivityIndicator color="#945C2D" size="large" />
            ) : (
              <View style={styles.shutterInner} />
            )}
          </TouchableOpacity>

          {/* 전/후면 전환 */}
          <TouchableOpacity
            style={styles.sideBtn}
            onPress={() => setFacing((f) => (f === 'back' ? 'front' : 'back'))}
          >
            <Text style={styles.sideBtnIcon}>🔄</Text>
            <Text style={styles.sideBtnLabel}>전환</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  permText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: '#3D2B1F',
    marginBottom: 20,
    textAlign: 'center',
  },
  permBtn: {
    backgroundColor: '#945C2D',
    borderRadius: 14,
    paddingHorizontal: 28,
    paddingVertical: 14,
    marginBottom: 12,
  },
  permBtnText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  backLink: {
    padding: 10,
  },
  backLinkText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    color: '#B9A18F',
  },
  camera: {
    flex: 1,
  },
  closeBtn: {
    position: 'absolute',
    top: 56,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
  },
  frameGuide: {
    position: 'absolute',
    top: '35%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  frameGuideText: {
    color: 'rgba(255,255,255,0.85)',
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 50,
    paddingTop: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sideBtn: {
    alignItems: 'center',
    width: 60,
  },
  sideBtnIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  sideBtnLabel: {
    color: '#FFFFFF',
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
  },
  shutter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterCapturing: {
    opacity: 0.7,
  },
  shutterInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
  },
});
