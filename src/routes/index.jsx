import React, { useState } from 'react';
import HomePage from '../features/main_home/pages/HomePage';
import ConditionPage from '../features/main_home/pages/ConditionPage';
import RoutineRouter from '../features/routine';
import VanityRouter from '../features/vanity';

export default function AppRoutes() {
  const [activeTab, setActiveTab] = useState('home');
  const [homeScreen, setHomeScreen] = useState('home');
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [availableTime, setAvailableTime] = useState(null);

  if (activeTab === 'vanity') {
    return <VanityRouter onTabChange={setActiveTab} />;
  }

  if (activeTab === 'routine') {
    return (
      <RoutineRouter
        conditions={selectedConditions}
        availableTime={availableTime}
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
      <ConditionPage
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
    <HomePage
      conditions={selectedConditions}
      onOpenCondition={() => setHomeScreen('condition')}
      onTabChange={setActiveTab}
    />
  );
}
