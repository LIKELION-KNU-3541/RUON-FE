import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppRoutes from './routes';
import OnboardingFlow from './features/onboarding/screens/OnboardingFlow';
import SplashScreen from './features/onboarding/screens/SplashScreen';
import { getAccessToken, isSurveyCompleted } from './shared/api/tokenStorage';

const SPLASH_MIN_DURATION_MS = 2000;

export default function Main() {
  // 'splash' → 'onboarding'(로그인 안 됨, 로그인부터) | 'survey'(로그인은 됐지만 설문 미완료, Welcome부터) | 'home'(둘 다 완료)
  const [phase, setPhase] = useState('splash');
  const [surveyData, setSurveyData] = useState(null);

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

  return (
    <SafeAreaProvider>
      {phase === 'splash' && <SplashScreen onNext={() => {}} />}
      {phase === 'home' && <AppRoutes surveyData={surveyData} />}
      {phase === 'onboarding' && <OnboardingFlow onComplete={completeOnboarding} startStep={2} />}
      {phase === 'survey' && <OnboardingFlow onComplete={completeOnboarding} startStep={3} />}
    </SafeAreaProvider>
  );
}
