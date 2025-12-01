import React, { useState } from "react";
import { View, TextInput, Image } from "react-native";
import { router } from "expo-router";

// UI Components
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin() {
    router.push("/(main)/feed");
  }

  return (
    <View className="flex-1 bg-black">
      <Box className="flex-1 items-center justify-center px-8">

        {/* Logo */}
        <Image
          source={require("../../assets/images/logo-cybcom-sem-fundoPNG.png")}
          style={{ width: 60, height: 75, marginBottom: 24 }}
        />

        {/* Título */}
        <Text className="text-3xl font-extrabold mb-6 text-white">
          Entrar
        </Text>

        {/* Card */}
        <Box className="w-full bg-[#0B1A2A] p-6 rounded-2xl">

          {/* Email */}
          <Text className="text-white mb-1 text-base font-medium">Email</Text>
          <TextInput
            className="w-full bg-[#1A2C3A] text-white p-3 rounded-xl mb-4 text-base"
            placeholder="Digite seu email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
          />

          {/* Senha */}
          <Text className="text-white mb-1 text-base font-medium">Senha</Text>
          <TextInput
            className="w-full bg-[#1A2C3A] text-white p-3 rounded-xl mb-6 text-base"
            placeholder="Digite sua senha"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          {/* Botão */}
          <Button
            className="w-full bg-[#64FFDA] rounded-xl"
            onPress={handleLogin}
            action="primary"
          >
            <ButtonText className="text-black text-base font-bold">
              Login
            </ButtonText>
          </Button>

        </Box>
      </Box>

      {/* Rodapé */}
      <Box className="items-center pb-6">
        <Text className="text-xs text-slate-400">
          Esqueceu a senha?
        </Text>
      </Box>
    </View>
  );
}
