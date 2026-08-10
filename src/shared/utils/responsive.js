import { useWindowDimensions } from 'react-native';

export const DESIGN_WIDTH = 360;
export const DESIGN_HEIGHT = 800;

export function useResponsiveScale() {
  const { width, height } = useWindowDimensions();
  const widthRatio = width / DESIGN_WIDTH;
  const shapeRatio = Math.min(Math.max(widthRatio, 0.9), 1.2);
  const scale = (value) => value * shapeRatio;
  const moderateScale = (value, factor = 0.3) =>
    value * (1 + (shapeRatio - 1) * factor);

  return { width, height, scale, moderateScale, widthRatio };
}
