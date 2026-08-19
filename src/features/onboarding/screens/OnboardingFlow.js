import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import LoginScreen from './LoginScreen';
import WelcomeScreen from './WelcomeScreen';
import SurveyConditionScreen from './SurveyConditionScreen';
import SurveyDetailScreen from './SurveyDetailScreen';
import SurveySummaryScreen from './SurveySummaryScreen';
import { submitSurvey } from '../api/surveyApi';
import { mapSurveyDataToApiPayload } from '../api/surveyMapping';
import { saveSurveyCompleted } from '../../../shared/api/tokenStorage';

const SHOW_DEMO_NAV = false;

/**
 * @param {function} onComplete - 설문 완료 콜백
 * @param {number} startStep - 시작 단계. 2: 로그인부터(최초), 3: Welcome부터(이미 로그인된 상태에서 설문만 필요할 때)
 */
export default function OnboardingFlow({ onComplete, startStep = 2 }) {
  // 1: 스플래시(main.jsx에서 전역으로 처리), 2: 로그인 ~ 6: 설문 요약
  const [currentStep, setCurrentStep] = useState(startStep);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSurveyComplete = async () => {
    setIsSubmitting(true);
    try {
      await submitSurvey(mapSurveyDataToApiPayload(surveyData));
      await saveSurveyCompleted();
    } catch (e) {
      Alert.alert('알림', '설문 저장에 실패했어요. 다음에 다시 시도할 수 있어요.');
    } finally {
      setIsSubmitting(false);
    }
    onComplete?.(surveyData);
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
            onComplete={handleSurveyComplete}
            isSubmitting={isSubmitting}
            surveyData={surveyData}
          />
        )}
      </View>
    </View>
  );
}
