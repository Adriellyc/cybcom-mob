import React, { useState, useCallback } from "react";
import { RefreshControl, ScrollViewProps } from "react-native";
import Animated from "react-native-reanimated";
import { useColorScheme } from "nativewind"; // Importar hook do tema

type RefreshScrollViewProps = {
  children: React.ReactNode;
  onRefresh?: () => Promise<void>;
  scrollViewProps?: ScrollViewProps & { onScroll?: any; scrollEventThrottle?: number }; 
};

export function RefreshScrollView({
  children,
  onRefresh,
  scrollViewProps,
}: RefreshScrollViewProps) {
  const [refreshing, setRefreshing] = useState(false);
  const { colorScheme } = useColorScheme(); // Detectar tema
  const isDark = colorScheme === "dark";

  const handleRefresh = useCallback(async () => {
    if (onRefresh) {
      setRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error("Falha ao atualizar:", error);
      } finally {
        setRefreshing(false);
      }
    }
  }, [onRefresh]);

  return (
    <Animated.ScrollView
      {...scrollViewProps}
      // CORREÇÃO: Fundo dinâmico (Branco no claro, Preto no escuro)
      style={[
        { flex: 1, backgroundColor: isDark ? '#000' : '#fff' }, 
        scrollViewProps?.style
      ]}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            // Cores do spinner adaptáveis
            tintColor={isDark ? "#fff" : "#000"}
            colors={[isDark ? "#fff" : "#000"]}
            progressBackgroundColor={isDark ? "#1a1a1a" : "#f1f1f1"}
          />
        ) : undefined
      }
    >
      {children}
    </Animated.ScrollView>
  );
}