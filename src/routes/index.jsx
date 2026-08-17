import React, { useState } from 'react';
import HomePage from '../features/main_home/pages/HomePage';
import ConditionPage from '../features/main_home/pages/ConditionPage';
import VanityRouter from '../features/vanity';

export default function AppRoutes() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'vanity'
  const [screen, setScreen] = useState('home');       // home 탭 내부 화면
  const [selectedConditions, setSelectedConditions] = useState(['민감해요', '열감이 있어요']);

  // 화장대 탭
  if (activeTab === 'vanity') {
    return <VanityRouter onTabChange={setActiveTab} />;
  }

  // 홈 탭 내부 흐름
  if (screen === 'condition') {
    return (
      <ConditionPage
        initialConditions={selectedConditions}
        onBack={() => setScreen('home')}
        onApply={(conditions) => {
          setSelectedConditions(conditions);
          setScreen('home');
        }}
      />
    );
  }

  return (
    <HomePage
      conditions={selectedConditions}
      onOpenCondition={() => setScreen('condition')}
      onTabChange={setActiveTab}
    />
  );
}
