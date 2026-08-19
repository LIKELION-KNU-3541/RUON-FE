import client from '../../../shared/api/client';

// pregnancyStage: 'PRE_PREGNANCY' | 'PREGNANT' | 'POSTPARTUM'
// skinConcerns: ('DRYNESS' | 'SENSITIVITY' | 'TROUBLE' | 'ITCHING' | 'HYPERPIGMENTATION' | 'PUFFINESS')[]
// skinType: 'DRY' | 'NORMAL' | 'OILY' | 'COMBINATION'
export function signUp({
  email,
  password,
  name,
  pregnancyStage,
  pregnancyWeekNum,
  breastfeeding,
  skinConcerns,
  skinType,
}) {
  return client.post('/auth/signup', {
    email,
    password,
    name,
    pregnancyStage,
    pregnancyWeekNum,
    breastfeeding,
    skinConcerns,
    skinType,
  });
}

export function login({ email, password }) {
  return client.post('/auth/login', { email, password });
}

export function getMyInfo() {
  return client.get('/users/me');
}
