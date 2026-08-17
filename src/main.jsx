import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppRoutes from './routes';
import OnboardingFlow from './features/onboarding/screens/OnboardingFlow';

export default function Main() {
  const [onboarded, setOnboarded] = useState(false);

  return (
    <SafeAreaProvider>
      {onboarded ? (
        <AppRoutes />
      ) : (
        <OnboardingFlow onComplete={() => setOnboarded(true)} />
      )}
    </SafeAreaProvider>
  );
}
