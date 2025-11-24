import React from "react";
import { View, Pressable } from "react-native";
import { useColorScheme } from "nativewind";
import { router, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Home,
  Search,
  CircleOff,
  Bell,
  Mail,
  type LucideIcon,
} from "lucide-react-native";

type TabKey = "home" | "search" | "spaces" | "notifications" | "messages";

type TabItem = {
  key: TabKey;
  icon: LucideIcon;
  path: string;
};

const tabs: TabItem[] = [
  { key: "home",          icon: Home,      path: "/feed" },          // seu feed em (main)
  { key: "search",        icon: Search,    path: "/search" },        // tela futura
  { key: "spaces",        icon: CircleOff, path: "/spaces" },        // tela futura
  { key: "notifications", icon: Bell,      path: "/notification" },  // já existe
  { key: "messages",      icon: Mail,      path: "/messages" },      // tela futura
];

export function BottomNav() {
  const pathname = usePathname();
  const { colorScheme } = useColorScheme();
  const { bottom } = useSafeAreaInsets();

  const isDark = colorScheme === "dark";

  const bgColor = isDark ? "bg-black" : "bg-white";
  const borderColor = isDark ? "border-slate-800" : "border-slate-200";

  const getIsActive = (path: string) => {
    // com grupos (main), a rota real é "/feed", "/notification", etc.
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

          const iconColor = active
            ? isDark
              ? "#f9fafb"
              : "#020617"
            : "#9ca3af";

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

                  {/* Bolinha azul de notificação no ícone Home, igual o X */}
                  {tab.key === "home" && (
                    <View className="w-2 h-2 rounded-full bg-sky-500 absolute -top-1 -right-1" />
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
