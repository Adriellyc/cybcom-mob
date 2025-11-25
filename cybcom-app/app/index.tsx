import React from "react";
import { View, Image } from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";

export default function IndexScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const bgColor = isDark ? "bg-black" : "bg-slate-50";
  const titleColor = isDark ? "text-white" : "text-slate-900";
  const subtitleColor = isDark ? "text-slate-400" : "text-slate-600";

  return (
    <View className={`flex-1 ${bgColor}`}>
      {/* Conteúdo central */}
      <Box className="flex-1 items-center justify-center px-8">
        {/* Logo / ícone do app */}
        <Image
          source={require("../assets/images/logo-cybcom-sem-fundoPNG.png")}
          style={{ width: 60, height: 75, borderRadius: 20, marginBottom: 24 }}
        />

        <Text className={`text-3xl font-extrabold mb-2 ${titleColor}`}>
          CybCom
        </Text>

        <Text
          className={`text-base text-center mb-10 ${subtitleColor}`}
        >
          Sua comunidade de tecnologia, posts e cursos em um só lugar.
        </Text>

        {/* Botão de Login */}
        <Button
          className="w-full mb-3"
          action="primary"
          onPress={() => router.push("/(main)/feed" as any)}
        >
          <ButtonText className="text-black text-base">
            Login
          </ButtonText>
        </Button>

        {/* Botão de Cadastro */}
          <Button
            className="w-full bg-[#64FFDA] border-0"
            variant="solid"
            action="primary"
            onPress={() => router.push("/(main)/register" as any)}
          >
            <ButtonText className="text-base text-black font-bold">
              Cadastrar
            </ButtonText>
          </Button>
      </Box>

      {/* Rodapé simples */}
      <Box className="items-center pb-6">
        <Text className={`text-xs ${subtitleColor}`}>
          Ao continuar, você concorda com os Termos e a Política de Privacidade.
        </Text>
      </Box>
    </View>
  );
}