import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Avatar, AvatarImage, AvatarFallbackText } from '@/components/ui/avatar';
import { useColorScheme } from 'nativewind';
import { Circle } from 'lucide-react-native';

interface NotificationItemProps {
    avatarUrl: string;
    title: string;
    description: string;
    date: string;
    isRead: boolean;
    onPress: () => void;
}

export function NotificationItem({
    avatarUrl,
    title,
    description,
    date,
    isRead,
    onPress,
}: NotificationItemProps) {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <Box
                className={`flex-row items-start p-4 border-b ${isDark ? 'border-slate-800 bg-black' : 'border-slate-200 bg-white'
                    } ${!isRead ? (isDark ? 'bg-slate-900' : 'bg-blue-50') : ''}`}
            >
                {/* Avatar */}
                <View className="mr-4 relative">
                    <Avatar size="md" className="bg-gray-700">
                        <AvatarFallbackText>{title.charAt(0)}</AvatarFallbackText>
                        <AvatarImage source={{ uri: avatarUrl }} alt="Avatar" />
                    </Avatar>
                    {!isRead && (
                        <View className="absolute top-0 right-0 bg-blue-500 w-3 h-3 rounded-full border-2 border-white dark:border-black" />
                    )}
                </View>

                {/* Content */}
                <View className="flex-1">
                    <View className="flex-row justify-between items-start mb-1">
                        <Text className={`text-sm font-bold flex-1 mr-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {title}
                        </Text>
                        <Text className="text-xs text-slate-500 dark:text-slate-400">
                            {date}
                        </Text>
                    </View>

                    <Text
                        className={`text-sm leading-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
                        numberOfLines={2}
                    >
                        {description}
                    </Text>
                </View>
            </Box>
        </TouchableOpacity>
    );
}
