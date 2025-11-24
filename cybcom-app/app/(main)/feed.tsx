import React, { useState, useRef } from 'react';
import { 
  View, 
  Animated, 
  Platform, 
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import { TopHeader } from '@/components/TopHeader';
import { BottomNav } from '@/components/BottomNav';
import { RefreshScrollView } from '@/components/RefreshScrollView';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

export default function FeedScreen() {
  const [activeTab, setActiveTab] = useState<'forYou' | 'following'>('forYou');
  
  // 1. Animated Value que rastreia a posição real do scroll (para o efeito Blur)
  const scrollY = useRef(new Animated.Value(0)).current; 
  // 2. Animated Value que controlará a translação do Header (para esconder/mostrar)
  const headerTranslateY = useRef(new Animated.Value(0)).current; 
  
  const insets = useSafeAreaInsets();
  const HEADER_HEIGHT = 110; // Altura do Header (deve ser consistente com o TopHeader.tsx)
  const HEADER_HEIGHT_COMPENSATE = HEADER_HEIGHT + insets.top; 

  const lastScrollY = useRef(0);

  // Função para capturar a posição do scroll com tipagem correta
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: Platform.OS !== 'web',
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        const diff = currentScrollY - lastScrollY.current;

        // Delta mínimo para considerar a rolagem como intencional (evita tremores)
        if (Math.abs(diff) < 3) return; 

        // 1. Determina a direção e verifica o estado atual
        const isScrollingDown = diff > 0;
        const isHeaderFullyVisible = headerTranslateY.__getValue() === 0;

        // 2. Condição para ESCONDER o Header
        // Esconde se estiver rolando para baixo E a rolagem já saiu da área superior E o header está visível
        if (isScrollingDown && currentScrollY > HEADER_HEIGHT && isHeaderFullyVisible) {
            Animated.timing(headerTranslateY, {
                toValue: -HEADER_HEIGHT, // Posição totalmente escondida
                duration: 200, 
                useNativeDriver: Platform.OS !== 'web',
            }).start();
        }
        
        // 3. Condição para MOSTRAR o Header
        // Mostra se estiver rolando para cima OU se estiver rolando para cima o suficiente
        else if (diff < 0) {
            Animated.timing(headerTranslateY, {
                toValue: 0, // Posição totalmente visível
                duration: 200, 
                useNativeDriver: Platform.OS !== 'web',
            }).start();
        }

        // 4. Correção: Evita que o lastScrollY seja atualizado se a rolagem for muito pequena
        lastScrollY.current = currentScrollY;
      },
    }
  );

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
      <TopHeader 
        activeTab={activeTab} 
        onChangeTab={setActiveTab} 
        scrollY={scrollY} 
        headerTranslateY={headerTranslateY} 
      />

      <RefreshScrollView
        onRefresh={onScrollRefresh}
        scrollViewProps={{
          onScroll: handleScroll,
          scrollEventThrottle: 16, 
          contentContainerStyle: { paddingTop: HEADER_HEIGHT_COMPENSATE },
        }}
      >
        <View className="flex-1 bg-black min-h-screen">
          <Box className="p-4">
            {activeTab === 'forYou' ? (
              <Text className="text-white text-3xl">Conteúdo Para Você</Text>
            ) : (
              <Text className="text-white text-3xl">Conteúdo Seguindo</Text>
            )}
            {/* Simulação de conteúdo longo para rolar */}
            {Array.from({ length: 50 }).map((_, i) => (
              <Text key={i} className="text-slate-500 py-2">
                Item de Feed {i + 1}
              </Text>
            ))}
          </Box>
        </View>
      </RefreshScrollView>

      <BottomNav />
    </View>
  );
}