import { Stack } from 'expo-router';
import React from 'react';

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        // Desativa cabeçalhos padrão para TODAS as telas desta pasta
        headerShown: false,
        // Garante fundo preto (como no design de referência) para transições suaves
        contentStyle: { backgroundColor: '#000' },
        // Animação padrão do iOS
        animation: 'default', 
      }}
    >
      <Stack.Screen name="feed" />
    </Stack>
  );
}