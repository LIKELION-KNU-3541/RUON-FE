import React from 'react';
import { Image, StyleSheet } from 'react-native';

const backgroundSource = require('../../../assets/images/BackGroundBlur.png');

export default function BackgroundImage() {
  return (
    <Image
      pointerEvents="none"
      source={backgroundSource}
      resizeMode="stretch"
      style={StyleSheet.absoluteFillObject}
    />
  );
}
