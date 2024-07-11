import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../Utils/GlobalApi";
import Heading from "../../Components/Heading";
import Colors from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { backendUrl } from "../../../config";
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/MstCategory`);
        const data = await response.json();
        if (response.ok) {
          setCategories(data);
          // console.log(data);
        }
      } catch (error) {
        console.log("Error showing accepted friends", error);
      }
    };
    getCategories();
  }, []);

  // /api/MstCategory
  // console.log(categories);
  return (
    <View style={{ marginTop: 10 }}>
      <Heading text={"Categories"} isViewAll={true} />
      <FlatList
        data={categories}
        numColumns={4}
        renderItem={({ item, index }) =>
          index <= 3 && (
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                navigation.push("business-list", {
                  category: item,
                })
              }
            >
              <View style={styles.iconContainer}>
                <Image
                  source={{ uri: item?.image }}
                  style={{ width: 30, height: 30 }}
                />
              </View>
              <Text style={{ fontFamily: "outfit-medium", marginTop: 5 }}>
                {item?.title}
              </Text>
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 17,
    borderRadius: 99,
  },
});
