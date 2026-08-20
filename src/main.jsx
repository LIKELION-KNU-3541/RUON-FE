import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppRoutes from './routes';
import OnboardingFlow from './features/onboarding/screens/OnboardingFlow';
import SplashScreen from './features/onboarding/screens/SplashScreen';
import { getAccessToken, isSurveyCompleted, clearAccessToken } from './shared/api/tokenStorage';
import { setUnauthorizedHandler } from './shared/api/client';
// TEMP_DEBUG_RESET_BUTTON: 아래 import, 버튼 JSX 블록, styles 전부 지우면 깔끔하게 제거됨
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SPLASH_MIN_DURATION_MS = 2000;

export default function Main() {
  // 'splash' → 'onboarding'(로그인 안 됨, 로그인부터) | 'survey'(로그인은 됐지만 설문 미완료, Welcome부터) | 'home'(둘 다 완료)
  const [phase, setPhase] = useState('splash');
  const [surveyData, setSurveyData] = useState(null);

  // 토큰 만료/무효(401) 발생 시 어느 화면에서든 로그인 화면으로 되돌림 (client.js에서 호출)
  useEffect(() => {
    setUnauthorizedHandler(() => setPhase('onboarding'));
    return () => setUnauthorizedHandler(null);
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      getAccessToken(),
      isSurveyCompleted(),
      new Promise((resolve) => setTimeout(resolve, SPLASH_MIN_DURATION_MS)),
    ]).then(([token, surveyDone]) => {
      if (cancelled) return;
      if (!token) setPhase('onboarding');
      else if (!surveyDone) setPhase('survey');
      else setPhase('home');
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const completeOnboarding = (data) => {
    setSurveyData(data);
    setPhase('home');
  };

  // TEMP_DEBUG_RESET_BUTTON: 이 함수 지우면 같이 제거
  const handleDebugResetToken = async () => {
    await clearAccessToken();
    setPhase('onboarding');
  };

  return (
    <SafeAreaProvider>
      {phase === 'splash' && <SplashScreen onNext={() => {}} />}
      {phase === 'home' && <AppRoutes surveyData={surveyData} />}
      {phase === 'onboarding' && <OnboardingFlow onComplete={completeOnboarding} startStep={2} />}
      {phase === 'survey' && <OnboardingFlow onComplete={completeOnboarding} startStep={3} />}

      {/* TEMP_DEBUG_RESET_BUTTON: 테스트용, 필요없어지면 이 블록만 삭제 */}
      {phase === 'home' && (
        <TouchableOpacity style={debugStyles.resetBtn} onPress={handleDebugResetToken}>
          <Text style={debugStyles.resetBtnText}>토큰 초기화</Text>
        </TouchableOpacity>
      )}
    </SafeAreaProvider>
  );
}

// TEMP_DEBUG_RESET_BUTTON: 위 스타일 사용하는 블록 지우면 이것도 같이 삭제
const debugStyles = StyleSheet.create({
  resetBtn: {
    position: 'absolute',
    top: 50,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    zIndex: 999,
  },
  resetBtnText: {
    color: '#fff',
    fontSize: 11,
  },
});
