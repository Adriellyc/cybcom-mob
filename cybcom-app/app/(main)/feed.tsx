import React, { useState } from "react";
import { View } from "react-native";
import { TopHeader } from "@/components/TopHeader";
import { BottomNav } from "@/components/BottomNav";

export default function FeedScreen() {
  const [activeTab, setActiveTab] = useState<"forYou" | "following">("forYou");

  return (
    <View className="flex-1 bg-black">
      {/* navBar */}
      <TopHeader activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Conteúdo do feed */}
      <View className="flex-1 bg-black">
        {activeTab === "forYou" ? (
          <View className="flex-1 bg-black">
            {/* TODO: feed "Para você" */}
          </View>
        ) : (
          <View className="flex-1 bg-black">
            {/* TODO: feed "Seguindo" */}
          </View>
        )}
      </View>
        {/* footer*/}
      <BottomNav />
    </View>
  );
}