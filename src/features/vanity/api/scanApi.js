import * as ImageManipulator from 'expo-image-manipulator';
import client from '../../../shared/api/client';

// OCR로 성분표 글자를 읽어야 하므로 화질 손실을 최소화하는 선에서만 압축
const JPEG_COMPRESS_QUALITY = 0.92;

// TEMP_TEST_1MB: 413 원인이 용량 때문인지 테스트하기 위한 임시 강제 축소.
// 원인 확인되면 이 블록(resize 액션, compress 값, 아래 size 로그) 전부 제거하고 원래 로직으로 되돌릴 것.
const TEMP_FORCE_SMALL = true;

// imageUri: 카메라/갤러리에서 받은 로컬 파일 uri (HEIC 등 임의 포맷 가능)
// 백엔드가 JPEG/PNG/WEBP + 매직넘버 일치를 요구하므로, 원본 포맷과 무관하게 항상 JPEG로 정규화해서 업로드
export async function createScan(imageUri) {
  const actions = TEMP_FORCE_SMALL ? [{ resize: { width: 1000 } }] : [];
  const compress = TEMP_FORCE_SMALL ? 0.5 : JPEG_COMPRESS_QUALITY;

  const { uri: jpegUri } = await ImageManipulator.manipulateAsync(imageUri, actions, {
    compress,
    format: ImageManipulator.SaveFormat.JPEG,
  });

  // TEMP_TEST_1MB: 실제 전송 용량 확인용 로그
  if (TEMP_FORCE_SMALL) {
    const res = await fetch(jpegUri);
    const blob = await res.blob();
    console.log(`[TEMP_TEST_1MB] jpeg size = ${(blob.size / 1024).toFixed(1)} KB`);
  }

  const formData = new FormData();
  formData.append('image', {
    uri: jpegUri,
    name: 'photo.jpg',
    type: 'image/jpeg',
  });

  // Content-Type을 수동 지정하지 않음 — boundary는 axios/RN이 FormData를 보고 자동으로 채워야 함
  return client.post('/scan', formData);
}

// status: 'UPLOADED' | 'OCR_PROCESSING' | 'STRUCTURING' | 'ANALYZING' | 'IMAGE_SEARCHING' | 'COMPLETED' | 'FAILED'
export function getScan(scanId) {
  return client.get(`/scan/${scanId}`);
}

export function getScanAnalysis(scanId) {
  return client.get(`/scan/${scanId}/analysis`);
}
