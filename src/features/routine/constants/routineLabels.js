export const SKIN_FEELING_LABELS = {
  DRY: '건조해요',
  SENSITIVE: '민감해요',
  ITCHY: '가려워요',
  TROUBLED: '트러블이 있어요',
  TIGHT: '당겨요',
  RED: '붉어졌어요',
  HOT: '열감이 있어요',
  FLAKY: '각질이 올라와요',
  NORMAL: '평소와 같아요',
  CUSTOM: '직접 작성',
};

export const SKIN_FEELING_VALUES = Object.fromEntries(
  Object.entries(SKIN_FEELING_LABELS).map(([value, label]) => [label, value]),
);

export const ROUTINE_TIME_LABELS = {
  LOW: '30초 퀵루틴',
  MEDIUM: '기본 루틴',
  HIGH: '여유 루틴',
};

export const ROUTINE_TIME_VALUES = Object.fromEntries(
  Object.entries(ROUTINE_TIME_LABELS).map(([value, label]) => [label, value]),
);

export const ROUTINE_CATEGORY_LABELS = {
  CLEANSE: '순한 세안',
  TONER: '수분 정돈',
  ESSENCE: '집중 케어',
  SERUM: '집중 케어',
  MOISTURIZER: '장벽 보습',
  SUNSCREEN: '자외선 차단',
};
