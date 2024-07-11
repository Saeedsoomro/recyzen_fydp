import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import BusinessListItem from "./BusinessListItem";
import Colors from "../../Utils/Colors";
import PageHeading from "../../Components/PageHeading";
import axios from "axios";
import { backendUrl } from "../../../config";

export default function BusinessListByCategoryScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { category } = params;

  const [businessList, setBusinessList] = useState([]);

  function getBusinessList() {
    if (category) {
      axios
        .get(`${backendUrl}/api/UserMangement/get_ScrapperByCategory`, {
          params: {
            CategoryID: category.id,
          },
        })
        .then((response) => {
          setBusinessList(response.data);
          console.log(category.id);
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  }

  useEffect(() => {
    getBusinessList();
  }, [category]);

  return (
    <View style={{ padding: 20, paddingTop: 30 }}>
      <PageHeading title={category.name} />
      {businessList?.length > 0 ? (
        <FlatList
          data={businessList}
          style={{ marginTop: 15 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => <BusinessListItem business={item} />}
        />
      ) : (
        <Text
          style={{
            fontFamily: "outfit-medium",
            color: Colors.GRAY,
            fontSize: 20,
            textAlign: "center",
            marginTop: "20%",
          }}
        >
          No Business Found
        </Text>
      )}
    </View>
  );
}
