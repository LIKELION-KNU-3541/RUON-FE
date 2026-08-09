import React from 'react';
import { useFonts } from 'expo-font';
import Main from './main';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
    'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.otf'),
  });

  if (!fontsLoaded) return null;

  return <Main />;
}
