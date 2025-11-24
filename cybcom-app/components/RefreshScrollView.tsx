import React, { useState, useCallback } from "react";
import type { ScrollViewProps } from "react-native";
import { ScrollView } from "@/components/ui/scroll-view";
import { RefreshControl } from "@/components/ui/refresh-control";
import { useColorScheme } from "nativewind";

type RefreshScrollViewProps = {
  children: React.ReactNode;
  onRefresh?: () => Promise<void>; // Opcional, para telas que não precisam de refresh
  scrollViewProps?: ScrollViewProps;
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
    <ScrollView
      {...scrollViewProps}
      className={`flex-1 ${bgColor}`} // Aplica a cor de fundo aqui
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
    </ScrollView>
  );
}