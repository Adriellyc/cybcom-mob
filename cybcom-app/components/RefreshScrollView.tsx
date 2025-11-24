import React, { useState, useCallback } from "react";
// Importamos 'Animated' para criar o Animated.ScrollView
import { Animated, ScrollViewProps } from "react-native";
// Importamos o componente base para criar o wrapper animado
import { ScrollView as UIScrollView } from "@/components/ui/scroll-view";
import { RefreshControl } from "@/components/ui/refresh-control";
import { useColorScheme } from "nativewind";

// Criamos o componente Animated.ScrollView a partir do seu ScrollView base.
const AnimatedScrollView = Animated.createAnimatedComponent(UIScrollView);

type RefreshScrollViewProps = {
  children: React.ReactNode;
  onRefresh?: () => Promise<void>; // Opcional, para telas que não precisam de refresh
  scrollViewProps?: ScrollViewProps; // O tipo ScrollViewProps já é suficiente
};

// Componente para garantir Scroll, Pull-to-Refresh e Background
export function RefreshScrollView({
  children,
  onRefresh,
  scrollViewProps,
}: RefreshScrollViewProps) {
  
  const [refreshing, setRefreshing] = useState(false);
  const { colorScheme } = useColorScheme();
  
  // Cores do projeto de referência: Fundo claro no Light, Fundo escuro no Dark.
  const tintColor = colorScheme === "dark" ? "#2563EB" : "#1D4ED8"; // Azul Forte
  const bgColor = colorScheme === "dark" ? "#0F172A" : "#F8FAFC"; // slate-900 / white-smoke

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
    // Usamos o AnimatedScrollView para que a prop onScroll com Animated.event funcione corretamente
    <AnimatedScrollView
      {...scrollViewProps}
      className={`flex-1 ${bgColor}`}
      refreshControl={
        onRefresh ? ( // Apenas se onRefresh for fornecido
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={tintColor}
            colors={[tintColor]}
          />
        ) : undefined
      }
    >
      {children}
    </AnimatedScrollView>
  );
}