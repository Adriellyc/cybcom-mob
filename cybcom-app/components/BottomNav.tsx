import React from "react";
import { View, Pressable } from "react-native";
import { useColorScheme } from "nativewind";
import { router, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Home,
  Search,
  Plus, // Novo ícone para New Post
  Bell,
  Info, // Novo ícone para Sobre/About
  type LucideIcon,
} from "lucide-react-native";

// Atualizando os tipos das chaves de navegação
type TabKey = "home" | "search" | "new-post" | "notifications" | "about";

type TabItem = {
  key: TabKey;
  icon: LucideIcon;
  path: string;
};

const tabs: TabItem[] = [
  { key: "home",          icon: Home,      path: "/feed" },          // Feed
  { key: "search",        icon: Search,    path: "/search" },        // Busca
  { key: "new-post",      icon: Plus,      path: "/new-post" },      // Novo Post (Central)
  { key: "notifications", icon: Bell,      path: "/notification" },  // Notificações
  { key: "about",         icon: Info,      path: "/about" },         // Sobre
];

export function BottomNav() {
  const pathname = usePathname();
  const { colorScheme } = useColorScheme();
  const { bottom } = useSafeAreaInsets();

  const isDark = colorScheme === "dark";

  const bgColor = isDark ? "bg-black" : "bg-white";
  const borderColor = isDark ? "border-slate-800" : "border-slate-200";

  const getIsActive = (path: string) => {
    // Verifica se a rota atual corresponde ao caminho da aba
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <View
      style={{ paddingBottom: bottom || 8 }}
      className={`
        ${bgColor} ${borderColor}
        border-t
      `}
    >
      <View className="flex-row items-center justify-around h-14 px-6">
        {tabs.map((tab) => {
          const active = getIsActive(tab.path);
          const ActiveIcon = tab.icon;

          // Lógica especial para o ícone central (+) se quiser destacá-lo,
          // ou mantê-lo padrão. Aqui mantive a lógica de cor padrão.
          const iconColor = active
            ? isDark
              ? "#f9fafb" // Branco no dark mode
              : "#020617" // Preto no light mode
            : "#9ca3af";  // Cinza quando inativo

          return (
            <Pressable
              key={tab.key}
              onPress={() => router.push(tab.path as any)}
              hitSlop={10}
            >
              <View className="items-center justify-center">
                <View className="relative">
                  <ActiveIcon
                    size={26}
                    strokeWidth={active ? 2.8 : 2.2}
                    color={iconColor}
                  />

                  {/* Bolinha de notificação no ícone Home com a cor #64FFDA */}
                  {tab.key === "home" && (
                    <View className="w-2 h-2 rounded-full bg-[#64FFDA] absolute -top-1 -right-1" />
                  )}
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}