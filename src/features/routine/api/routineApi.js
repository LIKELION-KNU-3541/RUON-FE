import api from '../../../shared/api';
import { ROUTINE_TIME_LABELS, SKIN_FEELING_LABELS } from '../constants/routineLabels';

export async function getTodayRoutine(userId, { signal } = {}) {
  const numericUserId = Number(userId);
  if (!Number.isSafeInteger(numericUserId) || numericUserId <= 0) {
    throw new Error('올바른 사용자 ID가 필요해요.');
  }
  const response = await api.get('/api/v1/routines/today', {
    params: { userId: numericUserId },
    signal,
  });
  return response.data.data;
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

  const response = await api.post('/api/v1/routines/condition', {
    userId: numericUserId,
    skinFeelings,
    ...(skinFeelings.includes('CUSTOM') ? { customFeeling: customFeeling.trim() } : {}),
    routineTimeAvailable,
  });
  return response.data.data;
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
