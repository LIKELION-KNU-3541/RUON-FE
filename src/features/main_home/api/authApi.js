import api from '../../../shared/api';

//본인 정보 불러오기
export async function getMyProfile({ signal } = {}) {
  const response = await api.get('/api/v1/auth/me', { signal });
  return response.data.data;
}
