import React, { useEffect, useState } from 'react';
import HomeScreen from '../features/main_home/screens/HomeScreen';
import ConditionScreen from '../features/main_home/screens/ConditionScreen';
import RoutineRouter from '../features/routine';
import VanityRouter from '../features/vanity';
import { getMyProfile } from '../features/main_home/api/authApi';

export default function AppRoutes({ surveyData }) {
  const [activeTab, setActiveTab] = useState('home');
  const [homeScreen, setHomeScreen] = useState('home');
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [availableTime, setAvailableTime] = useState(null);
  const [customFeeling, setCustomFeeling] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [vanityEntryProduct, setVanityEntryProduct] = useState(null);
  const [routineReturnState, setRoutineReturnState] = useState(null);
  const [routineReactions, setRoutineReactions] = useState({
    morning: null,
    evening: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    getMyProfile({ signal: controller.signal })
      .then(setUserProfile)
      .catch((requestError) => {
        if (requestError.name !== 'CanceledError' && requestError.code !== 'ERR_CANCELED') {
          setUserProfile(null);
        }
      });

    return () => controller.abort();
  }, []);

  if (activeTab === 'vanity') {
    return (
      <VanityRouter
        initialProduct={vanityEntryProduct}
        onExternalDetailBack={() => {
          setVanityEntryProduct(null);
          setActiveTab('routine');
        }}
        onTabChange={(tab) => {
          setVanityEntryProduct(null);
          setActiveTab(tab);
        }}
      />
    );
  }

  if (activeTab === 'routine') {
    return (
      <RoutineRouter
        initialScreen={routineReturnState?.screen ?? 'main'}
        initialMode={routineReturnState?.mode ?? 'morning'}
        onInitialStateConsumed={() => setRoutineReturnState(null)}
        conditions={selectedConditions}
        availableTime={availableTime}
        reactions={routineReactions}
        onReactionChange={(mode, selectedIndex) => {
          setRoutineReactions((current) => ({
            ...current,
            [mode]: selectedIndex,
          }));
        }}
        onConditionChange={(conditions, time) => {
          setSelectedConditions(conditions);
          setAvailableTime(time);
        }}
        onTabChange={setActiveTab}
        onOpenProductDetail={(product, returnState) => {
          if (!product?.productId) return;
          setRoutineReturnState(returnState ?? { screen: 'main', mode: 'morning' });
          setVanityEntryProduct({ productId: product.productId });
          setActiveTab('vanity');
        }}
      />
    );
  }

  if (homeScreen === 'condition') {
    return (
      <ConditionScreen
        initialConditions={selectedConditions}
        initialTime={availableTime}
        initialCustomFeeling={customFeeling}
        onBack={() => setHomeScreen('home')}
        onApply={(conditions, time, nextCustomFeeling) => {
          setSelectedConditions(conditions);
          setAvailableTime(time);
          setCustomFeeling(nextCustomFeeling);
          setHomeScreen('home');
        }}
      />
    );
  }

  return (
    <HomeScreen
      conditions={selectedConditions}
      surveyData={surveyData}
      userProfile={userProfile}
      onOpenCondition={() => setHomeScreen('condition')}
      onConditionLoad={(conditions, time, nextCustomFeeling) => {
        setSelectedConditions(conditions);
        setAvailableTime(time);
        setCustomFeeling(nextCustomFeeling);
      }}
      onTabChange={setActiveTab}
      onOpenRoutine={(mode) => {
        setRoutineReturnState({ screen: 'main', mode });
        setActiveTab('routine');
      }}
    />
  );
}
