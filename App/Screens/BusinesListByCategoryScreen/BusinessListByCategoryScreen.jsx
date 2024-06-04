import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import GlobalApi from "../../Utils/GlobalApi";
import BusinessListItem from "./BusinessListItem";
import Colors from "../../Utils/Colors";
import PageHeading from "../../Components/PageHeading";
export default function BusinessListByCategoryScreen() {
  const param = useRoute().params;
  const navigation = useNavigation();

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
  // useEffect(() => {
  //   param && getBusinessByCategory();
  // }, [param]);

  /**
   * Business List By Category
   */
  // const getBusinessByCategory = () => {
  //   GlobalApi.getBusinessListByCategory(param.category).then((resp) => {
  //     setBusinessList(resp.businessLists);
  //   });
  // };
  return (
    <View style={{ padding: 20, paddingTop: 30 }}>
      <PageHeading title={param.category} />
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
