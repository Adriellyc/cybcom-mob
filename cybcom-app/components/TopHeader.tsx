import React from 'react';
import { Platform, TouchableOpacity, StyleSheet, View, TextStyle, Image } from 'react-native';
import Animated, { useAnimatedStyle, SharedValue, interpolate, Extrapolation } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Text } from '@/components/ui/text'; 

interface TopHeaderProps {
  activeTab: 'forYou' | 'following';
  onChangeTab: (tab: 'forYou' | 'following') => void;
  headerTranslateY: SharedValue<number>;
  fullHeight?: number;
}

export function TopHeader({ activeTab, onChangeTab, headerTranslateY, fullHeight = 100 }: TopHeaderProps) {
  const insets = useSafeAreaInsets();

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: headerTranslateY.value }],
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      headerTranslateY.value,
      [-fullHeight * 0.8, 0], 
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  // Texto: Branco (Ativo) vs Cinza (Inativo)
  const getTextStyle = (isActive: boolean): TextStyle => ({
    color: isActive ? '#FFFFFF' : '#71767B', 
    fontWeight: isActive ? '700' : '500',
    fontSize: 15,
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { paddingTop: insets.top + 5 },
        containerStyle, 
      ]}
    >
       {Platform.OS !== 'web' && (
        <BlurView
            intensity={90}
            tint="dark"
            style={StyleSheet.absoluteFill}
        />
        )}

      <Animated.View style={[styles.contentContainer, contentStyle]}>
        
        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/logo-cybcom-sem-fundoPNG.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* ABAS */}
        <View style={styles.tabsRow}>
          {/* Botão PARA VOCÊ */}
          <TouchableOpacity
            onPress={() => onChangeTab('forYou')}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <View style={styles.tabContent}>
              <Text style={getTextStyle(activeTab === 'forYou')}>
                Para você
              </Text>
              {/* TRAÇO #64FFDA */}
              {activeTab === 'forYou' && <View style={styles.indicator} />}
            </View>
          </TouchableOpacity>

          {/* Botão SEGUINDO */}
          <TouchableOpacity
            onPress={() => onChangeTab('following')}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <View style={styles.tabContent}>
              <Text style={getTextStyle(activeTab === 'following')}>
                Seguindo
              </Text>
              {/* TRAÇO #64FFDA */}
              {activeTab === 'following' && <View style={styles.indicator} />}
            </View>
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
    backgroundColor: 'rgba(0,0,0,0.75)', 
    borderBottomWidth: 1,
    borderBottomColor: '#2F3336', 
  },
  contentContainer: {
    paddingBottom: 0, 
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44, 
  },
  logo: {
    width: 28, 
    height: 28,
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44, 
  },
  tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    bottom: 0, 
    width: 56, 
    height: 4, 
    backgroundColor: '#64FFDA', // <--- COR ALTERADA AQUI
    borderRadius: 2, 
  }
});