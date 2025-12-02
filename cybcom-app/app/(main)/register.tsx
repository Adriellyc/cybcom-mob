import React, { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";

export default function RegisterScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

  const handleRegister = () => {
    console.log({ nome, email, senha, confirmSenha });
    // Futuro: chamar API
  };

  return (
    <View className="flex-1 bg-slate-50 dark:bg-black">
      <Box className="flex-1 justify-center px-8">
        
        {/* Título */}
        <Text className="text-3xl font-extrabold mb-2 text-slate-900 dark:text-white">
          Criar conta
        </Text>

        <Text className="text-base text-slate-600 dark:text-slate-400 mb-8">
          Preencha os campos abaixo para começar.
        </Text>

        {/* NOME */}
        <Box className="mb-4">
          <Text className="text-sm text-slate-700 dark:text-slate-300 mb-1">
            Nome
          </Text>
          <Input className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
            <InputField
              placeholder="Seu nome"
              placeholderTextColor="#9CA3AF"
              value={nome}
              onChangeText={setNome}
            />
          </Input>
        </Box>

        {/* EMAIL */}
        <Box className="mb-4">
          <Text className="text-sm text-slate-700 dark:text-slate-300 mb-1">
            Email
          </Text>
          <Input className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
            <InputField
              placeholder="seuemail@mail.com"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Input>
        </Box>

        {/* SENHA */}
        <Box className="mb-4">
          <Text className="text-sm text-slate-700 dark:text-slate-300 mb-1">
            Senha
          </Text>
          <Input className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
            <InputField
              placeholder="Digite sua senha"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </Input>
        </Box>

        {/* CONFIRMAÇÃO */}
        <Box className="mb-6">
          <Text className="text-sm text-slate-700 dark:text-slate-300 mb-1">
            Confirmar senha
          </Text>
          <Input className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
            <InputField
              placeholder="Repita sua senha"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={confirmSenha}
              onChangeText={setConfirmSenha}
            />
          </Input>
        </Box>

        {/* BOTÃO COMEÇAR */}
        <Button
          className="w-full mb-4"
          action="primary"
          onPress={handleRegister}
        >
          <ButtonText className="text-white dark:text-black text-base font-bold">
            Começar
          </ButtonText>
        </Button>

        {/* JÁ TEM CONTA? LOGIN */}
        <Box className="items-center mt-2">
          <Text className="text-slate-700 dark:text-slate-300">
            Já tem uma conta?{" "}
            <Text
              className="text-primary-600 dark:text-[#64FFDA] font-bold"
              onPress={() => router.push("/(main)/login" as any)}
            >
              Faça login
            </Text>
          </Text>
        </Box>
      </Box>
    </View>
  );
}
