import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import Heading from "../../Components/Heading";
import GlobalApi from "../../Utils/GlobalApi";
import BusinessListItemSmall from "./BusinessListItemSmall";
import axios from "axios";
import { backendUrl } from "../../../config";

export default function BusinessList() {
  const [loading, setLoading] = useState(true);
  const [businessList, setBusinessList] = useState([
    {
      id: 1,
      name: "Electronic Scrap",
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      address: "255 Grand Park Ave, New York",
      category: { name: "Electronic" },
      contactPerson: "Abdul Wahid",
      email: "testemail@email.com",
      images: [
        {
          url: "https://scrapbuyerspro.com/wp-content/uploads/2023/05/istockphoto-517812863-612x612-1.jpg",
        },
      ],
    },
    {
      id: 2,
      name: "Metallic Scrap",
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      address: "255 Grand Park Ave, New York",
      category: { name: "Metal" },
      contactPerson: "Saeed Ali",
      email: "testemail@email.com",
      images: [
        {
          url: "https://www.liveabout.com/thmb/q5q1oOGC75kgls10UC89CMDMOS0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/180404747-56a7ec7b3df78cf7729ac2fb.jpg",
        },
      ],
    },
    {
      id: 3,
      name: "Paper Scrap",
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      address: "255 Grand Park Ave, New York",
      category: { name: "Paper" },
      contactPerson: "Abrar Ahmed",
      email: "testemail@email.com",
      images: [
        {
          url: "https://www.rcmscrapmetal.com/images/blog/1650289667blog-22-04-18.jpg",
        },
      ],
    },
  ]);

  const getBusinessList = () => {
    setLoading(true);
    axios
      .get(`${backendUrl}/api/UserMangement/get_AllScrapper`)
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        setBusinessList(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.warn(error);
      });
  };

  useEffect(() => {
    getBusinessList();
  }, []);

  /**
   * Get Business List from API
   */

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color="#9f5bff"
          style={{ transform: [{ scale: 1.5 }] }}
        />
      </View>
    );
  }

  return (
    <View style={{ marginTop: 20 }}>
      <Heading text={"Scrap Collectors"} isViewAll={true} />

      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: 10 }}>
            <BusinessListItemSmall business={item} />
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
});
