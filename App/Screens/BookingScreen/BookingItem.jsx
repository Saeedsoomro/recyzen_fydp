import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
export default function BookingItem({ business, booking }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{ uri: booking?.userScheduledTo?.profileImage }}
        style={styles.image}
      />
      <View style={styles.subContaner}>
        <Text
          style={{ fontFamily: "outfit", color: Colors.GRAY, fontSize: 15 }}
        >
          {booking?.userScheduledTo.firstName +
            " " +
            booking?.userScheduledTo.lastName}
        </Text>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 19 }}>
          Scrapper
        </Text>

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
          {booking?.booking?.status}
        </Text>

        <Text
          style={{ fontFamily: "outfit", color: Colors.GRAY, fontSize: 16 }}
        >
          <AntDesign
            name="calendar"
            size={24}
            color={Colors.PRIMARY}
            style={{ marginRight: 15 }}
          />
          {booking?.booking?.bookingDate
            ? new Date(booking.booking.bookingDate).toISOString().split("T")[0]
            : ""}{" "}
          at {booking?.booking?.scheduledByTime}
        </Text>
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
