import React, { useEffect, useState } from 'react';
import ConditionScreen from '../main_home/screens/ConditionScreen';
import RoutineScreen from './screens/RoutineScreen';
import RoutineStandardScreen from './screens/RoutineStandardScreen';
import TomorrowRoutineScreen from './screens/TomorrowRoutineScreen';
import {
  getTodayRoutine,
  getTomorrowRoutine,
  submitRoutineReaction,
  toRoutineTimeLabel,
  toSkinFeelingLabel,
} from './api/routineApi';

export default function RoutineRouter({
  initialScreen = 'main',
  initialMode = 'morning',
  onInitialStateConsumed,
  conditions = [],
  availableTime = null,
  reactions = {},
  onReactionChange,
  onConditionChange,
  onTabChange,
  onOpenProductDetail,
  userId = process.env.EXPO_PUBLIC_USER_ID ?? 1,
}) {
  const [screen, setScreen] = useState(initialScreen);
  const [mode, setMode] = useState(initialMode);
  const [conditionReturnScreen, setConditionReturnScreen] = useState('main');
  const [todayRoutine, setTodayRoutine] = useState(null);
  const [tomorrowRoutine, setTomorrowRoutine] = useState(null);
  const [reactionSubmitting, setReactionSubmitting] = useState(false);
  const [reactionError, setReactionError] = useState(null);

  useEffect(() => {
    onInitialStateConsumed?.();
  }, []);

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

  useEffect(() => {
    const controller = new AbortController();

    getTomorrowRoutine({ signal: controller.signal })
      .then(setTomorrowRoutine)
      .catch((requestError) => {
        if (requestError.name !== 'CanceledError' && requestError.code !== 'ERR_CANCELED') {
          setTomorrowRoutine(null);
        }
      });

    return () => controller.abort();
  }, []);

  const displayedConditions = todayRoutine?.skinFeelings?.map(toSkinFeelingLabel) ?? conditions;
  const displayedAvailableTime = todayRoutine?.routineTimeAvailable
    ? toRoutineTimeLabel(todayRoutine.routineTimeAvailable)
    : availableTime;

  const openCondition = (returnScreen) => {
    setConditionReturnScreen(returnScreen);
    setScreen('condition');
  };

  const handleReactionChange = async (selectedIndex) => {
    setReactionSubmitting(true);
    setReactionError(null);

    try {
      const updatedRoutine = await submitRoutineReaction(
        todayRoutine?.routineId,
        selectedIndex + 1,
      );
      setTodayRoutine(updatedRoutine);
      onReactionChange?.(mode, selectedIndex);

      try {
        const updatedTomorrowRoutine = await getTomorrowRoutine();
        setTomorrowRoutine(updatedTomorrowRoutine);
      } catch {
        setTomorrowRoutine(null);
      }
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
        onOpenProductDetail={(product) => onOpenProductDetail?.(product, { screen: 'standard', mode })}
      />
    );
  }

  if (screen === 'tomorrow') {
    return (
      <TomorrowRoutineScreen
        mode={mode}
        initialRoutine={tomorrowRoutine}
        onRoutineLoad={setTomorrowRoutine}
        onBack={() => setScreen('main')}
        onOpenProductDetail={(product) => onOpenProductDetail?.(product, { screen: 'tomorrow', mode })}
      />
    );
  }

  return (
    <RoutineScreen
      mode={mode}
      conditions={displayedConditions}
      availableTime={displayedAvailableTime}
      selectedReaction={todayRoutine?.reactionScore != null
        ? todayRoutine.reactionScore - 1
        : (reactions[mode] ?? null)}
      todayRoutine={todayRoutine}
      tomorrowRoutine={tomorrowRoutine}
      reactionSubmitting={reactionSubmitting}
      reactionError={reactionError}
      onReactionChange={handleReactionChange}
      onModeChange={setMode}
      onTabChange={onTabChange}
      onOpenCondition={() => openCondition('main')}
      onOpenStandard={() => setScreen('standard')}
      onOpenTomorrowRoutine={() => setScreen('tomorrow')}
    />
  );
}
