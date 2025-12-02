import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Componentes
import { BottomNav } from '@/components/BottomNav';
import { StatusBarBlur } from '@/components/StatusBarBlur';
import { TopHeader } from '@/components/TopHeader';

// UI Components
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export default function AboutScreen() {

  const insets = useSafeAreaInsets();
  const HEADER_HEIGHT_BASE = 44 + 5 + insets.top;
  const EXTRA_SPACING = 20;
  const HEADER_OFFSET = HEADER_HEIGHT_BASE + EXTRA_SPACING;

  // 🔹 Componente de título com traço do tamanho do texto
  const SectionTitle = ({ children }: { children: string }) => (
    <VStack space="xs" className="mt-2">
      <View>
        <Text className="text-lg font-bold text-black dark:text-white tracking-wide">
          {children}
        </Text>

        {/* Traço verde acompanhando a largura do texto */}
        <View
          style={{
            height: 3,
            backgroundColor: '#64FFDA',
            borderRadius: 2,
            marginTop: 3,
          }}
        />
      </View>
    </VStack>
  );

  // 🔹 Item da lista de tecnologias
  const TechnologyItem = ({ label, description }: { label: string, description: string }) => (
    <HStack space="sm" className="items-start py-1">
      <View style={styles.listMarker} /> 
      <View className='flex-1'>
        <Text className="text-xs text-gray-700 dark:text-gray-300 leading-4">
          <Text className="font-bold text-black dark:text-white">{label}:</Text> {description}
        </Text>
      </View>
    </HStack>
  );

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBarBlur />

      <TopHeader>
        <View className='flex flex-row justify-center items-center w-full'>
          <Text className='font-bold text-lg text-black dark:text-white'>
            Sobre o CybCom
          </Text>
        </View>
      </TopHeader>

      <ScrollView
        contentContainerStyle={{ 
          paddingTop: HEADER_OFFSET,
          paddingBottom: insets.bottom + 60,
        }}
        className="flex-1 px-4"
      >
        <VStack space="md" className="p-4 rounded-lg bg-gray-50 dark:bg-slate-900 shadow-md">
          
          {/* ----------------- INFORMAÇÕES BÁSICAS ----------------- */}
          <Text className="text-xl font-extrabold text-[#64FFDA]">CybCom Mobile</Text>
          <Text className="text-sm text-gray-700 dark:text-gray-300">
            Versão: 1.0.0 (Build 20251125)
          </Text>

          <Divider className="my-2" />

          {/* ----------------- O QUE É O CYBCOM ----------------- */}
          <SectionTitle>O que é o CybCom?</SectionTitle>

          <Text className="text-sm text-gray-700 dark:text-gray-300 leading-5">
            CybCom é uma plataforma social focada em comunidade, conhecimento e comunicação. Nosso objetivo é conectar 
            profissionais e entusiastas, criando um espaço seguro e intuitivo para o compartilhamento de informações 
            sobre cibersegurança e tecnologia. Nosso foco é construir um ambiente colaborativo para o futuro da segurança digital.
          </Text>

          <Divider className="my-4" />

          {/* ----------------- TECNOLOGIAS CHAVE ----------------- */}
          <SectionTitle>Tecnologias-Chave</SectionTitle>

          <VStack space="sm">
            <TechnologyItem 
              label="Frontend"
              description="React Native para uma interface mobile nativa e de alto desempenho."
            />
            <TechnologyItem 
              label="Estrutura"
              description="Expo, otimizando o desenvolvimento e facilitando o processo de build."
            />
            <TechnologyItem 
              label="Estilização"
              description="NativeWind e Tailwind CSS, garantindo temas Dark/Light e responsividade consistente."
            />
            <TechnologyItem 
              label="Roteamento"
              description="Expo Router, utilizando um sistema de navegação robusto baseado em arquivos."
            />
          </VStack>

          <Divider className="my-4" />

          {/* ----------------- DESENVOLVIMENTO ----------------- */}
          <SectionTitle>Desenvolvimento</SectionTitle>
          
          <Text className="text-sm text-gray-700 dark:text-gray-300 leading-5">
            O CybCom Mobile é um projeto em constante evolução, impulsionado por uma equipe dedicada de desenvolvedores. 
            Nosso foco é aprimorar continuamente a experiência do usuário e implementar as mais recentes inovações 
            em tecnologia, garantindo um produto final de alta qualidade e escalabilidade.
          </Text>

          <Text className="text-sm text-blue-600 dark:text-blue-400 mt-6">
            © 2025 CybCom Developers. Todos os direitos reservados.
          </Text>

        </VStack>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  listMarker: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#64FFDA',
    marginTop: 6,
  },
});