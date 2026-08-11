import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import WelcomeScreen from './WelcomeScreen';
import SurveyConditionScreen from './SurveyConditionScreen';
import SurveyDetailScreen from './SurveyDetailScreen';
import SurveySummaryScreen from './SurveySummaryScreen';

const SHOW_DEMO_NAV = false;

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [surveyData, setSurveyData] = useState({
    condition: '임신 중',
    weeks: '',
    concerns: ['건조함', '민감함', '가려움'],
    skinType: '건성',
  });

  const updateSurveyData = (newData) => {
    setSurveyData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <View className="flex-1 bg-[#1E120A]">
      {SHOW_DEMO_NAV && (
        <View className="bg-[#2B1D12] pt-10 pb-2 px-4 flex-row justify-between items-center border-b border-white/10 z-50">
          <TouchableOpacity
            onPress={prevStep}
            disabled={currentStep === 1}
            className={"px-3 py-1.5 rounded-lg border " + (currentStep === 1 ? 'border-white/10 opacity-30' : 'border-white/30 bg-white/10')}
          >
            <Text className="text-white text-xs font-bold">‹ 이전</Text>
          </TouchableOpacity>

          <View className="flex-row space-x-1 items-center">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <TouchableOpacity
                key={num}
                onPress={() => setCurrentStep(num)}
                className={"w-6 h-6 rounded-full items-center justify-center mx-0.5 " + (currentStep === num ? 'bg-white' : 'bg-white/15')}
              >
                <Text
                  className={"text-xs font-bold " + (currentStep === num ? 'text-[#4A311F]' : 'text-white/70')}
                >
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            onPress={nextStep}
            disabled={currentStep === 6}
            className={"px-3 py-1.5 rounded-lg border " + (currentStep === 6 ? 'border-white/10 opacity-30' : 'border-white/30 bg-white/10')}
          >
            <Text className="text-white text-xs font-bold">다음 ›</Text>
          </TouchableOpacity>
        </View>
      )}

      <View className="flex-1">
        {currentStep === 1 && <SplashScreen onNext={nextStep} />}
        {currentStep === 2 && <LoginScreen onNext={nextStep} />}
        {currentStep === 3 && <WelcomeScreen onNext={nextStep} />}
        {currentStep === 4 && (
          <SurveyConditionScreen
            onNext={nextStep}
            surveyData={surveyData}
            updateSurveyData={updateSurveyData}
          />
        )}
        {currentStep === 5 && (
          <SurveyDetailScreen
            onNext={nextStep}
            surveyData={surveyData}
            updateSurveyData={updateSurveyData}
          />
        )}
        {currentStep === 6 && (
          <SurveySummaryScreen
            onPrev={() => setCurrentStep(4)}
            surveyData={surveyData}
          />
        )}
      </View>
    </View>
  );
}
