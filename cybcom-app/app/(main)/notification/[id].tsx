import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallbackText } from '@/components/ui/avatar';
import { useColorScheme } from 'nativewind';
import { Eye, UserPlus, Share2, ArrowLeft } from 'lucide-react-native';
import { TopHeader } from '@/components/TopHeader';
import { MOCK_NOTIFICATIONS } from '@/utils/notificationsData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NotificationDetailsScreen() {
    const params = useLocalSearchParams();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const insets = useSafeAreaInsets();

    // Params come as strings, so we might need to parse or use directly if they are simple strings
    let { id, title, description, date, avatarUrl } = params;

    // Fallback if params are missing (e.g. deep link)
    if (!title && id) {
        const item = MOCK_NOTIFICATIONS.find((n) => n.id === id);
        if (item) {
            title = item.title;
            description = item.description;
            date = item.date;
            avatarUrl = item.avatarUrl;
        }
    }

    const handleBack = () => {
        router.back();
    };

    return (
        <View className="flex-1 bg-slate-50 dark:bg-black">
            <TopHeader
                rightAction={null} // No specific right action needed
            >
                <Text className="text-lg font-bold text-slate-900 dark:text-white">
                    Detalhes
                </Text>
            </TopHeader>

            {/* Custom Back Button overlaying or integrated if TopHeader allowed left action customization easily. 
          Since TopHeader seems to have fixed left side (Avatar/Drawer), we might want to override or just place a back button below.
          However, usually a details screen should have a back button instead of the drawer menu.
          For now, let's put a back button in the content area or modify TopHeader usage.
          Actually, TopHeader has `children` for center content. 
          Let's try to use a custom header or just content below TopHeader.
      */}

            <ScrollView
                contentContainerStyle={{
                    paddingTop: 60 + insets.top,
                    paddingHorizontal: 16,
                    paddingBottom: 40
                }}
            >
                <TouchableOpacity onPress={handleBack} className="mb-6 flex-row items-center">
                    <ArrowLeft color={isDark ? 'white' : 'black'} size={24} />
                    <Text className="ml-2 text-base font-medium text-slate-900 dark:text-white">Voltar</Text>
                </TouchableOpacity>

                <Box className="flex-row items-center mb-6">
                    <Avatar size="xl" className="bg-gray-700 mr-4">
                        <AvatarFallbackText>{(title as string)?.charAt(0)}</AvatarFallbackText>
                        <AvatarImage source={{ uri: avatarUrl as string }} alt="Avatar" />
                    </Avatar>
                    <Box className="flex-1">
                        <Text className="text-2xl font-bold text-slate-900 dark:text-white">
                            {title}
                        </Text>
                        <Text className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {date}
                        </Text>
                    </Box>
                </Box>

                <Box className="mb-8">
                    <Text className="text-lg text-slate-700 dark:text-slate-300 leading-7">
                        {description}
                    </Text>
                    <Box className="mt-6 p-6 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                        <Text className="text-base italic text-slate-600 dark:text-slate-400">
                            "Este é o conteúdo completo da notificação. Aqui você teria acesso a todos os detalhes do evento, postagem ou interação que gerou este alerta. O design foca na leitura e na clareza das informações."
                        </Text>
                    </Box>
                </Box>

                <Box className="gap-4">
                    <Button
                        action="primary"
                        className="w-full bg-blue-600 h-12"
                        onPress={() => console.log('Ver publicação')}
                    >
                        <Eye color="white" size={20} style={{ marginRight: 8 }} />
                        <ButtonText className="text-white font-bold text-lg">Ver Publicação</ButtonText>
                    </Button>

                    <Button
                        action="secondary"
                        variant="outline"
                        className="w-full border-slate-300 dark:border-slate-700 h-12"
                        onPress={() => console.log('Seguir usuário')}
                    >
                        <UserPlus color={isDark ? 'white' : 'black'} size={20} style={{ marginRight: 8 }} />
                        <ButtonText className="text-slate-900 dark:text-white font-bold text-lg">Seguir Usuário</ButtonText>
                    </Button>

                    <Button
                        action="secondary"
                        variant="outline"
                        className="w-full border-slate-300 dark:border-slate-700 h-12"
                        onPress={() => console.log('Compartilhar')}
                    >
                        <Share2 color={isDark ? 'white' : 'black'} size={20} style={{ marginRight: 8 }} />
                        <ButtonText className="text-slate-900 dark:text-white font-bold text-lg">Compartilhar</ButtonText>
                    </Button>
                </Box>
            </ScrollView>
        </View>
    );
}
