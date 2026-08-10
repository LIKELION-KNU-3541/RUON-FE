import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SvgXml } from 'react-native-svg';
import { logo3dSvgXml } from '../../../../assets/images/logo_3d_svg';
import BottomButton from '../../../shared/components/BottomButton';

const ruonLogoSvgXml = `<svg width="199" height="96" viewBox="0 0 199 96" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.14536 72V23.1153H22.0824C27.3542 23.1153 31.4013 24.2868 34.2237 26.6299C37.0992 28.9197 38.537 32.1414 38.537 36.295C38.537 39.4901 37.7116 42.2059 36.0608 44.4424C34.4633 46.679 32.4397 48.4097 29.9902 49.6344L42.451 72H33.2651L22.8012 51.7112C22.2687 51.8177 21.6563 51.8976 20.9641 51.9509C20.2718 52.0041 19.473 52.0308 18.5678 52.0308C18.195 52.0308 17.7424 52.0308 17.2099 52.0308C16.6773 51.9775 16.0383 51.9243 15.2928 51.871V72H7.14536ZM21.3635 46.4394C23.0143 46.4394 24.5053 46.1731 25.8366 45.6406C27.1679 45.0548 28.2329 44.1762 29.0317 43.0047C29.8837 41.7799 30.3097 40.209 30.3097 38.2919C30.3097 35.4163 29.4843 33.1798 27.8335 31.5822C26.236 29.9315 24.0793 29.0262 21.3635 28.8664C20.4582 28.8132 19.4997 28.8132 18.4879 28.8664C17.4761 28.8664 16.4111 28.8931 15.2928 28.9463V46.1199C16.2513 46.1731 17.2099 46.253 18.1684 46.3595C19.1802 46.4127 20.2452 46.4394 21.3635 46.4394ZM68.4085 73.0384C64.6809 73.0384 61.4326 72.426 58.6635 71.2012C55.9477 69.9232 53.8176 68.0328 52.2734 65.53C50.7823 62.9739 50.0368 59.8054 50.0368 56.0246V23.1153H58.1843V53.3887C58.1843 56.4772 58.6901 58.9534 59.7019 60.8172C60.7137 62.681 62.1248 64.0389 63.9354 64.8909C65.7992 65.743 67.9026 66.169 70.2457 66.169C73.3343 66.169 75.8104 65.317 77.6742 63.6129C79.5913 61.8556 80.5498 59.2197 80.5498 55.7051V23.1153H88.2979V53.9478C88.2979 57.9949 87.4991 61.4562 85.9016 64.3318C84.3573 67.2074 82.0941 69.3907 79.112 70.8817C76.1832 72.3195 72.6154 73.0384 68.4085 73.0384ZM152.936 72V23.1153H161.004L184.727 59.2996V23.1153H191.837V72H184.408L160.125 35.2566V72H152.936Z" fill="#ECEADB"/>
<path d="M147.92 46.3066C147.92 50.0278 147.222 53.4699 145.827 56.6329C144.431 59.7959 142.524 62.5403 140.106 64.866C137.733 67.1917 134.942 68.9826 131.733 70.2385C128.57 71.4943 125.198 72.1223 121.616 72.1223C118.081 72.1223 114.732 71.5176 111.569 70.3082C108.406 69.0523 105.638 67.308 103.266 65.0753C100.894 62.7961 99.0099 60.0982 97.6144 56.9818C96.2655 53.8188 95.591 50.3534 95.591 46.5857C95.591 42.5855 96.312 39.0038 97.754 35.8408C99.1959 32.6313 101.126 29.9335 103.545 27.7473C106.01 25.5146 108.871 23.8168 112.127 22.6539C115.43 21.4445 118.895 20.8398 122.523 20.8398C126.477 20.8398 130.012 21.5375 133.128 22.933C136.291 24.3284 138.966 26.2123 141.152 28.5845C143.338 30.9103 145.013 33.6081 146.176 36.6781C147.339 39.7481 147.92 42.9576 147.92 46.3066ZM139.268 46.3764C139.268 43.539 138.896 40.6784 138.152 37.7944C137.454 34.9105 136.361 32.3057 134.873 29.98C133.431 27.6077 131.617 25.7006 129.43 24.2587C127.244 22.7702 126.463 22.026 121.686 22.026C118.662 22.026 116.034 22.7702 113.802 24.2587C111.615 25.7006 109.801 27.5845 108.359 29.9102C106.964 32.2359 105.917 34.8873 105.22 37.8642C104.568 40.7946 104.243 43.7716 104.243 46.795C104.243 49.958 104.615 53.0048 105.359 55.9352C106.103 58.8656 107.196 61.4472 108.638 63.6799C110.127 65.9126 111.964 67.7034 114.15 69.0523C116.383 70.4013 118.965 71.0757 121.895 71.0757C124.826 71.0757 131.686 67.3545 134.942 63.1217C136.384 60.7495 137.454 58.0981 138.152 55.1677C138.896 52.2373 139.268 49.3068 139.268 46.3764Z" fill="#ECEADB"/>
</svg>`;

