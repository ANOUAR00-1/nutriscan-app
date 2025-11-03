import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/hooks/useTheme';

export default function LoadingAnimation() {
  const { colors } = useTheme();
  
  // Animation values for multiple flames
  const scaleAnim1 = useRef(new Animated.Value(1)).current;
  const scaleAnim2 = useRef(new Animated.Value(1)).current;
  const scaleAnim3 = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim1 = useRef(new Animated.Value(0.3)).current;
  const opacityAnim2 = useRef(new Animated.Value(0.3)).current;
  const translateY1 = useRef(new Animated.Value(0)).current;
  const translateY2 = useRef(new Animated.Value(0)).current;
  const translateY3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Main flame pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim1, {
            toValue: 1.2,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim1, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim1, {
            toValue: 0.95,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim1, {
            toValue: 0.7,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(scaleAnim1, {
          toValue: 1,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // Side flames
    const sideFlame1 = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim2, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim2, {
          toValue: 0.9,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim2, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );

    const sideFlame2 = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim3, {
          toValue: 1.15,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim3, {
          toValue: 0.85,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim3, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    );

    // Rotation animation
    const rotationAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // Particle animations
    const particle1 = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(translateY1, {
            toValue: -80,
            duration: 2000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim2, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(translateY1, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim2, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    const particle2 = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY2, {
          toValue: -60,
          duration: 1800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY2, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    const particle3 = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY3, {
          toValue: -70,
          duration: 2200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY3, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();
    sideFlame1.start();
    sideFlame2.start();
    rotationAnimation.start();
    particle1.start();
    particle2.start();
    particle3.start();

    return () => {
      pulseAnimation.stop();
      sideFlame1.stop();
      sideFlame2.stop();
      rotationAnimation.stop();
      particle1.stop();
      particle2.stop();
      particle3.stop();
    };
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Particles */}
      <Animated.View
        style={[
          styles.particle,
          {
            opacity: opacityAnim2,
            transform: [{ translateY: translateY1 }, { translateX: -20 }],
          },
        ]}
      >
        <View style={[styles.particleDot, { backgroundColor: colors.primary }]} />
      </Animated.View>

      <Animated.View
        style={[
          styles.particle,
          {
            opacity: opacityAnim2,
            transform: [{ translateY: translateY2 }, { translateX: 20 }],
          },
        ]}
      >
        <View style={[styles.particleDot, { backgroundColor: colors.secondary }]} />
      </Animated.View>

      <Animated.View
        style={[
          styles.particle,
          {
            opacity: opacityAnim2,
            transform: [{ translateY: translateY3 }],
          },
        ]}
      >
        <View style={[styles.particleDot, { backgroundColor: colors.accent }]} />
      </Animated.View>

      {/* Outer rotating ring */}
      <Animated.View
        style={[
          styles.outerRing,
          {
            transform: [{ rotate: rotation }],
          },
        ]}
      >
        <LinearGradient
          colors={[colors.primary + '40', colors.secondary + '40', colors.primary + '40']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ringGradient}
        />
      </Animated.View>

      {/* Left flame */}
      <Animated.View
        style={[
          styles.flameLeft,
          {
            opacity: opacityAnim1,
            transform: [{ scale: scaleAnim2 }, { rotate: '45deg' }],
          },
        ]}
      >
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.flameGradient}
        />
      </Animated.View>

      {/* Right flame */}
      <Animated.View
        style={[
          styles.flameRight,
          {
            opacity: opacityAnim1,
            transform: [{ scale: scaleAnim3 }, { rotate: '45deg' }],
          },
        ]}
      >
        <LinearGradient
          colors={[colors.secondary, colors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.flameGradient}
        />
      </Animated.View>

      {/* Center main flame */}
      <Animated.View
        style={[
          styles.flameCenter,
          {
            opacity: opacityAnim1,
            transform: [{ scale: scaleAnim1 }, { rotate: '45deg' }],
          },
        ]}
      >
        <LinearGradient
          colors={[colors.primary, colors.secondary, colors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.flameGradient}
        />
      </Animated.View>

      {/* Bottom glow */}
      <View style={[styles.bottomGlow, { backgroundColor: colors.primary + '30' }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flameCenter: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  flameLeft: {
    position: 'absolute',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    left: -5,
    top: 10,
  },
  flameRight: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    right: -5,
    top: 10,
  },
  flameGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  outerRing: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  ringGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  particle: {
    position: 'absolute',
    top: 50,
  },
  particleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  bottomGlow: {
    position: 'absolute',
    bottom: 15,
    width: 70,
    height: 20,
    borderRadius: 35,
    opacity: 0.6,
  },
});
