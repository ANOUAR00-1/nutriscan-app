import { useState, useEffect } from 'react';
import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 12/13/14 standard)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

export interface ResponsiveValues {
  screenWidth: number;
  screenHeight: number;
  isSmallDevice: boolean;
  isMediumDevice: boolean;
  isLargeDevice: boolean;
  isTablet: boolean;
  scale: (size: number) => number;
  verticalScale: (size: number) => number;
  moderateScale: (size: number, factor?: number) => number;
  fontSize: (size: number) => number;
  spacing: (size: number) => number;
}

export function useResponsive(): ResponsiveValues {
  const [dimensions, setDimensions] = useState({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height,
      });
    });

    return () => subscription?.remove();
  }, []);

  const { width, height } = dimensions;

  // Device classifications
  const isSmallDevice = width < 375; // iPhone SE, small Android
  const isMediumDevice = width >= 375 && width < 428; // iPhone 12/13/14, most Android
  const isLargeDevice = width >= 428 && width < 768; // iPhone Pro Max, large Android
  const isTablet = width >= 768; // iPad, Android tablets

  // Scaling functions
  const scale = (size: number): number => {
    return (width / BASE_WIDTH) * size;
  };

  const verticalScale = (size: number): number => {
    return (height / BASE_HEIGHT) * size;
  };

  const moderateScale = (size: number, factor: number = 0.5): number => {
    return size + (scale(size) - size) * factor;
  };

  // Optimized for text
  const fontSize = (size: number): number => {
    const scaled = moderateScale(size, 0.25);
    return Math.round(PixelRatio.roundToNearestPixel(scaled));
  };

  // Optimized for spacing
  const spacing = (size: number): number => {
    if (isTablet) return size * 1.2; // More spacing on tablets
    if (isSmallDevice) return size * 0.85; // Less spacing on small devices
    return size;
  };

  return {
    screenWidth: width,
    screenHeight: height,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isTablet,
    scale,
    verticalScale,
    moderateScale,
    fontSize,
    spacing,
  };
}

// Standalone helper functions for use outside components
export const getResponsiveSize = (size: number): number => {
  const width = Dimensions.get('window').width;
  return (width / BASE_WIDTH) * size;
};

export const getResponsiveFontSize = (size: number): number => {
  const width = Dimensions.get('window').width;
  const scaled = size + ((width / BASE_WIDTH) * size - size) * 0.25;
  return Math.round(PixelRatio.roundToNearestPixel(scaled));
};

export const getResponsiveSpacing = (size: number): number => {
  const width = Dimensions.get('window').width;
  if (width >= 768) return size * 1.2; // Tablet
  if (width < 375) return size * 0.85; // Small device
  return size;
};
