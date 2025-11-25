import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';

// Componentes
import { TopHeader } from '@/components/TopHeader'; // Importando o Header Universal
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
  const HEADER_HEIGHT = 88; // 44 (Topo) + 44 (Abas)
  const FULL_HEADER_HEIGHT = HEADER_HEIGHT + insets.top;

  // --- Lógica de Animação ---
  const headerTranslateY = useSharedValue(0);
  const lastScrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      const diff = currentScrollY - lastScrollY.value;

      if (currentScrollY <= 0) {
        headerTranslateY.value = 0;
      } else {
        const newTranslateY = headerTranslateY.value - diff;
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

  // Helper de estilos para as abas
  const getTextStyle = (isActive: boolean): TextStyle => ({
    color: isActive ? '#FFFFFF' : '#71767B', 
    fontWeight: isActive ? '700' : '500',
    fontSize: 15,
  });

  return (
    <View className="flex-1 bg-black">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBarBlur />
      
      {/* --- TOP HEADER UNIVERSAL --- */}
      <TopHeader 
        headerTranslateY={headerTranslateY}
        fullHeight={FULL_HEADER_HEIGHT}
        // 1. Passamos as Abas como conteúdo inferior
        bottomContent={
          <View style={styles.tabsRow}>
             {/* Aba Para Você */}
             <TouchableOpacity
               onPress={() => setActiveTab('forYou')}
               style={styles.tab}
               activeOpacity={0.7}
             >
               <View style={styles.tabContent}>
                 <Text style={getTextStyle(activeTab === 'forYou')}>Para você</Text>
                 {activeTab === 'forYou' && <View style={styles.indicator} />}
               </View>
             </TouchableOpacity>

             {/* Aba Seguindo */}
             <TouchableOpacity
               onPress={() => setActiveTab('following')}
               style={styles.tab}
               activeOpacity={0.7}
             >
               <View style={styles.tabContent}>
                 <Text style={getTextStyle(activeTab === 'following')}>Seguindo</Text>
                 {activeTab === 'following' && <View style={styles.indicator} />}
               </View>
             </TouchableOpacity>
          </View>
        }
      >
        {/* 2. Passamos o Logo como conteúdo central (children) */}
        <Image 
           source={require('../../assets/images/logo-cybcom-sem-fundoPNG.png')} 
           style={{ width: 28, height: 28 }}
           resizeMode="contain"
        />
      </TopHeader>

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
                      Post {i + 1}. Agora o TopHeader é universal e suas abas verdes (#64FFDA) estão perfeitas! 🚀
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

const styles = StyleSheet.create({
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
    backgroundColor: '#64FFDA', // Verde Neon
    borderRadius: 2, 
  }
});