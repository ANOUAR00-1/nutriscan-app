import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/hooks/useTheme';
import LoadingAnimation from './LoadingAnimation';

interface LoadingScreenProps {
  text?: string;
}

export default function LoadingScreen({ text = 'Loading...' }: LoadingScreenProps) {
  const { colors } = useTheme();

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundGray, colors.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <LoadingAnimation />
        
        <Text style={[styles.loadingText, { color: colors.text }]}>
          {text}
        </Text>
        
        <View style={[styles.loadingBar, { backgroundColor: colors.border }]}>
          <View style={[styles.loadingBarFill, { backgroundColor: colors.primary }]} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 24,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  loadingBar: {
    width: 200,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingBarFill: {
    width: '60%',
    height: '100%',
    borderRadius: 2,
  },
});
