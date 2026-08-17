import React, { useState } from 'react';
import HomeScreen from '../features/main_home/screens/HomeScreen';
import ConditionScreen from '../features/main_home/screens/ConditionScreen';
import RoutineRouter from '../features/routine';
import VanityRouter from '../features/vanity';

export default function AppRoutes({ surveyData }) {
  const [activeTab, setActiveTab] = useState('home');
  const [homeScreen, setHomeScreen] = useState('home');
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [availableTime, setAvailableTime] = useState(null);
  const [routineReactions, setRoutineReactions] = useState({
    morning: null,
    evening: null,
  });

  if (activeTab === 'vanity') {
    return <VanityRouter onTabChange={setActiveTab} />;
  }

  if (activeTab === 'routine') {
    return (
      <RoutineRouter
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
      />
    );
  }

  if (homeScreen === 'condition') {
    return (
      <ConditionScreen
        initialConditions={selectedConditions}
        initialTime={availableTime}
        onBack={() => setHomeScreen('home')}
        onApply={(conditions, time) => {
          setSelectedConditions(conditions);
          setAvailableTime(time);
          setHomeScreen('home');
        }}
      />
    );
  }

  return (
    <HomeScreen
      conditions={selectedConditions}
      surveyData={surveyData}
      onOpenCondition={() => setHomeScreen('condition')}
      onTabChange={setActiveTab}
    />
  );
}
