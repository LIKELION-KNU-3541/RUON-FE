import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'ruon_access_token';
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
