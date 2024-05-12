import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../Utils/GlobalApi";
import Heading from "../../Components/Heading";
// import image from "../../images/banner_1_recyzen.png"

export default function Slider() {
  const [slider, setSlider] = useState([
    {
      image: {
        url: require("../../images/banner_1_recyzen.png"),
      },
    },
    {
      image: {
        url: require("../../images/banner_2_recyzen.png"),
      },
    },
  ]);
  //   useEffect(() => {
  //     getSliders();
  //   }, []);

  //   // Get Slider From API
  //   const getSliders = () => {
  //     GlobalApi.getSlider().then((resp) => {
  //       console.log("resp", resp.sliders);
  //       setSlider(resp?.sliders);
  //     });
  //   };
  return (
    <View>
      <Heading text={"Offers For You"} />
      <FlatList
        data={slider}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: 20 }}>
            <Image source={item?.image?.url} style={styles.sliderImage} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontFamily: "outfit-medium",
    marginBottom: 10,
  },
  sliderImage: {
    width: 270,
    height: 150,
    borderRadius: 20,
    objectFit: "contain",
  },
});
