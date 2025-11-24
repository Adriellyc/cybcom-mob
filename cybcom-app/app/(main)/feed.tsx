import React, { useState, useRef, useEffect } from 'react'; // <-- Adicionado useEffect
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
  
  const scrollY = useRef(new Animated.Value(0)).current; 
  const headerTranslateY = useRef(new Animated.Value(0)).current; 
  
  const insets = useSafeAreaInsets();
  const HEADER_HEIGHT = 110; 
  const HEADER_HEIGHT_COMPENSATE = HEADER_HEIGHT + insets.top; 

  const lastScrollY = useRef(0);
  
  // Ref para armazenar o valor numérico atual (sincronizado) da animação
  const headerTranslateYValue = useRef(0); 

  // Efeito para sincronizar o valor animado com a ref (solução segura para o erro de tipagem)
  useEffect(() => {
    const id = headerTranslateY.addListener((value) => {
      headerTranslateYValue.current = value.value;
    });
    return () => headerTranslateY.removeListener(id);
  }, [headerTranslateY]); // O array de dependências garante que o listener seja atualizado corretamente

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: Platform.OS !== 'web',
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        const diff = currentScrollY - lastScrollY.current;

        if (Math.abs(diff) < 3) return; 

        // Agora, usamos a ref sincronizada, que é um number
        const isHeaderCurrentlyVisible = headerTranslateYValue.current >= 0;
        
        const isScrollingDown = diff > 0;

        // 2. Condição para ESCONDER o Header
        // Esconde se estiver rolando para baixo E o header estiver visível E a rolagem já saiu da área superior
        if (isScrollingDown && currentScrollY > HEADER_HEIGHT && isHeaderCurrentlyVisible) {
            Animated.timing(headerTranslateY, {
                toValue: -HEADER_HEIGHT, // Posição totalmente escondida
                duration: 200, 
                useNativeDriver: Platform.OS !== 'web',
            }).start();
        }
        
        // 3. Condição para MOSTRAR o Header
        // Mostra se estiver rolando para cima
        else if (diff < 0) {
            Animated.timing(headerTranslateY, {
                toValue: 0, // Posição totalmente visível
                duration: 200, 
                useNativeDriver: Platform.OS !== 'web',
            }).start();
        }

        // 4. Atualiza a última posição de rolagem
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