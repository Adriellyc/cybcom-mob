import React from 'react';
import { Animated, Platform, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text'; // Usando seu componente de texto
import { BlurView } from 'expo-blur';

interface TopHeaderProps {
  activeTab: 'forYou' | 'following';
  onChangeTab: (tab: 'forYou' | 'following') => void;
  headerTranslateY: Animated.Value;
}

export function TopHeader({ activeTab, onChangeTab, headerTranslateY }: TopHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        paddingTop: insets.top + 8,
        transform: [{ translateY: headerTranslateY }],
      }}
      className="bg-black border-b border-outline-800 pb-2 shadow-sm"
    >
       {/* Efeito de Blur no fundo do Header (Opcional, igual ao StatusBar) */}
       {Platform.OS !== 'web' && (
        <BlurView
            intensity={90}
            tint="dark"
            style={[
            {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            },
            ]}
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