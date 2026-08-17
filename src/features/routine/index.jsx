import React, { useState } from 'react';
import ConditionPage from '../main_home/pages/ConditionPage';
import RoutineScreen from './screens/RoutineScreen';
import RoutineStandardScreen from './screens/RoutineStandardScreen';
import TomorrowRoutineScreen from './screens/TomorrowRoutineScreen';

export default function RoutineRouter({ conditions = [], availableTime = null, onConditionChange, onTabChange }) {
  const [screen, setScreen] = useState('main');
  const [mode, setMode] = useState('morning');
  const [conditionReturnScreen, setConditionReturnScreen] = useState('main');

  const openCondition = (returnScreen) => {
    setConditionReturnScreen(returnScreen);
    setScreen('condition');
  };

  if (screen === 'condition') {
    return (
      <ConditionPage
        initialConditions={conditions}
        initialTime={availableTime}
        onBack={() => setScreen(conditionReturnScreen)}
        onApply={(nextConditions, nextTime) => {
          onConditionChange?.(nextConditions, nextTime);
          setScreen(conditionReturnScreen);
        }}
      />
    );
  }

  if (screen === 'standard') {
    return (
      <RoutineStandardScreen
        mode={mode}
        conditions={conditions}
        availableTime={availableTime}
        onBack={() => setScreen('main')}
        onOpenCondition={() => openCondition('standard')}
      />
    );
  }

  if (screen === 'tomorrow') {
    return <TomorrowRoutineScreen mode={mode} onBack={() => setScreen('main')} />;
  }

  return (
    <RoutineScreen
      mode={mode}
      conditions={conditions}
      availableTime={availableTime}
      onModeChange={setMode}
      onTabChange={onTabChange}
      onOpenCondition={() => openCondition('main')}
      onOpenStandard={() => setScreen('standard')}
      onOpenTomorrowRoutine={() => setScreen('tomorrow')}
    />
  );
}
