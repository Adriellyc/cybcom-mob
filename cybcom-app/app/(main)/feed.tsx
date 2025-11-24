import React, { useState, useRef } from 'react';
import { 
  View, 
  Animated, 
  NativeSyntheticEvent, 
  NativeScrollEvent 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Componentes do Projeto
import { TopHeader } from '@/components/TopHeader';
import { BottomNav } from '@/components/BottomNav';
import { RefreshScrollView } from '@/components/RefreshScrollView';
import { StatusBarBlur } from '@/components/StatusBarBlur';

// UI Components (Gluestack/NativeWind)
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
// CORREÇÃO AQUI: Trocamos HeartIcon por FavouriteIcon
import { Icon, ThreeDotsIcon, FavouriteIcon, MessageCircleIcon, ShareIcon } from '@/components/ui/icon';

export default function FeedScreen() {
  const [activeTab, setActiveTab] = useState<'forYou' | 'following'>('forYou');
  
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const isHeaderHidden = useRef(false);
  
  const insets = useSafeAreaInsets();
  const HEADER_HEIGHT = 120;
  const FULL_HEADER_HEIGHT = HEADER_HEIGHT + insets.top;
  const SCROLL_THRESHOLD = 5;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const diff = currentScrollY - lastScrollY.current;

    if (Math.abs(diff) < SCROLL_THRESHOLD) return;

    const isScrollingDown = diff > 0;
    const isAtTop = currentScrollY <= HEADER_HEIGHT;

    if (isAtTop) {
      if (isHeaderHidden.current) {
        Animated.timing(headerTranslateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
        isHeaderHidden.current = false;
      }
    } else if (isScrollingDown && !isHeaderHidden.current) {
      Animated.timing(headerTranslateY, {
        toValue: -FULL_HEADER_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
      isHeaderHidden.current = true;
    } else if (!isScrollingDown && isHeaderHidden.current) {
      Animated.timing(headerTranslateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
      isHeaderHidden.current = false;
    }

    lastScrollY.current = currentScrollY;
  };

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
      <StatusBarBlur />
      
      <TopHeader 
        activeTab={activeTab} 
        onChangeTab={setActiveTab} 
        headerTranslateY={headerTranslateY} 
      />

      <RefreshScrollView
        onRefresh={onScrollRefresh}
        scrollViewProps={{
          onScroll: handleScroll,
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
              <Box key={i} className="mb-1 border-b border-outline-800 py-3 px-4">
                <HStack space="md" className="items-start">
                   <Avatar size="sm" className="bg-primary-600">
                    <AvatarFallbackText>U{i}</AvatarFallbackText>
                    <AvatarImage 
                      source={{ uri: `https://i.pravatar.cc/150?u=${i}` }} 
                    />
                  </Avatar>
                  
                  <VStack className="flex-1">
                    <HStack className="justify-between items-center">
                        <HStack space="xs" className="items-center">
                            <Text className="text-white font-bold text-base">User {i + 1}</Text>
                            <Text className="text-typography-400 text-sm">@user_{i + 1} · 2h</Text>
                        </HStack>
                        <Icon as={ThreeDotsIcon} className="text-typography-400" size="sm" />
                    </HStack>

                    <Text className="text-white text-base mt-1 mb-2 leading-6">
                      Este é um exemplo de post número {i + 1}. O comportamento de scroll deste feed deve esconder o header ao descer e mostrar ao subir.
                    </Text>

                    <HStack className="justify-between mt-2 pr-8">
                        <HStack space="xs" className="items-center">
                            <Icon as={MessageCircleIcon} className="text-typography-400" size="sm" />
                            <Text className="text-typography-400 text-xs">12</Text>
                        </HStack>
                        <HStack space="xs" className="items-center">
                             <Icon as={ShareIcon} className="text-typography-400" size="sm" />
                             <Text className="text-typography-400 text-xs">5</Text>
                        </HStack>
                        <HStack space="xs" className="items-center">
                            {/* CORREÇÃO AQUI: Usando FavouriteIcon */}
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