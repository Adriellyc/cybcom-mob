import React, { useState } from "react";
import { View } from "react-native";
import { TopHeader } from "@/components/TopHeader";

export default function FeedScreen() {
  const [activeTab, setActiveTab] = useState<"forYou" | "following">("forYou");

  return (
    <View className="flex-1 bg-black">
      <TopHeader activeTab={activeTab} onChangeTab={setActiveTab} />

      {activeTab === "forYou" ? (
        <View className="flex-1 bg-black">
          {/* TODO: implementar feed "Para você" */}
        </View>
      ) : (
        <View className="flex-1 bg-black">
          {/* TODO: implementar feed "Seguindo" */}
        </View>
      )}
    </View>
  );
}