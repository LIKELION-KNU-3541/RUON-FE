import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Alert,
  ImageBackground,
} from 'react-native';
import AnalyzingStepIndicator from '../components/AnalyzingStepIndicator';
import { createScan, getScan, getScanAnalysis } from '../api/scanApi';
import { ApiError } from '../../../shared/api/client';

const backgroundSource = require('../../../../assets/images/MainHome-bg.png');
const loadingSource = require('../../../../assets/images/loading@x3.png');

// scan.status -> AnalyzingStepIndicator 단계(0: 제품명 확인, 1: 전성분 확인, 2: 현재 상태 반영)
const STATUS_STEP = {
  UPLOADED: 0,
  OCR_PROCESSING: 0,
  STRUCTURING: 1,
  ANALYZING: 2,
  IMAGE_SEARCHING: 2,
};

const POLL_INTERVAL_MS = 1500;
const SCAN_MAX_POLLS = 120; // OCR/RAG 처리 대기: 최대 약 3분
const ANALYSIS_MAX_POLLS = 120;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 제품 분석 중 화면
 * 사진 업로드(POST /scan) → 스캔 완료 폴링(GET /scan/{id}) → RAG 분석 결과 폴링(GET /scan/{id}/analysis)
 * @param {string} photoUri - 분석할 사진의 로컬 uri
 * @param {function} onBack - 뒤로 가기
 * @param {function} onComplete - 분석 완료 콜백 ({ scanId, product, imageUrl, analysis })
 */
export default function AnalyzingScreen({ photoUri, onBack, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinAnimation.start();
    return () => spinAnimation.stop();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!photoUri) {
        Alert.alert('오류', '분석할 사진이 없어요.', [{ text: '확인', onPress: () => onBack?.() }]);
        return;
      }

      try {
        const { scanId } = await createScan(photoUri);

        let scan = null;
        for (let i = 0; i < SCAN_MAX_POLLS; i += 1) {
          if (cancelled) return;
          scan = await getScan(scanId);
          if (scan.status === 'COMPLETED' || scan.status === 'FAILED') break;
          setCurrentStep(STATUS_STEP[scan.status] ?? 0);
          await sleep(POLL_INTERVAL_MS);
        }
        if (scan?.status === 'FAILED') {
          const failureMessage = scan.errorMessage
            ?? scan.failureReason
            ?? '제품 인식에 실패했어요. 제품명과 전성분이 선명하게 보이는 사진으로 다시 시도해주세요.';
          throw new ApiError('SCAN_FAILED', failureMessage);
        }
        if (!scan || scan.status !== 'COMPLETED') {
          throw new ApiError(
            'SCAN_TIMEOUT',
            '제품 분석이 예상보다 오래 걸리고 있어요. 잠시 후 다시 시도해주세요.',
          );
        }
        if (cancelled) return;
        setCurrentStep(2);

        let analysis = null;
        for (let i = 0; i < ANALYSIS_MAX_POLLS; i += 1) {
          if (cancelled) return;
          try {
            analysis = await getScanAnalysis(scanId);
            break;
          } catch (e) {
            if (e instanceof ApiError && e.code === 'ANALYSIS_NOT_READY') {
              await sleep(POLL_INTERVAL_MS);
              continue;
            }
            throw e;
          }
        }
        if (!analysis) {
          throw new ApiError('ANALYSIS_TIMEOUT', '성분 분석이 지연되고 있어요. 잠시 후 다시 시도해주세요.');
        }

        if (cancelled) return;
        setCurrentStep(3);
        setTimeout(() => {
          if (!cancelled) {
            onComplete?.({ scanId, product: scan.product, imageUrl: scan.imageUrl, analysis });
          }
        }, 500);
      } catch (e) {
        if (cancelled) return;
        const message = e instanceof ApiError ? e.message : '분석 중 오류가 발생했어요.';
        Alert.alert('분석 실패', message, [{ text: '확인', onPress: () => onBack?.() }]);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [photoUri]);

  return (
    <ImageBackground source={backgroundSource} resizeMode="cover" style={styles.root}>
      {/* 닫기 버튼 */}
      <TouchableOpacity style={styles.closeBtn} onPress={onBack}>
        <Text style={styles.closeBtnText}>✕</Text>
      </TouchableOpacity>

      <View style={styles.center}>
        {/* 스피너 */}
        <Animated.Image
          source={loadingSource}
          style={[styles.spinner, { transform: [{ rotate: spin }] }]}
          resizeMode="contain"
        />

        <Text style={styles.title}>제품 정보를 확인하고 있어요</Text>

        {/* 단계 인디케이터 */}
        <AnalyzingStepIndicator currentStep={currentStep} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  closeBtn: {
    position: 'absolute',
    top: 56,
    right: 24,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeBtnText: {
    color: '#945C2D',
    fontSize: 18,
    fontFamily: 'Pretendard-Medium',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  spinner: {
    width: 64,
    height: 64,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    color: '#945C2D',
    textAlign: 'center',
  },
});
