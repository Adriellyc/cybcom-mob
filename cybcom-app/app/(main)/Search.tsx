import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Componentes
import { BottomNav } from '@/components/BottomNav';
import { RefreshScrollView } from '@/components/RefreshScrollView';
import { StatusBarBlur } from '@/components/StatusBarBlur';
import { TopHeader } from '@/components/TopHeader';

// UI Components
import { Box } from '@/components/ui/box';
import { Icon, SearchIcon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

export default function SearchScreen() {
  
  const insets = useSafeAreaInsets();
  const HEADER_HEIGHT = 44;
  const FULL_HEADER_HEIGHT = HEADER_HEIGHT + insets.top + 5;

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
        console.log('Refresh da busca concluído.');
        resolve();
      }, 1500);
    });
  };

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBarBlur />

      <TopHeader 
        headerTranslateY={headerTranslateY}
        fullHeight={FULL_HEADER_HEIGHT}
      >
        <View style={styles.searchInputContainer}>
          <Icon as={SearchIcon} className="text-typography-400 mr-2" size="sm" />
          <TextInput 
            placeholder="Buscar por usuários, posts ou tags"
            placeholderTextColor="#9ca3af"
            className="flex-1 text-black dark:text-white"
          />
        </View>
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
        <Box className="flex-1 min-h-screen p-4">

          {/* Título verde (fixo), mesmo tamanho, centralizado */}
          <Text
            style={{
              color: '#64FFDA',
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 12,
              textAlign: 'center',
            }}
          >
            Tendências para você
          </Text>

          {Array.from({ length: 15 }).map((_, i) => (
            <View key={i} className="py-3 border-b border-outline-100 dark:border-outline-800">
              <Text className="text-typography-500 dark:text-typography-400 text-sm">
                Entre os assuntos de {i < 5 ? 'Tecnologia' : 'Geral'}
              </Text>
              <Text className="text-black dark:text-white font-bold text-base mt-1">
                #TrendTopic{i + 1}
              </Text>
              <Text className="text-typography-500 dark:text-typography-400 text-sm mt-1">
                {i * 100} posts
              </Text>
            </View>
          ))}

        </Box>
      </RefreshScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'rgba(113, 118, 123, 0.15)',
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    height: 34,
    width: '80%',
    alignSelf: 'center',

    marginTop: 2,
  },
});