import React from "react";
import { View, Image, Pressable, Alert } from "react-native";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { router, usePathname } from "expo-router";
import { useColorScheme } from "nativewind";
import { useAuthStore } from "@/app/store/useAuthStore";
import { ThemeSwitcher } from './ThemeSwitcher';

import {
  User,
  Bell,
  Info,
  LogOut,
  Shield,
  Code,
  MessageSquarePlus,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react-native";

// Itens de navegação (rotas na pasta app/(app)/)
const navItems = [
  { label: "Feed", path: "/(main)/feed", icon: Code },
  { label: "Novo Post", path: "/(main)/newpost", icon: MessageSquarePlus },
  { label: "Perfil", path: "/(main)/profile", icon: User },
  { label: "Notificações", path: "/(main)/notification", icon: Bell },
  { label: "Loja (Cursos)", path: "/(main)/store", icon: ShoppingBag },
  { label: "Sobre", path: "/(main)/about", icon: Info },
  { label: "Admin (Dashboard)", path: "/(main)/admin", icon: Shield },
] as const;

type ValidNavPath = (typeof navItems)[number]["path"];

type DrawerItemProps = {
  label: string;
  path: ValidNavPath;
  icon: LucideIcon;
  onPress: () => void;
};

const DrawerItem = ({ label, path, icon: Icon, onPress }: DrawerItemProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const pathname = usePathname();

  // Ajuste para grupos do Expo Router ((app) -> /app)
  const isActive = (checkPath: string) =>
    pathname.startsWith(checkPath.replace("/(app)", "/app"));

  const active = isActive(path);

  const activeBg = isDark ? "bg-blue-600" : "bg-blue-100";
  const activeText = isDark ? "text-white" : "text-blue-600";
  const inactiveText = isDark ? "text-slate-300" : "text-slate-700";
  const inactiveIcon = isDark ? "#94a3b8" : "#475569";
  const activeIcon = isDark ? "#ffffff" : "#2563EB";

  return (
    <Pressable onPress={onPress}>
      <Box
        className={`
          flex-row items-center w-full px-3 py-3 rounded-lg mb-1
          ${active ? activeBg : "bg-transparent"}
        `}
      >
        <Icon color={active ? activeIcon : inactiveIcon} size={20} />
        <Text
          className={`
            ml-4 text-base
            ${active ? activeText : inactiveText}
            ${active ? "font-bold" : "font-medium"}
          `}
        >
          {label}
        </Text>
      </Box>
    </Pressable>
  );
};

export default function SideMenu(props: DrawerContentComponentProps) {
  const { navigation } = props;
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // Pega usuário e signOut do seu useAuthStore
  const { user, signOut } = useAuthStore();

  const bgColor = isDark ? "#1e293b" : "#f1f5f9";
  const inactiveIcon = isDark ? "#94a3b8" : "#475569";

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: () => {
            // Chama signOut do store e volta para a rota pública
            signOut();
            router.replace("/");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        backgroundColor: bgColor,
      }}
    >
      <View style={{ flex: 1, padding: 16 }}>
        {/* --- HEADER DO MENU --- */}
        <Box className="flex-row items-center px-3 mb-8">
          <Image
            source={{ uri: "https://github.com/ewayrton.png" }}//trocar pela imagem do usuário
            className="w-12 h-12 rounded-full border-2 border-blue-400"
          />
          <Box className="ml-3">
            <Text className="text-lg font-bold text-black dark:text-white">
              {user?.name ?? "Usuário CybCom"}
            </Text>
            <Text className="text-sm text-slate-500 dark:text-slate-400">
              {user?.email ?? "Ver Perfil"}
            </Text>
          </Box>
        </Box>

        {/* --- ITENS DE NAVEGAÇÃO --- */}
        <View style={{ flex: 1 }}>
          {navItems.map((item) => (
            <DrawerItem
              key={item.path}
              label={item.label}
              path={item.path}
              icon={item.icon}
              onPress={() => {
                // Manter o 'as any' para o erro de tipagem do Expo Router
                router.push(item.path as any);
                navigation.closeDrawer();
              }}
            />
          ))}
        </View>

        <ThemeSwitcher />

        {/* --- RODAPÉ / AÇÕES --- */}
        <View>
          <Button
            className="w-full mb-2"
            variant="outline"
            action="secondary"
            onPress={handleLogout}
          >
            <LogOut color={"#EF4444"} size={18} style={{ marginRight: 8 }} />
            <ButtonText className="text-red-500 dark:text-red-400">
              Sair
            </ButtonText>

          </Button>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
export { SideMenu };