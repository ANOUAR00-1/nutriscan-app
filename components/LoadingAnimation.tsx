import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '@/hooks/useTheme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function LoadingAnimation() {
  const { colors } = useTheme();
  
  // Animation values for WiFi circles
  const outerAnim = useRef(new Animated.Value(0)).current;
  const middleAnim = useRef(new Animated.Value(0)).current;
  const innerAnim = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Outer circle animation
    const outerCircle = Animated.loop(
      Animated.sequence([
        Animated.timing(outerAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.delay(450),
        Animated.timing(outerAnim, {
          toValue: 0,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.delay(150),
      ])
    );

    // Middle circle animation
    const middleCircle = Animated.loop(
      Animated.sequence([
        Animated.delay(150),
        Animated.timing(middleAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.delay(450),
        Animated.timing(middleAnim, {
          toValue: 0,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ])
    );

    // Inner circle animation
    const innerCircle = Animated.loop(
      Animated.sequence([
        Animated.delay(300),
        Animated.timing(innerAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.delay(450),
        Animated.timing(innerAnim, {
          toValue: 0,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ])
    );

    // Text animation
    const textAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 1800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 1800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    );

    outerCircle.start();
    middleCircle.start();
    innerCircle.start();
    textAnim.start();

    return () => {
      outerCircle.stop();
      middleCircle.stop();
      innerCircle.stop();
      textAnim.stop();
    };
  }, []);

  // Interpolate stroke dash offset for animations
  const outerStrokeDash = outerAnim.interpolate({
    inputRange: [0, 0.25, 0.65, 0.8, 1],
    outputRange: [25, 0, 301, 276, 276],
  });

  const middleStrokeDash = middleAnim.interpolate({
    inputRange: [0, 0.25, 0.65, 0.8, 1],
    outputRange: [17, 0, 204, 187, 187],
  });

  const innerStrokeDash = innerAnim.interpolate({
    inputRange: [0, 0.25, 0.65, 0.8, 1],
    outputRange: [9, 0, 106, 97, 97],
  });

  return (
    <View style={styles.container}>
      {/* Outer Circle */}
      <Svg width={86} height={86} viewBox="0 0 86 86" style={styles.circleOuter}>
        <Circle
          cx={43}
          cy={43}
          r={40}
          stroke={colors.border}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          rotation="-100"
          origin="43, 43"
        />
        <AnimatedCircle
          cx={43}
          cy={43}
          r={40}
          stroke={colors.primary}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray="62.75 188.25"
          strokeDashoffset={outerStrokeDash}
          rotation="-100"
          origin="43, 43"
        />
      </Svg>

      {/* Middle Circle */}
      <Svg width={60} height={60} viewBox="0 0 60 60" style={styles.circleMiddle}>
        <Circle
          cx={30}
          cy={30}
          r={27}
          stroke={colors.border}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          rotation="-100"
          origin="30, 30"
        />
        <AnimatedCircle
          cx={30}
          cy={30}
          r={27}
          stroke={colors.primary}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray="42.5 127.5"
          strokeDashoffset={middleStrokeDash}
          rotation="-100"
          origin="30, 30"
        />
      </Svg>

      {/* Inner Circle */}
      <Svg width={34} height={34} viewBox="0 0 34 34" style={styles.circleInner}>
        <Circle
          cx={17}
          cy={17}
          r={14}
          stroke={colors.border}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          rotation="-100"
          origin="17, 17"
        />
        <AnimatedCircle
          cx={17}
          cy={17}
          r={14}
          stroke={colors.primary}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray="22 66"
          strokeDashoffset={innerStrokeDash}
          rotation="-100"
          origin="17, 17"
        />
      </Svg>

      {/* Text */}
      <Animated.Text
        style={[
          styles.loadingText,
          { color: colors.primary, opacity: textOpacity },
        ]}
      >
        Loading
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 86,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circleOuter: {
    position: 'absolute',
    top: 0,
  },
  circleMiddle: {
    position: 'absolute',
    top: 13,
  },
  circleInner: {
    position: 'absolute',
    top: 26,
  },
  loadingText: {
    position: 'absolute',
    bottom: 0,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
    textTransform: 'lowercase',
  },
});
