import React from "react";
import { View, Pressable } from "react-native";
import { useColorScheme } from "nativewind";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";

type HeaderTab = "forYou" | "following";

type TopHeaderProps = {
  activeTab: HeaderTab;
  onChangeTab: (tab: HeaderTab) => void;
};

type TabButtonProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

const TabButton = ({ label, isActive, onPress }: TabButtonProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const activeText = isDark ? "text-white" : "text-slate-900";
  const inactiveText = isDark ? "text-slate-400" : "text-slate-500";
  const activeIndicator = isDark ? "bg-white" : "bg-slate-900";

  return (
    <Pressable
      onPress={onPress}
      style={{ flex: 1 }}
    >
      <Box className="items-center">
        <Text
          className={`
            text-base
            ${isActive ? activeText : inactiveText}
            ${isActive ? "font-bold" : "font-semibold"}
          `}
        >
          {label}
        </Text>

        {/* Linha embaixo da aba ativa, igual o X/Twitter */}
        <View
          className={`
            h-0.5 mt-1 rounded-full w-10
            ${isActive ? activeIndicator : "bg-transparent"}
          `}
        />
      </Box>
    </Pressable>
  );
};

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeTab,
  onChangeTab,
}) => {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation();
  const isDark = colorScheme === "dark";

  const bgColor = isDark ? "bg-black" : "bg-white";
  const iconBg = isDark ? "bg-slate-800" : "bg-slate-200";
  const iconBorder = isDark ? "border-slate-600" : "border-slate-300";
  const logoColor = isDark ? "text-white" : "text-slate-900";

  const handleOpenDrawer = () => {
    // Abre o SideMenu (Drawer)
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View className={`${bgColor} pt-3 pb-2`}>
      {/* Linha principal do header: avatar + logo central */}
      <View className="flex-row items-center justify-between px-4 mb-3">
        {/* Avatar genérico que abre o drawer */}
        <Pressable onPress={handleOpenDrawer}>
          <Box
            className={`
              w-9 h-9 rounded-full 
              ${iconBg} ${iconBorder} border
              items-center justify-center
            `}
          >
            {/* Ícone genérico de usuário (pode trocar por imagem depois) */}
            <Text className="text-xs font-semibold text-slate-500">
              U
            </Text>
          </Box>
        </Pressable>

        {/* Logo central (pode trocar por SVG/Imagem depois) */}
        <Box className="items-center justify-center">
          <Text className={`text-xl font-extrabold ${logoColor}`}>
            X
          </Text>
        </Box>

        {/* Espaço à direita para equilibrar o layout */}
        <View style={{ width: 36 }} />
      </View>

      {/* Abas [translate:Para você] / [translate:Seguindo] */}
      <View className="flex-row px-8">
        <TabButton
          label="Para você"
          isActive={activeTab === "forYou"}
          onPress={() => onChangeTab("forYou")}
        />
        <TabButton
          label="Seguindo"
          isActive={activeTab === "following"}
          onPress={() => onChangeTab("following")}
        />
      </View>
    </View>
  );
};