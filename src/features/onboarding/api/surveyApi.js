import client from '../../../shared/api/client';

// 설문 제출: 로그인 후 최초 1회, PATCH /api/v1/users/me로 설문 관련 필드만 갱신
// (User 테이블이 별도 설문 테이블로 분리된 건 아니지만, 로그인 이후 시점에 별도로 보낼 수 있는 실제 엔드포인트)
export function submitSurvey(payload) {
  return client.patch('/users/me', payload);
}
