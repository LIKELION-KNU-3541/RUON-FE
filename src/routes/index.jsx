import React, { useState } from 'react';
import HomePage from '../features/main_home/pages/HomePage';
import ConditionPage from '../features/main_home/pages/ConditionPage';
import RoutinePage from '../features/routine/screens/RoutineScreen';
import RoutineStandardScreen from '../features/routine/screens/RoutineStandardScreen';

export default function AppRoutes() {
  const [screen, setScreen] = useState('routine');
  const [routineMode, setRoutineMode] = useState('morning');
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [availableTime, setAvailableTime] = useState(null);
  const [conditionReturnScreen, setConditionReturnScreen] = useState('home');

  if (screen === 'condition') {
    return (
      <ConditionPage
        initialConditions={selectedConditions}
        initialTime={availableTime}
        onBack={() => setScreen(conditionReturnScreen)}
        onApply={(conditions, time) => {
          setSelectedConditions(conditions);
          setAvailableTime(time);
          setScreen(conditionReturnScreen);
        }}
      />
    );
  }

  if (screen === 'routine') {
    return (
      <RoutinePage
        mode={routineMode}
        conditions={selectedConditions}
        availableTime={availableTime}
        onModeChange={setRoutineMode}
        onOpenHome={(index) => index === 0 && setScreen('home')}
        onOpenStandard={() => setScreen('routine-standard')}
      />
    );
  }

  if (screen === 'routine-standard') {
    return (
      <RoutineStandardScreen
        mode={routineMode}
        conditions={selectedConditions}
        availableTime={availableTime}
        onBack={() => setScreen('routine')}
        onOpenCondition={() => {
          setConditionReturnScreen('routine-standard');
          setScreen('condition');
        }}
      />
    );
  }

  return (
    <HomePage
      conditions={selectedConditions}
      onOpenCondition={() => {
        setConditionReturnScreen('home');
        setScreen('condition');
      }}
      onOpenRoutine={(index) => index === 1 && setScreen('routine')}
    />
  );
}
