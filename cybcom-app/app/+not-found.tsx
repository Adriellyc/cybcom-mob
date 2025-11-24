import { Stack, Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/ui/text'; // Usando seu componente de texto
import { Button, ButtonText } from '@/components/ui/button'; // Usando seus botões
import { Icon, AlertCircleIcon } from '@/components/ui/icon'; // Ícone de alerta

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!', headerStyle: { backgroundColor: '#000' }, headerTintColor: '#fff' }} />
      <View style={styles.container}>
        <Icon as={AlertCircleIcon} size="xl" className="text-primary-500 mb-4" />
        
        <Text className="text-white text-2xl font-bold mb-2">Página não encontrada</Text>
        <Text className="text-typography-400 text-center mb-8 px-8">
          A tela que você está procurando parece ter se perdido nas sombras.
        </Text>

        <Link href="/(main)/feed" asChild>
          <Button size="md" variant="solid" action="primary">
            <ButtonText>Voltar ao Feed</ButtonText>
          </Button>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
});