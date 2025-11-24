import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function StatusBarBlur() {
  const insets = useSafeAreaInsets();

  if (Platform.OS === 'web') {
    return null;
  }

  return (
    <BlurView
      intensity={80}
      tint="dark" // Você pode mudar para "default" ou "light" se quiser seguir o tema do sistema
      style={[
        styles.blur,
        {
          height: insets.top,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
});