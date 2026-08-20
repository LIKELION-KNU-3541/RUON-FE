import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'ruon_access_token';
const SURVEY_COMPLETED_KEY = 'ruon_survey_completed';
const SAVED_LOGIN_EMAIL_KEY = 'ruon_saved_login_email';
const REMEMBERED_ID_KEY = 'ruon_remembered_id';

export async function saveAccessToken(token) {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
}

export async function getAccessToken() {
  return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

export async function clearAccessToken() {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
}

export async function saveLoginEmail(email) {
  await SecureStore.setItemAsync(SAVED_LOGIN_EMAIL_KEY, email);
}

export async function getSavedLoginEmail() {
  return SecureStore.getItemAsync(SAVED_LOGIN_EMAIL_KEY);
}

export async function clearSavedLoginEmail() {
  await SecureStore.deleteItemAsync(SAVED_LOGIN_EMAIL_KEY);
}

// 설문조사를 최초 1회만 받기 위한 로컬 완료 플래그
// TODO: 백엔드에 설문 완료 여부를 조회할 방법이 생기면(GET /users/me 등) 그쪽 값을 기준으로 교체
export async function saveSurveyCompleted() {
  await SecureStore.setItemAsync(SURVEY_COMPLETED_KEY, '1');
}

export async function isSurveyCompleted() {
  return (await SecureStore.getItemAsync(SURVEY_COMPLETED_KEY)) === '1';
}

// 로그인 화면 "아이디 저장" 체크박스용
export async function saveRememberedId(id) {
  await SecureStore.setItemAsync(REMEMBERED_ID_KEY, id);
}

export async function getRememberedId() {
  return SecureStore.getItemAsync(REMEMBERED_ID_KEY);
}

export async function clearRememberedId() {
  await SecureStore.deleteItemAsync(REMEMBERED_ID_KEY);
}
