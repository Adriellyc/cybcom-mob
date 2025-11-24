import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

// 1. Importações Essenciais do Gluestack e Estilos
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  // Carregamento de fontes (pode comentar se ainda não tiver o arquivo)
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      // Ocultar splash screen se necessário
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    // 2. Envolvemos tudo no GluestackUIProvider para os estilos funcionarem
    <GluestackUIProvider mode="dark">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          {/* A tela de Login (index) precisa estar aqui explicitamente */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          
          {/* A pasta (main) onde está o feed */}
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
          
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}