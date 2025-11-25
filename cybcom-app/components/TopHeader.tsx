import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Animated, { useAnimatedStyle, SharedValue, interpolate, Extrapolation } from 'react-native-reanimated';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Avatar, AvatarImage, AvatarFallbackText } from '@/components/ui/avatar';

interface TopHeaderProps {
  children?: React.ReactNode;       // Conteúdo Central (Logo, Título, etc)
  rightAction?: React.ReactNode;    // Botão da Direita (Opcional)
  bottomContent?: React.ReactNode;  // Conteúdo de baixo (Abas, Filtros, etc)
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

  // Função para abrir o Drawer (Menu Lateral)
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  // --- ANIMAÇÃO DE MOVIMENTO ---
  const containerStyle = useAnimatedStyle(() => {
    if (!headerTranslateY) return {};
    return {
      transform: [{ translateY: headerTranslateY.value }],
    };
  });

  // --- ANIMAÇÃO DE TRANSPARÊNCIA ---
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

  return (
    <Animated.View
      style={[
        styles.container,
        { paddingTop: insets.top + 5 },
        containerStyle,
      ]}
    >
      {/* Fundo Vidro (Blur) */}
      {Platform.OS !== 'web' && (
        <BlurView intensity={90} tint="dark" style={StyleSheet.absoluteFill} />
      )}

      <Animated.View style={[styles.contentWrapper, contentStyle]}>
        
        {/* === LINHA SUPERIOR (Avatar | Centro | Ação) === */}
        <View style={styles.topRow}>
          
          {/* ESQUERDA: Avatar */}
          <View style={styles.sideItem}>
            <TouchableOpacity onPress={openDrawer} activeOpacity={0.7}>
              <Avatar size="md" className="bg-gray-700">
                {/* Substitua pela imagem real do usuário */}
                <AvatarFallbackText>U</AvatarFallbackText>
                <AvatarImage 
                  source={{ uri: "https://github.com/ewayrton.png" }} 
                  alt="Perfil"
                />
              </Avatar>
            </TouchableOpacity>
          </View>

          {/* CENTRO: Onde vai o Logo ou Título */}
          <View style={styles.centerItem}>
            {children}
          </View>

          {/* DIREITA: Espaço ou Botão */}
          <View style={[styles.sideItem, { alignItems: 'flex-end' }]}>
            {rightAction ? rightAction : <View style={{ width: 32 }} />} 
          </View>
        </View>

        {/* === LINHA INFERIOR (Abas opcionais) === */}
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
    backgroundColor: 'rgba(0,0,0,0.75)', 
    borderBottomWidth: 1,
    borderBottomColor: '#2F3336', 
  },
  contentWrapper: {
    paddingBottom: 0,
  },
  topRow: {
    height: 44, // Altura padrão da linha superior
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  bottomRow: {
    height: 44, // Altura padrão das abas
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