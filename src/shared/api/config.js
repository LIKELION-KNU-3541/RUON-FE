// 백엔드 서버 주소 (개발 중에는 IP, 추후 https://ruon.site 도메인으로 교체 예정)
// 주소 변경 시 이 파일 하나만 고치면 됨
export const API_BASE_URL = 'http://1.201.117.152:8080';
export const API_PREFIX = '/api/v1';

// 설문 제출 API (가정): user 테이블에서 설문 데이터가 분리되면 로그인 후 별도로 호출
// 아직 백엔드에 실제로 존재하지 않는 임시 경로 — 확정되면 이 한 줄만 수정
export const SURVEY_ENDPOINT = `${API_BASE_URL}/survey`;