const FIGMA_WIDTH = 360;
const FIGMA_HEIGHT = 800;

export default function WelcomeScreen({ onNext }) {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const scaleW = (px) => (px / FIGMA_WIDTH) * SCREEN_WIDTH;
  const scaleH = (px) => (px / FIGMA_HEIGHT) * SCREEN_HEIGHT;

  return (
    <View className="flex-1 bg-[#4A311F] relative">
      <StatusBar style="light" />

      <ImageBackground
        source={require('../../../../assets/images/wel_bg2.png')}
        className="flex-1 relative"
        resizeMode="cover"
      >
        {/* 2. Decorative Circle Line Art (PNG @3x) ???�단??중단??주석 처리 */}
        {/*
        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 1 }}>
          <Image source={require('../../../../assets/images/3p_top_circle.png')} style={{ position: 'absolute', right: 0, top: 0, width: scaleW(168), height: scaleW(254) }} resizeMode="stretch" />
          <Image source={require('../../../../assets/images/3p_mid_circle.png')} style={{ position: 'absolute', right: 0, top: scaleH(189), width: scaleW(94), height: scaleW(146) }} resizeMode="stretch" />
          <Image source={require('../../../../assets/images/3p_sdw.png')} style={{ position: 'absolute', left: scaleW(15), top: scaleH(430), width: scaleW(253), height: scaleW(27) }} resizeMode="contain" />
        </View>
        */}


        {/* 3. Header Frame 37725 (top: 84px, left: 40px) */}
        <View style={{ position: 'absolute', left: scaleW(40), top: scaleH(84), width: scaleW(245) }} className="z-10">
          <SvgXml xml={ruonLogoSvgXml} width={scaleW(130)} height={scaleH(62)} />

          <Text style={{ marginTop: scaleH(10) }} className="text-[#FFF9F1] text-[24px] font-bold leading-[34px]">
            반가워요,
          </Text>

          <Text style={{ marginTop: scaleH(10) }} className="text-[#FFF9F1] text-[14px] font-medium leading-[24px]">
            {"내 화장대 속 제품을 확인하고\n안심할 수 있는 루틴을 만들어 드릴게요."}
          </Text>
        </View>

        {/* 4. Center 3D Soap Vector Asset (top: 254px) */}
        <View style={{ position: 'absolute', left: 0, right: 0, top: scaleH(254) }} className="items-center justify-center z-10">
          <SvgXml
            xml={logo3dSvgXml}
            width={scaleW(329)}
            height={scaleW(329)}
            style={{ transform: [{ rotate: '-13.85deg' }] }}
          />
        </View>

        {/* 그림????Figma: left:54, top:593.7, width:252.86, height:27.3 */}
        <Image
          source={require('../../../../assets/images/3p_sdw.png')}
          style={{
            position: 'absolute',
            left: scaleW(54),
            top: scaleH(593.7),
            width: scaleW(252.86),
            height: scaleW(27.3),
            zIndex: 9,
          }}
          resizeMode="stretch"
        />

        {/* 3p_btm_circle ??3D 로고(zIndex:10) ?�에 ?�시?�도�?zIndex:20?�로 최전�?배치
            Figma Ellipse 1131: 267×267, left:-185, top:218 */}
        <Image
          source={require('../../../../assets/images/3p_btm_circle.png')}
          style={{
            position: 'absolute',
            left: 0,
            top: scaleH(218),
            width: scaleW(142),
            height: scaleW(289),
            zIndex: 20,
          }}
          resizeMode="stretch"
        />

        {/* 5. Reusable Bottom Action Button */}
        <BottomButton title="다음" onPress={onNext} activeDot={1} />
      </ImageBackground>
    </View>
  );
}
