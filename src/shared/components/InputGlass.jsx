import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const BG = {
  n: require('../../../assets/images/glass_button/n_glass@x3.png'),
  large: require('../../../assets/images/glass_button/large_glass@x3.png'),
  table: require('../../../assets/images/glass_button/table_glass@x3.png'),
  vanity: require('../../../assets/images/glass_button/vanityPage_glass@x3.png'),
  vanity_s: require('../../../assets/images/glass_button/vanityPage_glass_s@x3.png'),
};

// 배경 PNG 실측 크기 (@3x 픽셀 ÷ 3, pt 단위). 화면마다 다르게 스케일해야 하면 style prop으로 덮어쓰기
const BG_SIZE = {
  n: { width: 270, height: 47 },
  large: { width: 312, height: 50 },
  table: { width: 312, height: 228 },
  vanity: { width: 61, height: 33 },
  vanity_s: { width: 40, height: 33 },
};

/**
 * 유리 이펙트 입력창/선택 박스 배경 (공용 컴포넌트)
 * 어떤 글래스 이미지를 쓸지는 자동 판단하지 않고 glass prop으로 명시적으로 지정
 * @param {'n'|'large'|'table'|'vanity'|'vanity_s'} glass
 * @param {object} [style] - 기본 크기(BG_SIZE)를 덮어쓰고 싶을 때
 * @param {React.ReactNode} children
 */
export default function InputGlass({ glass, style, children, ...rest }) {
  return (
    <ImageBackground
      source={BG[glass]}
      style={[styles.bg, BG_SIZE[glass], style]}
      resizeMode="stretch"
      {...rest}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    justifyContent: 'center',
  },
});
