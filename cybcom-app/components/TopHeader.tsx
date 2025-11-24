import React from 'react';
import { Platform, TouchableOpacity, View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, SharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { BlurView } from 'expo-blur';

interface TopHeaderProps {
  activeTab: 'forYou' | 'following';
  onChangeTab: (tab: 'forYou' | 'following') => void;
  headerTranslateY: SharedValue<number>; // Agora é um SharedValue
}

export function TopHeader({ activeTab, onChangeTab, headerTranslateY }: TopHeaderProps) {
  const insets = useSafeAreaInsets();

  // Estilo animado rodando na UI Thread
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(headerTranslateY.value, { duration: 600 }) }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { paddingTop: insets.top + 8 },
        animatedStyle, // Aplica a animação aqui
      ]}
    >
       {Platform.OS !== 'web' && (
        <BlurView
            intensity={90}
            tint="dark"
            style={StyleSheet.absoluteFill}
        />
        )}

      <View className="px-4 pb-2">
        <Text className="text-2xl font-bold text-white mb-3">Feed</Text>

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => onChangeTab('forYou')}
            className={`flex-1 py-2.5 px-4 rounded-full items-center ${
              activeTab === 'forYou' ? 'bg-white' : 'bg-background-800'
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                activeTab === 'forYou' ? 'text-black' : 'text-typography-400'
              }`}
            >
              Para Você
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onChangeTab('following')}
            className={`flex-1 py-2.5 px-4 rounded-full items-center ${
              activeTab === 'following' ? 'bg-white' : 'bg-background-800'
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                activeTab === 'following' ? 'text-black' : 'text-typography-400'
              }`}
            >
              Seguindo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    // Removi a cor sólida daqui para deixar o BlurView brilhar, 
    // ou use 'rgba(0,0,0,0.8)' se preferir mais escuro.
    backgroundColor: 'rgba(0,0,0,0.6)', 
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
  }
});