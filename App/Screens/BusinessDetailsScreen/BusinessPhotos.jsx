import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import Heading from "../../Components/Heading";
import { Ionicons } from "@expo/vector-icons";

export default function BusinessPhotos({ business }) {
  const list = ["item"];
  return (
    <View>
      <Heading text={"Photos"} />
      <FlatList
        data={list}
        numColumns={2}
        renderItem={({ item }) => (
          <Image
            source={{ uri: business.profileImage }}
            style={{
              width: "100%",
              flex: 1,
              borderRadius: 15,
              margin: 7,
              height: 120,
            }}
          />
        )}
      />
    </View>
  );
}
