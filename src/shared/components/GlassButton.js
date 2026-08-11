import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

// 필요 패키지 (Expo 프로젝트 기준):
//   npx expo install expo-blur expo-linear-gradient

export default function GlassButton({
    label,
    onPress,
    selected = false,
    width = null,
    height = 43,
    borderRadius = 16,
}) {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.shadowWrap, { borderRadius }]}
        >
            <BlurView intensity={20} tint="light" style={[styles.blur, { borderRadius }]}>
                {/* 채우기: Figma의 단일 흰색 10% 채우기 레이어 */}
                <View style={[
                    styles.fill,
                    width ? { width } : null,
                    { height },
                    selected && styles.fillSelected
                ]}>
                    {/* 빛 -45˚ 방향 하이라이트 (좌상단, Figma 유리 이펙트 근사) */}
                    <LinearGradient
                        pointerEvents="none"
                        colors={[
                            'rgba(255,249,241,0.35)',
                            'rgba(255,249,241,0.08)',
                            'rgba(255,249,241,0)',
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={StyleSheet.absoluteFillObject}
                    />
                    {/* 반대쪽 깊이감 (우하단, 살짝 어둡게) */}
                    <LinearGradient
                        pointerEvents="none"
                        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.18)']}
                        start={{ x: 0.4, y: 0.4 }}
                        end={{ x: 1, y: 1 }}
                        style={StyleSheet.absoluteFillObject}
                    />

                    <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
                </View>
            </BlurView>
        </Pressable>
    );
}

// 외곽선(border) 없음 — Figma 원본에 stroke 레이어가 없어 그대로 반영r
const styles = StyleSheet.create({
    shadowWrap: {
        alignSelf: 'flex-start',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.35,
                shadowRadius: 10,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    blur: {
        overflow: 'hidden',
    },
    fill: {
        paddingHorizontal: 16,
        paddingVertical: 13,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    label: {
        fontFamily: 'Pretendard',
        fontSize: 14,
        lineHeight: 17,
        color: '#FFF9F1',
    },
    fillSelected: {
        backgroundColor: '#FFFFFF',
    },
    labelSelected: {
        color: '#945C2D',
    },
});

// 사용 예시:
// <GlassButton label="가려움" onPress={() => {}} />
// <GlassButton label="긴 라벨용" width={120} height={50} onPress={() => {}} />