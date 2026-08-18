import React, { useEffect, useState } from 'react';
import ConditionScreen from '../main_home/screens/ConditionScreen';
import RoutineScreen from './screens/RoutineScreen';
import RoutineStandardScreen from './screens/RoutineStandardScreen';
import TomorrowRoutineScreen from './screens/TomorrowRoutineScreen';
import {
  getTodayRoutine,
  submitRoutineReaction,
  toRoutineTimeLabel,
  toSkinFeelingLabel,
} from './api/routineApi';

export default function RoutineRouter({
  conditions = [],
  availableTime = null,
  reactions = {},
  onReactionChange,
  onConditionChange,
  onTabChange,
  userId = process.env.EXPO_PUBLIC_USER_ID ?? 1,
}) {
  const [screen, setScreen] = useState('main');
  const [mode, setMode] = useState('morning');
  const [conditionReturnScreen, setConditionReturnScreen] = useState('main');
  const [todayRoutine, setTodayRoutine] = useState(null);
  const [reactionSubmitting, setReactionSubmitting] = useState(false);
  const [reactionError, setReactionError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    getTodayRoutine(userId, { signal: controller.signal })
      .then(setTodayRoutine)
      .catch((requestError) => {
        if (requestError.name !== 'CanceledError' && requestError.code !== 'ERR_CANCELED') {
          setTodayRoutine(null);
        }
      });

    return () => controller.abort();
  }, [userId]);

  const displayedConditions = todayRoutine?.skinFeelings?.map(toSkinFeelingLabel) ?? conditions;
  const displayedAvailableTime = todayRoutine?.routineTimeAvailable
    ? toRoutineTimeLabel(todayRoutine.routineTimeAvailable)
    : availableTime;

  const openCondition = (returnScreen) => {
    setConditionReturnScreen(returnScreen);
    setScreen('condition');
  };

  const handleReactionChange = async (selectedIndex) => {
    const score = selectedIndex + 1;

    setReactionSubmitting(true);
    setReactionError(null);
    try {
      const updatedRoutine = await submitRoutineReaction(todayRoutine?.routineId, score);
      setTodayRoutine(updatedRoutine);
      onReactionChange?.(mode, selectedIndex);
    } catch (requestError) {
      setReactionError(requestError.message);
    } finally {
      setReactionSubmitting(false);
    }
  };

  if (screen === 'condition') {
    return (
      <ConditionScreen
        initialConditions={displayedConditions}
        initialTime={displayedAvailableTime}
        initialCustomFeeling={todayRoutine?.customFeeling ?? ''}
        userId={userId}
        onBack={() => setScreen(conditionReturnScreen)}
        onApply={(nextConditions, nextTime, nextCustomFeeling, routine) => {
          setTodayRoutine(routine);
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
        conditions={displayedConditions}
        availableTime={displayedAvailableTime}
        userId={userId}
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
      conditions={displayedConditions}
      availableTime={displayedAvailableTime}
      selectedReaction={todayRoutine?.reactionScore
        ? todayRoutine.reactionScore - 1
        : reactions[mode] ?? null}
      onReactionChange={handleReactionChange}
      reactionSubmitting={reactionSubmitting}
      reactionError={reactionError}
      onModeChange={setMode}
      onTabChange={onTabChange}
      onOpenCondition={() => openCondition('main')}
      onOpenStandard={() => setScreen('standard')}
      onOpenTomorrowRoutine={() => setScreen('tomorrow')}
    />
  );
}
