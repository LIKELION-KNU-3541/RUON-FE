import client from '../../../shared/api/client';
import { ROUTINE_TIME_LABELS, SKIN_FEELING_LABELS } from '../constants/routineLabels';

//오늘의 루틴 반환
export async function getTodayRoutine(userId, { signal } = {}) {
  const numericUserId = Number(userId);
  if (!Number.isSafeInteger(numericUserId) || numericUserId <= 0) {
    throw new Error('올바른 사용자 ID가 필요해요.');
  }
  return client.get('/routines/today', {
    params: { userId: numericUserId },
    signal,
  });
}

export async function createRoutineByCondition({
  userId,
  skinFeelings,
  customFeeling,
  routineTimeAvailable,
}) {
  const numericUserId = Number(userId);
  if (!Number.isSafeInteger(numericUserId) || numericUserId <= 0) {
    throw new Error('올바른 사용자 ID가 필요해요.');
  }
  if (!Array.isArray(skinFeelings) || skinFeelings.length === 0 || !routineTimeAvailable) {
    throw new Error('피부 컨디션과 사용 가능한 시간을 선택해주세요.');
  }
  if (skinFeelings.includes('CUSTOM') && !customFeeling?.trim()) {
    throw new Error('피부 느낌을 직접 입력해주세요.');
  }

  //오늘의 컨디션
  return client.post('/routines/condition', {
    userId: numericUserId,
    skinFeelings,
    ...(skinFeelings.includes('CUSTOM') ? { customFeeling: customFeeling.trim() } : {}),
    routineTimeAvailable,
  });
}

//내일 루틴 추천
export async function getTomorrowRoutine({ signal } = {}) {
  return client.get('/routines/tomorrow', { signal });
}

//루틴 반응 기록
export async function submitRoutineReaction(routineId, score) {
  const numericRoutineId = Number(routineId);
  const numericScore = Number(score);

  if (!Number.isSafeInteger(numericRoutineId) || numericRoutineId <= 0) {
    throw new Error('반응을 기록할 루틴이 없어요.');
  }
  if (!Number.isInteger(numericScore) || numericScore < 1 || numericScore > 5) {
    throw new Error('반응 점수는 1점부터 5점까지 선택해주세요.');
  }

  try {
    return await client.post(`/routines/${numericRoutineId}/reaction`, {
      score: numericScore,
    });
  } catch (requestError) {
    const message = requestError.message
      ?? '반응을 기록하지 못했어요.';
    throw new Error(message);
  }
}

export function toTomorrowRoutineProduct(step) {
  return {
    id: step.stepId ?? `${step.productId}-${step.order}`,
    productId: step.productId,
    productName: step.productName,
    brandName: step.brandName,
    description: step.description,
    image: step.imageUrl ? { uri: step.imageUrl } : undefined,
    order: step.order,
    action: step.action,
  };
}

export function toSkinFeelingLabel(skinFeeling) {
  return SKIN_FEELING_LABELS[skinFeeling] ?? skinFeeling;
}

export function toRoutineTimeLabel(routineTime) {
  return ROUTINE_TIME_LABELS[routineTime] ?? routineTime;
}

export function toRoutineProduct(step) {
  return {
    id: step.stepId,
    productId: step.productId,
    productName: step.productName,
    brandName: step.brandName,
    description: step.description,
    image: step.imageUrl ? { uri: step.imageUrl } : undefined,
    timeOfDay: step.timeOfDay,
    stepOrder: step.stepOrder,
    action: step.action,
    status: step.status,
  };
}
