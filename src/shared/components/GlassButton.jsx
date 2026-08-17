import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';

const BG = {
  2: require('../../../assets/images/glass_button/size2_glass@x3.png'),
  3: require('../../../assets/images/glass_button/size3_glass@x3.png'),
  4: require('../../../assets/images/glass_button/size4_glass@x3.png'),
};

// 배경 PNG 실측 크기 (@3x 픽셀 ÷ 3, pt 단위) — 높이는 세 사이즈 모두 43으로 동일
const BG_SIZE = {
  2: { width: 57, height: 43 },
  3: { width: 69, height: 43 },
  4: { width: 81, height: 43 },
};

const HANGUL_SYLLABLE = /[가-힣]/;

// 라벨의 한글 음절 수를 세어 size2/3/4 중 하나로 매핑
// size5+ 배경은 아직 없어서 4음절 이상은 전부 size4로 고정 (긴 라벨 대응은 추후 처리)
function resolveSize(label) {
  const count = [...label].filter((ch) => HANGUL_SYLLABLE.test(ch)).length;
  if (count <= 2) return 2;
  if (count === 3) return 3;
  return 4;
}

/**
 * 유리 이펙트 태그 버튼 (ConditionButton과 동일한 용도의 공용 컴포넌트)
 * @param {string} label - 버튼 텍스트
 * @param {boolean} selected - 선택 상태 (선택 시 유리 이펙트 없이 ConditionButton과 동일한 단순 스타일)
 * @param {function} onPress
 * @param {2|3|4} [size] - 배경 사이즈 수동 지정. 생략 시 라벨 음절 수로 자동 결정
 */
export default function GlassButton({ label, selected = false, onPress, size }) {
  const resolvedSize = BG_SIZE[size] ? size : resolveSize(label);
  const bgSize = BG_SIZE[resolvedSize];

  if (selected) {
    return (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={{ selected }}
        activeOpacity={0.75}
        onPress={onPress}
        style={[styles.selected, bgSize]}
      >
        <Text style={styles.selectedLabel}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ selected }}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <ImageBackground source={BG[resolvedSize]} style={[styles.bg, bgSize]} resizeMode="stretch">
        <Text style={styles.label}>{label}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bg: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    color: '#FFF9F1',
  },
  selected: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFF9F1',
    backgroundColor: '#FFF9F1',
  },
  selectedLabel: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    color: '#915626',
  },
});
