import React, { useState, useCallback } from "react";
import { ScrollView, ScrollViewProps, RefreshControl } from "react-native";
// Se não for usar o colorScheme para mais nada, pode remover o hook também
// import { useColorScheme } from "nativewind"; 

type RefreshScrollViewProps = {
  children: React.ReactNode;
  onRefresh?: () => Promise<void>;
  scrollViewProps?: ScrollViewProps;
};

export function RefreshScrollView({
  children,
  onRefresh,
  scrollViewProps,
}: RefreshScrollViewProps) {
  const [refreshing, setRefreshing] = useState(false);
  
  // Removi o hook useColorScheme e a const isDark pois estamos forçando o dark mode
  
  // Forçando estilo dark para imitar o app de referência
  const bgColor = "bg-black"; 

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
      className={`flex-1 ${bgColor}`}
      // Garante que o estilo passado via props tenha prioridade se existir
      style={[scrollViewProps?.style]} 
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#fff" // Branco para combinar com o fundo preto
            colors={["#fff"]}
            progressBackgroundColor="#1a1a1a"
          />
        ) : undefined
      }
    >
      {children}
    </ScrollView>
  );
}