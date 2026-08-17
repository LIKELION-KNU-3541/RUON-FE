import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppRoutes from './routes';
import OnboardingFlow from './features/onboarding/screens/OnboardingFlow';

export default function Main() {
  const [onboarded, setOnboarded] = useState(false);
  const [surveyData, setSurveyData] = useState(null);

  const completeOnboarding = (data) => {
    setSurveyData(data);
    setOnboarded(true);
  };

  return (
    <SafeAreaProvider>
      {onboarded ? (
        <AppRoutes surveyData={surveyData} />
      ) : (
        <OnboardingFlow onComplete={completeOnboarding} />
      )}
    </SafeAreaProvider>
  );
}
