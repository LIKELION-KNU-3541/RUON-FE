import './global.css';
import React from 'react';
import { View } from 'react-native';
import OnboardingFlow from './src/screens/onboarding/OnboardingFlow';

export default function App() {
  return (
    <View className="flex-1 bg-[#1E120A]">
      <OnboardingFlow />
    </View>
  );
}
