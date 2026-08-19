import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'ruon_access_token';
const SURVEY_COMPLETED_KEY = 'ruon_survey_completed';

export async function saveAccessToken(token) {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
}

export async function getAccessToken() {
  return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

export async function clearAccessToken() {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
}

// 설문조사를 최초 1회만 받기 위한 로컬 완료 플래그
// TODO: 백엔드에 설문 완료 여부를 조회할 방법이 생기면(GET /users/me 등) 그쪽 값을 기준으로 교체
export async function saveSurveyCompleted() {
  await SecureStore.setItemAsync(SURVEY_COMPLETED_KEY, '1');
}

export async function isSurveyCompleted() {
  return (await SecureStore.getItemAsync(SURVEY_COMPLETED_KEY)) === '1';
}
