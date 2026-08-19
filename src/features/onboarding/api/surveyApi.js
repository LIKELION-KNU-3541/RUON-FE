import client from '../../../shared/api/client';
import { SURVEY_ENDPOINT } from '../../../shared/api/config';

// 설문 제출 (가정: user 테이블에서 분리된 별도 설문 테이블, 로그인 후 최초 1회 호출)
// TODO: 백엔드에 정식으로 생기면 SURVEY_ENDPOINT(shared/api/config.js) 경로만 교체하면 됨
export function submitSurvey(payload) {
  return client.post(SURVEY_ENDPOINT, payload);
}
