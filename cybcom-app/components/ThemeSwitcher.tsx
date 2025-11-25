import React from 'react';
import { Pressable, View } from 'react-native'; // Importe View se necessário
import { useColorScheme } from 'nativewind';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Moon, Sun, Monitor } from 'lucide-react-native';

export function ThemeSwitcher() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const options = [
    { value: 'light', label: 'Claro', icon: Sun },
    { value: 'dark', label: 'Escuro', icon: Moon },
    { value: 'system', label: 'Sistema', icon: Monitor },
  ] as const;

  return (
    <Box className="w-full mt-4 mb-6">
      <Text className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 px-3 uppercase">
        Aparência
      </Text>
      
      <HStack className="bg-slate-200 dark:bg-slate-800 rounded-lg p-1 mx-3">
        {options.map((option) => {
          const isActive = colorScheme === option.value;
          const Icon = option.icon;

          return (
            <Pressable
              key={option.value}
              onPress={() => setColorScheme(option.value)}
              style={{ flex: 1 }}
            >
              <Box
                // REMOVI O 'shadow-sm' DAQUI PARA EVITAR O ERRO
                className={`
                  flex-row items-center justify-center py-2 rounded-md
                  ${isActive ? 'bg-white dark:bg-slate-600' : 'bg-transparent'}
                `}
                // Se quiser sombra, use style direto:
                style={isActive ? { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 } : {}}
              >
                <Icon 
                  size={16} 
                  color={isActive ? (colorScheme === 'dark' ? '#FFF' : '#000') : '#94a3b8'} 
                />
                <Text 
                  className={`
                    ml-2 text-xs font-medium
                    ${isActive ? 'text-black dark:text-white' : 'text-slate-500 dark:text-slate-400'}
                  `}
                >
                  {option.label}
                </Text>
              </Box>
            </Pressable>
          );
        })}
      </HStack>
    </Box>
  );
}