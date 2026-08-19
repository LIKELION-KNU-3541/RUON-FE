import * as ImageManipulator from 'expo-image-manipulator';
import client from '../../../shared/api/client';

// OCR로 성분표 글자를 읽어야 하므로 화질 손실을 최소화하는 선에서만 압축
const JPEG_COMPRESS_QUALITY = 0.92;

// imageUri: 카메라/갤러리에서 받은 로컬 파일 uri (HEIC 등 임의 포맷 가능)
// 백엔드가 JPEG/PNG/WEBP + 매직넘버 일치를 요구하므로, 원본 포맷과 무관하게 항상 JPEG로 정규화해서 업로드
export async function createScan(imageUri) {
  const { uri: jpegUri } = await ImageManipulator.manipulateAsync(imageUri, [], {
    compress: JPEG_COMPRESS_QUALITY,
    format: ImageManipulator.SaveFormat.JPEG,
  });

  const formData = new FormData();
  formData.append('image', {
    uri: jpegUri,
    name: 'photo.jpg',
    type: 'image/jpeg',
  });

  return client.post('/scan', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

// status: 'UPLOADED' | 'OCR_PROCESSING' | 'STRUCTURING' | 'ANALYZING' | 'IMAGE_SEARCHING' | 'COMPLETED' | 'FAILED'
export function getScan(scanId) {
  return client.get(`/scan/${scanId}`);
}

export function getScanAnalysis(scanId) {
  return client.get(`/scan/${scanId}/analysis`);
}
