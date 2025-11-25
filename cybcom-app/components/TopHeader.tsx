import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Animated, { useAnimatedStyle, SharedValue, interpolate, Extrapolation } from 'react-native-reanimated';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Avatar, AvatarImage, AvatarFallbackText } from '@/components/ui/avatar';
import { useColorScheme } from 'nativewind'; // 1. Importação para detectar o tema

interface TopHeaderProps {
  children?: React.ReactNode;
  rightAction?: React.ReactNode;
  bottomContent?: React.ReactNode;
  headerTranslateY?: SharedValue<number>; 
  fullHeight?: number;              
}

export function TopHeader({ 
  children, 
  rightAction, 
  bottomContent, 
  headerTranslateY, 
  fullHeight = 100 
}: TopHeaderProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  
  // 2. Hook para saber se está Dark ou Light
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  // --- ANIMAÇÃO DE MOVIMENTO (Mantida) ---
  const containerStyle = useAnimatedStyle(() => {
    if (!headerTranslateY) return {};
    return {
      transform: [{ translateY: headerTranslateY.value }],
    };
  });

  // --- ANIMAÇÃO DE TRANSPARÊNCIA (Mantida) ---
  const contentStyle = useAnimatedStyle(() => {
    if (!headerTranslateY) return { opacity: 1 };
    const opacity = interpolate(
      headerTranslateY.value,
      [-fullHeight * 0.8, 0], 
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  // 3. Definição de Cores Dinâmicas
  // No Dark: Fundo preto translúcido + Borda escura
  // No Light: Fundo branco translúcido + Borda cinza clara
  const dynamicHeaderStyle = {
    backgroundColor: isDark ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.85)',
    borderBottomColor: isDark ? '#2F3336' : '#E2E8F0',
  };

  return (
    <Animated.View
      style={[
        styles.container,
        dynamicHeaderStyle, // Aplica as cores dinâmicas por cima do estilo base
        { paddingTop: insets.top + 5 },
        containerStyle,
      ]}
    >
      {/* 4. BlurView Adaptativo (tint="dark" ou "light") */}
      {Platform.OS !== 'web' && (
        <BlurView 
          intensity={90} 
          tint={isDark ? "dark" : "light"} 
          style={StyleSheet.absoluteFill} 
        />
      )}

      <Animated.View style={[styles.contentWrapper, contentStyle]}>
        
        {/* === LINHA SUPERIOR === */}
        <View style={styles.topRow}>
          
          {/* Avatar */}
          <View style={styles.sideItem}>
            <TouchableOpacity onPress={openDrawer} activeOpacity={0.7}>
              <Avatar size="md" className="bg-gray-700">
                <AvatarFallbackText>U</AvatarFallbackText>
                <AvatarImage 
                  source={{ uri: "https://github.com/ewayrton.png" }} 
                  alt="Perfil"
                />
              </Avatar>
            </TouchableOpacity>
          </View>

          {/* Centro (Logo) */}
          <View style={styles.centerItem}>
            {children}
          </View>

          {/* Direita */}
          <View style={[styles.sideItem, { alignItems: 'flex-end' }]}>
            {rightAction ? rightAction : <View style={{ width: 32 }} />} 
          </View>
        </View>

        {/* === LINHA INFERIOR (Abas) === */}
        {bottomContent && (
          <View style={styles.bottomRow}>
            {bottomContent}
          </View>
        )}

      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0, left: 0, right: 0, zIndex: 1000,
    // As cores fixas abaixo serão sobrescritas pelo dynamicHeaderStyle
    backgroundColor: 'rgba(0,0,0,0.75)', 
    borderBottomWidth: 1,
    borderBottomColor: '#2F3336', 
  },
  contentWrapper: {
    paddingBottom: 0,
  },
  topRow: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  bottomRow: {
    height: 44,
    width: '100%',
  },
  sideItem: {
    width: 40, 
    justifyContent: 'center',
  },
  centerItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});