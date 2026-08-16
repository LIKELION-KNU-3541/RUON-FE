import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

export default function RoutineGlassBackground({ visible }) {
  if (!visible) return null;

  if (Platform.OS === 'ios') {
    return (
      <>
        <BlurView
          pointerEvents="none"
          intensity={16}
          tint="light"
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          pointerEvents="none"
          colors={[
            'rgba(255,249,241,0.13)',
            'rgba(255,250,245,0.04)',
            'rgba(255,250,245,0.02)',
            'rgba(255,249,241,0.08)',
          ]}
          locations={[0, 0.38, 0.68, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </>
    );
  }

  return (
    <LinearGradient
      pointerEvents="none"
      colors={[
        'rgba(255,249,241,0.13)',
        'rgba(255,250,245,0.04)',
        'rgba(255,250,245,0.02)',
        'rgba(255,249,241,0.08)',
      ]}
      locations={[0, 0.38, 0.68, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={StyleSheet.absoluteFill}
    />
  );
}
