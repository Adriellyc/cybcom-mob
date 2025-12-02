import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { TopHeader } from '@/components/TopHeader';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { NotificationItem } from '@/components/NotificationItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { router } from 'expo-router';
import { MOCK_NOTIFICATIONS } from '@/utils/notificationsData';

export default function NotificationScreen() {
    const insets = useSafeAreaInsets();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

    const handleMarkAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, isRead: true } : item
            )
        );
    };

    const handleNotificationPress = (item: typeof MOCK_NOTIFICATIONS[0]) => {
        handleMarkAsRead(item.id);
        // Navigate to details screen passing params
        router.push({
            pathname: '/notification/[id]',
            params: {
                id: item.id,
                title: item.title,
                description: item.description,
                date: item.date,
                avatarUrl: item.avatarUrl,
            }
        });
    };

    return (
        <View className="flex-1 bg-slate-50 dark:bg-black">
            <TopHeader>
                <Text className="text-lg font-bold text-slate-900 dark:text-white">
                    Notificações
                </Text>
            </TopHeader>

            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    paddingTop: 60 + insets.top, // Space for header
                    paddingBottom: 20,
                }}
                renderItem={({ item }) => (
                    <NotificationItem
                        avatarUrl={item.avatarUrl}
                        title={item.title}
                        description={item.description}
                        date={item.date}
                        isRead={item.isRead}
                        onPress={() => handleNotificationPress(item)}
                    />
                )}
                ListEmptyComponent={
                    <Box className="flex-1 items-center justify-center pt-20">
                        <Text className="text-slate-500 dark:text-slate-400">
                            Nenhuma notificação no momento.
                        </Text>
                    </Box>
                }
            />
        </View>
    );
}
