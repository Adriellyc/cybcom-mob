import React from "react";
import { View, Image } from "react-native";
import { router } from "expo-router";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";

export default function IndexScreen() {

  return (
    // bg-slate-50 no claro, bg-black no escuro
    <View className="flex-1 bg-slate-50 dark:bg-black">
      {/* Conteúdo central */}
      <Box className="flex-1 items-center justify-center px-8">
        <Image
          source={require("../assets/images/logo-cybcom-sem-fundoPNG.png")}
          style={{ width: 60, height: 75, borderRadius: 20, marginBottom: 24 }}
        />

        {/* Cores de texto adaptáveis */}
        <Text className="text-3xl font-extrabold mb-2 text-slate-900 dark:text-white">
          CybCom
        </Text>

        <Text className="text-base text-center mb-10 text-slate-600 dark:text-slate-400">
          Sua comunidade de tecnologia, posts e cursos em um só lugar.
        </Text>
        
        {/* Botão de Login */}
        <Button
          className="w-full mb-3"
          action="primary"
          onPress={() => router.push("/(main)/feed" as any)}
        >
          <ButtonText className="text-white dark:text-black text-base font-bold">
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
        <Text className="text-xs text-slate-600 dark:text-slate-400">
          Ao continuar, você concorda com os Termos e a Política de Privacidade.
        </Text>
      </Box>
    </View>
  );
}