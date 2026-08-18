import axios from 'axios';

const baseURL = (process.env.EXPO_PUBLIC_API_URL ?? '').replace(/\/$/, '');

const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});



// api.interceptors.response.use(
//   (response) => {
//     if (response.data?.success === false) {
//       const apiError = new Error(response.data.error?.message ?? '요청을 처리하지 못했어요.');
//       apiError.code = response.data.error?.code ?? 'API_ERROR';
//       return Promise.reject(apiError);
//     }
//     return response;
//   },
//   (error) => {
//     if (axios.isCancel(error)) return Promise.reject(error);

//     const apiError = new Error(
//       error.response?.data?.error?.message
//         ?? error.response?.data?.message
//         ?? '서버와 통신하지 못했어요.',
//     );
//     apiError.code = error.response?.data?.error?.code
//       ?? (error.response?.status ? `HTTP_${error.response.status}` : error.code);
//     return Promise.reject(apiError);
//   },
// );

export default api;
