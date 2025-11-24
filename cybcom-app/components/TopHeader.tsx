import React from 'react';
import { View, Pressable, Animated, Platform } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { BlurView } from 'expo-blur'; 
import { useColorScheme } from 'nativewind';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { SafeAreaView } from '@/components/ui/safe-area-view'; 

type HeaderTab = 'forYou' | 'following';

type TopHeaderProps = {
  activeTab: HeaderTab;
  onChangeTab: (tab: HeaderTab) => void;
  scrollY: Animated.Value; 
  headerTranslateY: Animated.Value; 
};

// Definimos a interface de props para TabButton para clareza
type TabButtonProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

// Componente TabButton: Definido ANTES de ser usado
const TabButton = ({ label, isActive, onPress }: TabButtonProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const activeText = isDark ? 'text-white' : 'text-slate-900';
  const inactiveText = isDark ? 'text-slate-400' : 'text-slate-500';
  const activeIndicator = isDark ? 'bg-white' : 'bg-slate-900';

  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      <Box className="items-center">
        <Text
          className={`
            text-base
            ${isActive ? activeText : inactiveText}
            ${isActive ? 'font-bold' : 'font-semibold'}
          `}
        >
          {label}
        </Text>

        <View
          className={`
            h-0.5 mt-1 rounded-full w-10
            ${isActive ? activeIndicator : 'bg-transparent'}
          `}
        />
      </Box>
    </Pressable>
  );
};


export const TopHeader: React.FC<TopHeaderProps> = ({
  activeTab,
  onChangeTab,
  scrollY,
  headerTranslateY,
}) => {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation();
  const isDark = colorScheme === 'dark';

  const SCROLL_THRESHOLD = 80; 

  const blurAndSolidOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_THRESHOLD], 
    outputRange: [0.0, 1.0], 
    extrapolate: 'clamp',
  });
  
  const headerColor = isDark ? '#000000' : '#FFFFFF';
  const iconBg = isDark ? 'bg-slate-800' : 'bg-slate-200';
  const iconBorder = isDark ? 'border-slate-600' : 'border-slate-300';
  const logoColor = isDark ? 'text-white' : 'text-slate-900';

  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        transform: [{ translateY: headerTranslateY }], 
      }}
    >
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: headerColor,
          opacity: blurAndSolidOpacity,
        }}
      >
        {Platform.OS !== 'web' && (
          <BlurView
            tint={isDark ? 'dark' : 'light'}
            intensity={20} 
            style={{ flex: 1 }}
          />
        )}
      </Animated.View>

      <SafeAreaView edges={['top']} className="bg-transparent">
        <View className="pt-3 pb-2">
          {/* Linha principal do header: avatar + logo central */}
          <View className="flex-row items-center justify-between px-4 mb-3">
            <Pressable onPress={handleOpenDrawer}>
              <Box
                className={`
                  w-9 h-9 rounded-full 
                  ${iconBg} ${iconBorder} border
                  items-center justify-center
                `}
              >
                <Text className="text-xs font-semibold text-slate-500">U</Text>
              </Box>
            </Pressable>

            <Box className="items-center justify-center">
              <Text className={`text-xl font-extrabold ${logoColor}`}>X</Text>
            </Box>

            <View style={{ width: 36 }} />
          </View>

          {/* Abas [Para você] / [Seguindo] */}
          <View className="flex-row px-8">
            <TabButton // Componente utilizado aqui
              label="Para você"
              isActive={activeTab === 'forYou'}
              onPress={() => onChangeTab('forYou')}
            />
            <TabButton // Componente utilizado aqui
              label="Seguindo"
              isActive={activeTab === 'following'}
              onPress={() => onChangeTab('following')}
            />
          </View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};