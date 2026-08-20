import React, { useState } from 'react';
import VanityPage from './screens/VanityPage';
import CameraScreen from './screens/CameraScreen';
import FileUploadScreen from './screens/FileUploadScreen';
import AnalyzingScreen from './screens/AnalyzingScreen';
import ProductConfirmScreen from './screens/ProductConfirmScreen';
import OcrResultScreen from './screens/OcrResultScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';

/**
 * 화장대 기능 내부 라우터
 * 화면 흐름:
 *   main → camera/fileUpload → analyzing → confirm → ocrResult → detail (촬영/업로드 경로)
 *   main → detail (기존 제품 탭)
 * @param {function} onTabChange - 바텀 네비 탭 전환 콜백 (AppRoutes로 전달)
 */
export default function VanityRouter({ onTabChange, initialProduct, onExternalDetailBack }) {
  const [screen, setScreen] = useState(initialProduct ? 'detail' : 'main');
  const [photoUri, setPhotoUri] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailProduct, setDetailProduct] = useState(initialProduct ?? null);
  const [detailOrigin, setDetailOrigin] = useState(initialProduct ? 'external' : 'main');

  // ── 화면 이동 헬퍼 ──────────────────────────────────────────────
  const goMain = () => setScreen('main');

  const goCamera = () => setScreen('camera');

  const goFileUpload = () => setScreen('fileUpload');

  const goAnalyzing = (uri) => {
    setPhotoUri(uri);
    setScreen('analyzing');
  };

  const goConfirm = (product) => {
    setSelectedProduct(product);
    setScreen('confirm');
  };

  const goOcrResult = (product) => {
    setSelectedProduct(product);
    setScreen('ocrResult');
  };

  const goDetail = (product, origin = 'main') => {
    setDetailProduct(product);
    setDetailOrigin(origin);
    setScreen('detail');
  };

  const handleAddedToVanity = () => {
    setScreen('main');
  };

  // ── 분석 완료 → 결과 확인 ─────────────────────────────────────
  const handleAnalyzingComplete = (scanResult) => {
    goConfirm(scanResult);
  };

  // ── 렌더링 ────────────────────────────────────────────────────
  if (screen === 'camera') {
    return (
      <CameraScreen
        onBack={goMain}
        onPhotoTaken={(uri) => goAnalyzing(uri)}
      />
    );
  }

  if (screen === 'fileUpload') {
    return (
      <FileUploadScreen
        onBack={goMain}
        onNext={(uri) => goAnalyzing(uri)}
      />
    );
  }

  if (screen === 'analyzing') {
    return (
      <AnalyzingScreen
        photoUri={photoUri}
        onBack={goMain}
        onComplete={handleAnalyzingComplete}
      />
    );
  }

  if (screen === 'confirm') {
    return (
      <ProductConfirmScreen
        product={selectedProduct}
        onClose={goMain}
        onConfirm={(product) => goOcrResult(product)}
        onNavigateCamera={goCamera}
        onNavigateFileUpload={goFileUpload}
      />
    );
  }

  if (screen === 'ocrResult') {
    return (
      <OcrResultScreen
        product={selectedProduct}
        onClose={goMain}
        onBack={() => goConfirm(selectedProduct)}
        onNext={(product) => goDetail(product, 'ocrResult')}
      />
    );
  }

  if (screen === 'detail') {
    return (
      <ProductDetailScreen
        product={detailProduct}
        onBack={() => {
          if (detailOrigin === 'ocrResult') {
            goOcrResult(selectedProduct);
          } else if (detailOrigin === 'external') {
            onExternalDetailBack?.();
          } else {
            goMain();
          }
        }}
        onAddToVanity={handleAddedToVanity}
      />
    );
  }

  // 기본: 화장대 메인
  return (
    <VanityPage
      onNavigateCamera={goCamera}
      onNavigateFileUpload={goFileUpload}
      onNavigateDetail={goDetail}
      onTabChange={onTabChange}
    />
  );
}
