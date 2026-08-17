import React, { useState } from 'react';
import ConditionScreen from '../main_home/screens/ConditionScreen';
import RoutineScreen from './screens/RoutineScreen';
import RoutineStandardScreen from './screens/RoutineStandardScreen';
import TomorrowRoutineScreen from './screens/TomorrowRoutineScreen';

export default function RoutineRouter({
  conditions = [],
  availableTime = null,
  reactions = {},
  onReactionChange,
  onConditionChange,
  onTabChange,
}) {
  const [screen, setScreen] = useState('main');
  const [mode, setMode] = useState('morning');
  const [conditionReturnScreen, setConditionReturnScreen] = useState('main');

  const openCondition = (returnScreen) => {
    setConditionReturnScreen(returnScreen);
    setScreen('condition');
  };

  if (screen === 'condition') {
    return (
      <ConditionScreen
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
      selectedReaction={reactions[mode] ?? null}
      onReactionChange={(selectedIndex) => onReactionChange?.(mode, selectedIndex)}
      onModeChange={setMode}
      onTabChange={onTabChange}
      onOpenCondition={() => openCondition('main')}
      onOpenStandard={() => setScreen('standard')}
      onOpenTomorrowRoutine={() => setScreen('tomorrow')}
    />
  );
}
