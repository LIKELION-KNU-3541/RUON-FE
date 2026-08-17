import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const STEPS = [
  { id: 0, label: '제품명 확인' },
  { id: 1, label: '전성분 확인' },
  { id: 2, label: '현재 상태 반영' },
];

/**
 * 제품 분석 단계 표시 컴포넌트
 * @param {number} currentStep - 현재 단계 (0, 1, 2)
 */
export default function AnalyzingStepIndicator({ currentStep = 0 }) {
  return (
    <View style={styles.container}>
      {STEPS.map((step, index) => {
        const isDone = index < currentStep;
        const isActive = index === currentStep;
        const isPending = index > currentStep;

        return (
          <React.Fragment key={step.id}>
            <View style={styles.stepItem}>
              <View
                style={[
                  styles.circle,
                  isDone && styles.circleDone,
                  isActive && styles.circleActive,
                  isPending && styles.circlePending,
                ]}
              >
                {isDone ? (
                  <Text style={styles.checkmark}>✓</Text>
                ) : isActive ? (
                  <Text style={styles.activeDots}>•••</Text>
                ) : (
                  <View style={styles.pendingDot} />
                )}
              </View>
              <Text
                style={[
                  styles.label,
                  isDone && styles.labelDone,
                  isActive && styles.labelActive,
                  isPending && styles.labelPending,
                ]}
              >
                {step.label}
              </Text>
            </View>

            {/* 연결선 */}
            {index < STEPS.length - 1 && (
              <View
                style={[
                  styles.connector,
                  index < currentStep ? styles.connectorDone : styles.connectorPending,
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  stepItem: {
    alignItems: 'center',
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  circleDone: {
    backgroundColor: '#945C2D',
  },
  circleActive: {
    backgroundColor: '#945C2D',
  },
  circlePending: {
    backgroundColor: '#FFF9F1',
    borderWidth: 1.5,
    borderColor: '#E8D9CB',
  },
  checkmark: {
    color: '#FFF9F1',
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
  },
  activeDots: {
    color: '#FFF9F1',
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
  },
  pendingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E8D9CB',
  },
  label: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
    textAlign: 'center',
  },
  labelDone: {
    color: '#945C2D',
  },
  labelActive: {
    color: '#945C2D',
    fontFamily: 'Pretendard-SemiBold',
  },
  labelPending: {
    color: '#C4A98A',
  },
  connector: {
    flex: 1,
    height: 2,
    marginBottom: 20,
    marginHorizontal: 4,
  },
  connectorDone: {
    backgroundColor: '#945C2D',
  },
  connectorPending: {
    backgroundColor: '#E8D9CB',
  },
});
