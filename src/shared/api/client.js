import axios from 'axios';
import { API_BASE_URL, API_PREFIX } from './config';
import { getAccessToken, clearAccessToken } from './tokenStorage';

const baseURL = `${API_BASE_URL.replace(/\/$/, '')}${API_PREFIX}`;

export class ApiError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

export const client = axios.create({
  baseURL,
  timeout: 30000,
});
export const publicClient = axios.create({
  baseURL,
  timeout: 30000,
});

client.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const unwrapResponse = (response) => {
  const body = response.data;
  if (body && body.success === false) {
    throw new ApiError(body.error?.code, body.error?.message);
  }
  return body?.data;
};

const normalizeError = (error) => {
  const body = error.response?.data;
  if (body?.error) {
    throw new ApiError(body.error.code, body.error.message);
  }
  throw new ApiError('NETWORK_ERROR', error.message);
};

// 401(토큰 만료/무효) 발생 시 앱에 알릴 콜백. main.jsx가 시작 시 등록해서 로그인 화면으로 되돌림.
let unauthorizedHandler = null;
export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler;
}

// 인증이 필요한 client에서만: 401이면 토큰을 지우고 핸들러 호출 (로그인/회원가입용 publicClient는 대상 아님)
const normalizeAuthedError = async (error) => {
  if (error.response?.status === 401) {
    await clearAccessToken();
    unauthorizedHandler?.();
  }
  return normalizeError(error);
};

client.interceptors.response.use(unwrapResponse, normalizeAuthedError);
publicClient.interceptors.response.use(unwrapResponse, normalizeError);

export default client;
