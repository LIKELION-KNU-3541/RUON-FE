import client from '../../../shared/api/client';

// category: 'KEEP_USING' | 'PAUSE' | 'SELECTIVE_USE' | 'NEEDS_REVIEW' (없으면 전체)
// usageStatus: 'IN_USE' | 'DISCONTINUED' (기본값 IN_USE)
export function getProducts({ category, usageStatus, page = 1, size = 5 } = {}) {
  return client.get('/products', { params: { category, usageStatus, page, size } });
}

// scanId 있으면 productName/brandName/capacity는 스캔 결과에서 자동으로 채워짐
export function createProduct({ scanId, productName, brandName, capacity }) {
  return client.post('/products', { scanId, productName, brandName, capacity });
}

export function getProduct(productId) {
  return client.get(`/products/${productId}`);
}

export function deleteProduct(productId) {
  return client.delete(`/products/${productId}`);
}

// usageStatus: 'IN_USE' | 'DISCONTINUED'
export function updateUsageStatus(productId, usageStatus) {
  return client.patch(`/products/${productId}`, { usageStatus });
}

export function getAnalysisSummary() {
  return client.get('/products/analysis-summary');
}
