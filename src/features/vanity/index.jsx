import React, { useState } from 'react';
import VanityPage from './screens/VanityPage';
import CameraScreen from './screens/CameraScreen';
import FileUploadScreen from './screens/FileUploadScreen';
import AnalyzingScreen from './screens/AnalyzingScreen';
import ProductConfirmScreen from './screens/ProductConfirmScreen';
import OcrResultScreen from './screens/OcrResultScreen';
import ProductSearchScreen from './screens/ProductSearchScreen';
import ProductSearchResultScreen from './screens/ProductSearchResultScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';

/**
 * 화장대 기능 내부 라우터
 * 화면 흐름:
 *   main → camera/fileUpload → analyzing → confirm → ocrResult → detail (촬영/업로드 경로)
 *   main → search → searchResult → detail (검색 경로)
 *   main → detail (기존 제품 탭)
 * @param {function} onTabChange - 바텀 네비 탭 전환 콜백 (AppRoutes로 전달)
 */
export default function VanityRouter({ onTabChange }) {
  const [screen, setScreen] = useState('main');
  const [photoUri, setPhotoUri] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailOrigin, setDetailOrigin] = useState('main');

  // ── 화면 이동 헬퍼 ──────────────────────────────────────────────
  const goMain = () => setScreen('main');

  const goCamera = () => setScreen('camera');

  const goFileUpload = () => setScreen('fileUpload');

  const goAnalyzing = (uri) => {
    setPhotoUri(uri);
    setScreen('analyzing');
  };

  const goSearch = () => setScreen('search');

  const goSearchResult = (query) => {
    setSearchQuery(query);
    setScreen('searchResult');
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
    setSelectedProduct(product);
    setDetailOrigin(origin);
    setScreen('detail');
  };

  const handleAddToVanity = (product) => {
    // TODO: 서버 연동 시 화장대 추가 API 호출
    // API 성공 후 main으로 이동
    setScreen('main');
  };

  // ── 분석 완료 → 결과 확인 ─────────────────────────────────────
  const handleAnalyzingComplete = (product) => {
    // TODO: 서버 연동 시 product는 API에서 받은 실제 데이터
    // 현재는 null 전달 → ProductConfirmScreen에서 더미 폴백 사용
    goConfirm(product);
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

  if (screen === 'search') {
    return (
      <ProductSearchScreen
        onBack={goMain}
        onSearch={(query) => goSearchResult(query)}
      />
    );
  }

  if (screen === 'searchResult') {
    return (
      <ProductSearchResultScreen
        query={searchQuery}
        onBack={goSearch}
        onSelectProduct={(product) => goDetail(product, 'search')}
      />
    );
  }

  if (screen === 'detail') {
    return (
      <ProductDetailScreen
        product={selectedProduct}
        onBack={() => {
          if (detailOrigin === 'ocrResult') {
            goOcrResult(selectedProduct);
          } else if (detailOrigin === 'search') {
            setScreen('searchResult');
          } else {
            goMain();
          }
        }}
        onAddToVanity={handleAddToVanity}
      />
    );
  }

  // 기본: 화장대 메인
  return (
    <VanityPage
      onNavigateCamera={goCamera}
      onNavigateFileUpload={goFileUpload}
      onNavigateSearch={goSearch}
      onNavigateDetail={goDetail}
      onTabChange={onTabChange}
    />
  );
}
