import React from 'react';
import { ActivityIndicator,ImageBackground, ScrollView, StatusBar, Text, TouchableOpacity, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '../../../shared/components/PageHeader';
import { useResponsiveScale } from '../../../shared/utils/responsive';
import RoutineNotice from '../components/RoutineNotice';
import RoutineProduct from '../components/RoutineProduct';
import { ROUTINE_THEMES } from '../constants/routineThemes';
import { getTomorrowRoutine, toTomorrowRoutineProduct } from '../api/routineApi';
import VanityIcon from '../../../../assets/icons/vanity-icon.svg';

const eveningBackgroundSource = require('../../../../assets/images/TodayCheckIn-bg.png');

export default function TomorrowRoutineScreen({ mode = 'morning', onBack, onOpenProductDetail, products, initialRoutine, onRoutineLoad }) {
  const { moderateScale } = useResponsiveScale();
  const theme = ROUTINE_THEMES[mode];
  const [tomorrowRoutine, setTomorrowRoutine] = React.useState(initialRoutine ?? null);
  const [loading, setLoading] = React.useState(!products && !initialRoutine);
  const [error, setError] = React.useState(null);

  //실제 api 호출 부분
  const loadTomorrowRoutine = React.useCallback(async (signal) => {
    if (products || initialRoutine) return;

    setLoading(true);
    setError(null);
    try {
      const routine = await getTomorrowRoutine({ signal });
      setTomorrowRoutine(routine);
      onRoutineLoad?.(routine);
    } catch (requestError) {
      if (requestError.name !== 'CanceledError' && requestError.code !== 'ERR_CANCELED') {
        setError(requestError.message);
      }
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [initialRoutine, onRoutineLoad, products]);

  React.useEffect(() => {
    const controller = new AbortController();
    loadTomorrowRoutine(controller.signal); //화면생성
    return () => controller.abort(); //화면삭제시요청취소
  }, [loadTomorrowRoutine]);

  const routineProducts = React.useMemo(() => {
    if (products) return products;
    if (!tomorrowRoutine?.steps) return [];

    return [...tomorrowRoutine.steps] //루틴 제품 정렬(복사본)
      .sort((a, b) => a.order - b.order)
      .map(toTomorrowRoutineProduct);
  }, [products, tomorrowRoutine]);

  const content = (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: mode === 'evening' ? 'transparent' : theme.screenBackground }}
    >
      <StatusBar
        barStyle={mode === 'evening' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.screenBackground}
      />
      <PageHeader title="내일 루틴 추천" onBack={onBack} color={theme.text} />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 42 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center pb-[30px] pt-[10px]">
          <VanityIcon fill={theme.text} width={24} height={24} />
          <Text
            className="mt-[8px] text-center font-pretendard-semibold"
            style={{ color: theme.text, fontSize: moderateScale(22), lineHeight: moderateScale(32) }}
          >
            {tomorrowRoutine?.recommendedAction ?? '내일 루틴을 준비하고 있어요'}
          </Text>
          <Text
            className="mt-[15px] text-center font-pretendard-medium"
            style={{ color: theme.subtext, fontSize: moderateScale(14), lineHeight: moderateScale(20) }}
          >
            {tomorrowRoutine?.explanation
              ?? (loading ? '오늘의 반응을 바탕으로 추천을 생성하고 있어요.' : '')}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator color={theme.text} size="large" />
        ) : error ? ( //에러 있을 때 에러메시지와 다시시도 버튼
          <View className="items-center px-[20px] py-[30px]">
            <Text
              className="text-center font-pretendard-medium"
              style={{ color: '#D14343', fontSize: moderateScale(13) }}
            >
              {error}
            </Text>
            <TouchableOpacity
              className="mt-[16px] rounded-[12px] px-[20px] py-[10px]"
              style={{ backgroundColor: theme.text }}
              onPress={() => loadTomorrowRoutine()}
            >
              <Text style={{ color: theme.card }}>다시 시도</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ gap: 20 }}>
            {routineProducts.map((product, index) => (
              <RoutineProduct
                key={product.id ?? `${product.productName}-${index}`}
                product={product}
                index={index}
                theme={theme}
                onPress={onOpenProductDetail}
              />
            ))}
          </View>
        )}

        {!loading && !error && (
          <View className="mt-[20px]">
            <RoutineNotice
              theme={theme}
              content={"미리 구성한 루틴으로,\n내일 피부 상태와 가능한 시간에 맞게 다시 조정할 수 있어요."}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );

  if (mode === 'evening') {
    return (
      <ImageBackground source={eveningBackgroundSource} resizeMode="cover" style={{ flex: 1 }}>
        {content}
      </ImageBackground>
    );
  }

  return content;
}
