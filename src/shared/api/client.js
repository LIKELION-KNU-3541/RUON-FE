import axios from 'axios';
import { API_BASE_URL, API_PREFIX } from './config';
import { getAccessToken } from './tokenStorage';

export class ApiError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

const client = axios.create({
  baseURL: `${API_BASE_URL}${API_PREFIX}`,
  timeout: 30000,
});

client.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => {
    const body = response.data;
    if (body && body.success === false) {
      throw new ApiError(body.error?.code, body.error?.message);
    }
    return body?.data;
  },
  (error) => {
    const body = error.response?.data;
    if (body?.error) {
      throw new ApiError(body.error.code, body.error.message);
    }
    throw new ApiError('NETWORK_ERROR', error.message);
  }
);

export default client;
