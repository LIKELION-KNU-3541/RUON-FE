// 온보딩 설문 화면(한글 UI 값) -> 백엔드 API enum 매핑
// SurveyConditionScreen / SurveyDetailScreen의 옵션 라벨과 1:1로 맞춰져 있음

const CONCERN_MAP = {
  건조함: 'DRYNESS',
  민감함: 'SENSITIVITY',
  트러블: 'TROUBLE',
  가려움: 'ITCHING',
  색소침착: 'HYPERPIGMENTATION',
  붓기: 'PUFFINESS',
};

const SKIN_TYPE_MAP = {
  건성: 'DRY',
  중성: 'NORMAL',
  지성: 'OILY',
  복합성: 'COMBINATION',
};

// '임신 중' | '출산 후' | '수유 중' -> pregnancyStage + breastfeeding
function mapCondition(condition) {
  if (condition === '임신 중') return { pregnancyStage: 'PREGNANT', breastfeeding: false };
  if (condition === '수유 중') return { pregnancyStage: 'POSTPARTUM', breastfeeding: true };
  return { pregnancyStage: 'POSTPARTUM', breastfeeding: false }; // '출산 후'
}

// surveyData({ condition, weeks: '24주', concerns: ['건조함', ...], skinType: '건성' }) -> API payload
export function mapSurveyDataToApiPayload(surveyData) {
  const { pregnancyStage, breastfeeding } = mapCondition(surveyData.condition);
  const pregnancyWeekNum = parseInt(surveyData.weeks, 10) || undefined;

  return {
    pregnancyStage,
    pregnancyWeekNum,
    breastfeeding,
    skinConcerns: (surveyData.concerns || []).map((c) => CONCERN_MAP[c]).filter(Boolean),
    skinType: SKIN_TYPE_MAP[surveyData.skinType],
  };
}
