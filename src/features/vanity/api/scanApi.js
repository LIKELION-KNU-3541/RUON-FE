import client from '../../../shared/api/client';

// imageUri: 카메라/갤러리에서 받은 로컬 파일 uri
export function createScan(imageUri) {
  const formData = new FormData();
  const fileName = imageUri.split('/').pop() || 'photo.jpg';
  const match = /\.(\w+)$/.exec(fileName);
  const ext = match ? match[1].toLowerCase() : 'jpg';
  const mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';

  formData.append('image', {
    uri: imageUri,
    name: fileName,
    type: mimeType,
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
