import client from '../../../shared/api/client';

//본인 정보 불러오기
export async function getMyProfile({ signal } = {}) {
  return client.get('/users/me', { signal });
}
