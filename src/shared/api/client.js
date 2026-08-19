import axios from 'axios';
import { API_BASE_URL, API_PREFIX } from './config';
import { getAccessToken } from './tokenStorage';

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

client.interceptors.response.use(unwrapResponse, normalizeError);
publicClient.interceptors.response.use(unwrapResponse, normalizeError);

export default client;
