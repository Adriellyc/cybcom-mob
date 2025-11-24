import React, { useState, useCallback } from "react";
import { RefreshControl, ScrollViewProps } from "react-native";
import Animated from "react-native-reanimated";

type RefreshScrollViewProps = {
  children: React.ReactNode;
  onRefresh?: () => Promise<void>;
  scrollViewProps?: ScrollViewProps & { onScroll?: any; scrollEventThrottle?: number }; // Tipagem flexível para o Reanimated
};

export function RefreshScrollView({
  children,
  onRefresh,
  scrollViewProps,
}: RefreshScrollViewProps) {
  const [refreshing, setRefreshing] = useState(false);

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
      // Garante flex: 1 e fundo preto, mesclando com estilos externos se houver
      style={[{ flex: 1, backgroundColor: '#000' }, scrollViewProps?.style]}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#fff"
            colors={["#fff"]}
            progressBackgroundColor="#1a1a1a"
          />
        ) : undefined
      }
    >
      {children}
    </Animated.ScrollView>
  );
}