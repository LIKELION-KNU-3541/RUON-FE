import axios from 'axios';

const baseURL = (process.env.EXPO_PUBLIC_API_URL ?? '').replace(/\/$/, '');
const accessToken = process.env.EXPO_PUBLIC_ACCESS_TOKEN;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    ...(accessToken && {
      Authorization: `Bearer ${accessToken}`,
    }),
  },
});

api.interceptors.response.use(
  (response) => {
    if (response.data?.success === false) {
      const apiError = new Error(
        response.data?.error?.message
          ?? response.data?.message
          ?? '요청을 처리하지 못했어요.',
      );
      apiError.code = response.data?.error?.code ?? 'API_ERROR';
      apiError.status = response.status;
      apiError.data = response.data;
      return Promise.reject(apiError);
    }

    return response;
  },
  (error) => {
    if (axios.isCancel(error)) return Promise.reject(error);

    const status = error.response?.status;
    const responseData = error.response?.data;
    const serverMessage = responseData?.error?.message
      ?? responseData?.message
      ?? (typeof responseData === 'string' ? responseData : null);
    const fallbackMessage = error.request
      ? '서버에 연결할 수 없어요. API 주소와 서버 실행 상태를 확인해주세요.'
      : '요청을 보내는 중 오류가 발생했어요.';
    const apiError = new Error(
      `${status ? `[${status}] ` : ''}${serverMessage ?? error.message ?? fallbackMessage}`,
    );

    apiError.code = responseData?.error?.code
      ?? (status ? `HTTP_${status}` : error.code ?? 'NETWORK_ERROR');
    apiError.status = status;
    apiError.data = responseData;

    if (__DEV__) {
      console.error('[API Error]', {
        method: error.config?.method?.toUpperCase(),
        url: `${error.config?.baseURL ?? ''}${error.config?.url ?? ''}`,
        status,
        code: apiError.code,
        message: apiError.message,
        response: responseData,
      });
    }

    return Promise.reject(apiError);
  },
);

export default api;
