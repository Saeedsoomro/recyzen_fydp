import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { backendUrl } from "../../../config";
import axios from "axios";
export default function BusinessListItem({ business, booking }) {
  const navigation = useNavigation();
  const [address, setAddress] = useState();

  function getAddress() {
    axios
      .get(`${backendUrl}/api/UserMangement/get_Address`, {
        params: {
          userId: business.id,
        },
      })
      .then((response) => {
        setAddress(
          `${response.data.streetName}, ${response.data.city},${response.data.state}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.push("business-detail", {
          business: business,
        })
      }
    >
      <Image source={{ uri: business?.profileImage }} style={styles.image} />
      <View style={styles.subContaner}>
        <Text
          style={{ fontFamily: "outfit", color: Colors.GRAY, fontSize: 15 }}
        >
          {business.firstName + " " + business.lastName}
        </Text>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 19 }}>
          {business.categoryTitle}
        </Text>

        {!booking?.id ? (
          <Text
            style={{ fontFamily: "outfit", color: Colors.GRAY, fontSize: 16 }}
          >
            <Ionicons
              name="ios-location-sharp"
              size={20}
              color={Colors.PRIMARY}
            />
            {address}
          </Text>
        ) : (
          <Text
            style={[
              {
                padding: 5,
                borderRadius: 5,
                fontSize: 14,
                alignSelf: "flex-start",
              },
              booking?.bookingStatus == "Completed"
                ? { backgroundColor: Colors.GREEN, color: Colors.WHITE }
                : booking.bookingStatus == "Canceled"
                ? { backgroundColor: Colors.RED, color: Colors.WHITE }
                : {
                    color: Colors.PRIMARY,
                    backgroundColor: Colors.PRIMARY_LIGHT,
                  },
            ]}
          >
            {booking?.bookingStatus}
          </Text>
        )}

        {booking?.id ? (
          <Text
            style={{ fontFamily: "outfit", color: Colors.GRAY, fontSize: 16 }}
          >
            <AntDesign
              name="calendar"
              size={24}
              color={Colors.PRIMARY}
              style={{ marginRight: 15 }}
            />
            {booking.date} at {booking.time}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  subContaner: {
    display: "flex",
    gap: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
});
