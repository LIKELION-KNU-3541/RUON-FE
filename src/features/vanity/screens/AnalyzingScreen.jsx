import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import AnalyzingStepIndicator from '../components/AnalyzingStepIndicator';

const backgroundSource = require('../../../../assets/images/MainHome-bg.png');

const STEP_DURATIONS = [1200, 1400, 1000]; // 각 단계 대기 ms (더미)

/**
 * 제품 분석 중 화면
 * 단계별 분석 진행 시뮬레이션 (촬영/선택된 사진은 표시하지 않음)
 * TODO: 서버 연동 시 실제 API 호출로 교체
 * @param {function} onBack - 뒤로 가기
 * @param {function} onComplete - 분석 완료 콜백 (result: product)
 */
export default function AnalyzingScreen({ onBack, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // TODO: 서버 연동 시 아래 더미 단계 시뮬레이션 삭제하고 실제 API 응답으로 교체
    let step = 0;
    const advance = () => {
      if (step >= STEP_DURATIONS.length - 1) {
        // 분석 완료 → 더미 결과로 이동
        setTimeout(() => {
          onComplete?.(null); // TODO: API에서 받은 product 데이터 전달
        }, 600);
        return;
      }
      step += 1;
      setCurrentStep(step);
      setTimeout(advance, STEP_DURATIONS[step]);
    };
    const timer = setTimeout(advance, STEP_DURATIONS[0]);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground source={backgroundSource} resizeMode="cover" style={styles.root}>
      {/* 닫기 버튼 */}
      <TouchableOpacity style={styles.closeBtn} onPress={onBack}>
        <Text style={styles.closeBtnText}>✕</Text>
      </TouchableOpacity>

      <View style={styles.center}>
        {/* 스피너 */}
        <ActivityIndicator size="large" color="#945C2D" style={styles.spinner} />

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
    marginBottom: 24,
    transform: [{ scale: 1.4 }],
  },
  title: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    color: '#945C2D',
    textAlign: 'center',
  },
});
