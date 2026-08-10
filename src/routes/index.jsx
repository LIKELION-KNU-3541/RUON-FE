import React, { useState } from 'react';
import HomePage from '../features/main_home/pages/HomePage';
import ConditionPage from '../features/main_home/pages/ConditionPage';

export default function AppRoutes() {
  const [screen, setScreen] = useState('home');
  const [selectedConditions, setSelectedConditions] = useState(['민감해요', '열감이 있어요']);

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

  return <HomePage conditions={selectedConditions} onOpenCondition={() => setScreen('condition')} />;
}
