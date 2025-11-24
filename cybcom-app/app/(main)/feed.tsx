import React, { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';

// Componentes do Projeto
import { TopHeader } from '@/components/TopHeader';
import { BottomNav } from '@/components/BottomNav';
import { RefreshScrollView } from '@/components/RefreshScrollView';
import { StatusBarBlur } from '@/components/StatusBarBlur';

// UI Components
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Icon, ThreeDotsIcon, FavouriteIcon, MessageCircleIcon, ShareIcon } from '@/components/ui/icon';

export default function FeedScreen() {
  const [activeTab, setActiveTab] = useState<'forYou' | 'following'>('forYou');
  
  const insets = useSafeAreaInsets();
  const HEADER_HEIGHT = 110;
  // A altura total que o header precisa percorrer para sumir
  const FULL_HEADER_HEIGHT = HEADER_HEIGHT + insets.top;

  // Valores compartilhados (Reanimated)
  const headerTranslateY = useSharedValue(0);
  const lastScrollY = useSharedValue(0);

  // --- LÓGICA NOVA: FOLLOW THE FINGER (Segue o Dedo) ---
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      const diff = currentScrollY - lastScrollY.value;

      // Se estivermos no topo absoluto (ou no bounce do iOS), mostre o header
      if (currentScrollY <= 0) {
        headerTranslateY.value = 0;
      } else {
        // Calcula a nova posição baseada no movimento do dedo
        // Se diff > 0 (descendo), subtraímos (header sobe)
        // Se diff < 0 (subindo), somamos (header desce)
        const newTranslateY = headerTranslateY.value - diff;

        // O segredo é limitar (Clamp) o valor entre:
        // -FULL_HEADER_HEIGHT (totalmente escondido) e 0 (totalmente visível)
        if (newTranslateY < -FULL_HEADER_HEIGHT) {
          headerTranslateY.value = -FULL_HEADER_HEIGHT;
        } else if (newTranslateY > 0) {
          headerTranslateY.value = 0;
        } else {
          headerTranslateY.value = newTranslateY;
        }
      }

      lastScrollY.value = currentScrollY;
    },
  });

  const onScrollRefresh = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('Refresh concluído.');
        resolve();
      }, 1500);
    });
  };

  return (
    <View className="flex-1 bg-black">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBarBlur />
      
      <TopHeader 
        activeTab={activeTab} 
        onChangeTab={setActiveTab} 
        headerTranslateY={headerTranslateY} 
        fullHeight={FULL_HEADER_HEIGHT} // Passamos a altura para calcular a opacidade
      />

      <RefreshScrollView
        onRefresh={onScrollRefresh}
        scrollViewProps={{
          onScroll: scrollHandler,
          scrollEventThrottle: 16,
          contentContainerStyle: { 
            paddingTop: FULL_HEADER_HEIGHT + 10, 
            paddingBottom: 100 
          },
        }}
      >
        <Box className="flex-1 min-h-screen bg-black">
          <Box className="px-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <Box key={i} className="mb-1 border-b border-outline-800 py-4 px-4">
                <HStack space="md" className="items-start">
                   <Avatar size="sm" className="bg-primary-600">
                    <AvatarFallbackText>U{i}</AvatarFallbackText>
                    <AvatarImage 
                      source={{ uri: `https://i.pravatar.cc/150?u=${i + 10}` }} 
                    />
                  </Avatar>
                  <VStack className="flex-1">
                    <HStack className="justify-between items-center mb-1">
                        <HStack space="xs" className="items-center">
                            <Text className="text-white font-bold text-base">User {i + 1}</Text>
                            <Text className="text-typography-400 text-sm">@usuario_{i + 1} · 2h</Text>
                        </HStack>
                        <Icon as={ThreeDotsIcon} className="text-typography-400" size="sm" />
                    </HStack>
                    <Text className="text-white text-base leading-6 mb-3">
                      Post {i + 1}. Agora o header desliza suavemente junto com o seu dedo e o conteúdo vai sumindo! ✨
                    </Text>
                    <HStack className="justify-between pr-8">
                        <HStack space="xs" className="items-center">
                            <Icon as={MessageCircleIcon} className="text-typography-400" size="sm" />
                            <Text className="text-typography-400 text-xs">12</Text>
                        </HStack>
                        <HStack space="xs" className="items-center">
                             <Icon as={ShareIcon} className="text-typography-400" size="sm" />
                             <Text className="text-typography-400 text-xs">5</Text>
                        </HStack>
                        <HStack space="xs" className="items-center">
                            <Icon as={FavouriteIcon} className="text-typography-400" size="sm" />
                            <Text className="text-typography-400 text-xs">84</Text>
                        </HStack>
                        <Icon as={ShareIcon} className="text-typography-400" size="sm" />
                    </HStack>
                  </VStack>
                </HStack>
              </Box>
            ))}
          </Box>
        </Box>
      </RefreshScrollView>

      <BottomNav />
    </View>
  );
}