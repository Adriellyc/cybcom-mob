import React from 'react';
import { Platform, TouchableOpacity, StyleSheet, View, TextStyle, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, SharedValue, interpolate, Extrapolation } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { BlurView } from 'expo-blur';

interface TopHeaderProps {
  activeTab: 'forYou' | 'following';
  onChangeTab: (tab: 'forYou' | 'following') => void;
  headerTranslateY: SharedValue<number>;
  fullHeight?: number;
}

export function TopHeader({ activeTab, onChangeTab, headerTranslateY, fullHeight = 100 }: TopHeaderProps) {
  const insets = useSafeAreaInsets();

  // Estilo do CONTAINER (Movimento Vertical)
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: headerTranslateY.value }],
    };
  });

  // Estilo do CONTEÚDO (Transparência/Fade Out)
  const contentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      headerTranslateY.value,
      [-fullHeight * 0.8, 0], 
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  // Funções auxiliares tipadas para garantir cores corretas e satisfazer o TypeScript
  const getButtonStyle = (isActive: boolean): ViewStyle => ({
    backgroundColor: isActive ? '#FFFFFF' : '#1a1a1a', // Branco (Ativo) vs Cinza Escuro (Inativo)
  });

  const getTextStyle = (isActive: boolean): TextStyle => ({
    color: isActive ? '#000000' : '#888888', // Preto (Ativo) vs Cinza (Inativo)
    fontWeight: isActive ? '600' : '500', // Tipagem corrigida para aceitar "600" | "500"
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { paddingTop: insets.top + 8 },
        containerStyle, 
      ]}
    >
       {Platform.OS !== 'web' && (
        <BlurView
            intensity={80}
            tint="dark"
            style={StyleSheet.absoluteFill}
        />
        )}

      <Animated.View style={[styles.contentContainer, contentStyle]}>
        <Text className="text-2xl font-bold text-white mb-3 pl-4">Feed</Text>

        <View className="flex-row gap-2 px-4 pb-2">
          {/* Botão PARA VOCÊ */}
          <TouchableOpacity
            onPress={() => onChangeTab('forYou')}
            style={[styles.tab, getButtonStyle(activeTab === 'forYou')]}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, getTextStyle(activeTab === 'forYou')]}>
              Para Você
            </Text>
          </TouchableOpacity>

          {/* Botão SEGUINDO */}
          <TouchableOpacity
            onPress={() => onChangeTab('following')}
            style={[styles.tab, getButtonStyle(activeTab === 'following')]}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, getTextStyle(activeTab === 'following')]}>
              Seguindo
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  contentContainer: {
    // Container interno
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 9999, // Pill shape
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 14,
  }
});