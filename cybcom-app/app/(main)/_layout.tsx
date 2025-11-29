import { SideMenu } from '@/components/SideMenu'; // Certifique-se que este caminho está correto
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { useWindowDimensions } from 'react-native';

export default function MainLayout() {
  const dimensions = useWindowDimensions();

  return (
    <Drawer
      // Define o seu componente SideMenu como o conteúdo da gaveta
      drawerContent={(props) => <SideMenu {...props} />}
      screenOptions={{
        // Esconde o header padrão do Drawer (pois já temos o TopHeader)
        headerShown: false,
        // Configurações visuais da gaveta
        drawerStyle: {
          backgroundColor: '#000', // Fundo preto
          width: dimensions.width * 0.85, // Ocupa 85% da tela
        },
        drawerType: 'front', // A gaveta desliza por cima da tela
        overlayColor: 'rgba(0,0,0,0.7)', // Escurece o fundo
      }}
    >
      {/* Aqui definimos as rotas que ficam DENTRO da gaveta.
        O 'feed' é a tela principal.
      */}
      <Drawer.Screen 
        name="feed" 
        options={{
          drawerLabel: 'Início',
          title: 'Feed',
        }} 
      />
    </Drawer>
  );
}