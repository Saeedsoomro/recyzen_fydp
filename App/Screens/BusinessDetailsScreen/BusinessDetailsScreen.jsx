import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Utils/Colors";
import Heading from "../../Components/Heading";
import BusinessPhotos from "./BusinessPhotos";
import BusinessAboutMe from "./BusinessAboutMe";
import BookingModal from "./BookingModal";
import { backendUrl } from "../../../config";
import axios from "axios";

export default function BusinessDetailsScreen() {
  const param = useRoute().params;
  const [business, setBusiness] = useState(param.business);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
  const navigation = useNavigation();
  useEffect(() => {}, []);
  //'mailto:someone@example.com?subject=Hello&body=Hello%20there!'

  const onMessageBtnClick = () => {
    Linking.openURL(
      "mailto:" +
        business?.email +
        "?subject=I am looking for your Service&body=Hi There,"
    );
  };

  function getAddress(id) {
    const userId = 1;
    axios
      .get(`${backendUrl}/api/UserMangement/get_Address`, {
        params: {
          userId: id,
        },
      })
      .then((response) => {
        setAddress(
          `${response.data.number}, ${response.data.streetName},${response.data.city},${response.data.state}, `
        );
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  useEffect(() => {
    if (business) {
      getAddress(business.id);
    }
  }, [business]);

  return (
    business && (
      <View>
        <ScrollView style={{ height: "91%" }}>
          <TouchableOpacity
            style={styles.backBtnContainer}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={30} color="white" />
          </TouchableOpacity>
          <Image
            source={{ uri: business?.profileImage }}
            style={{ width: "100%", height: 300 }}
          />
          <View style={styles.infoContainer}>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
              {business?.categoryTitle + " " + business?.roleName}
            </Text>
            <View style={styles.subContainer}>
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  color: Colors.PRIMARY,
                  fontSize: 20,
                }}
              >
                {business?.firstName + " " + business?.lastName} 🌟{" "}
              </Text>
              <Text
                style={{
                  color: Colors.PRIMARY,
                  backgroundColor: Colors.PRIMARY_LIGHT,
                  padding: 5,
                  borderRadius: 5,
                  fontSize: 14,
                }}
              >
                {business?.categoryTitle}
              </Text>
            </View>
            <Text
              style={{ fontSize: 17, fontFamily: "outfit", color: Colors.GRAY }}
            >
              <Ionicons
                name="ios-location-sharp"
                size={25}
                color={Colors.PRIMARY}
              />
              {address}
            </Text>

            {/* Horizontal Line  */}
            <View
              style={{
                borderWidth: 0.4,
                borderColor: Colors.GRAY,
                marginTop: 20,
                marginBottom: 20,
              }}
            ></View>

            {/* About Me Section  */}
            <BusinessAboutMe business={business} />

            {/* Horizontal Line  */}
            <View
              style={{
                borderWidth: 0.4,
                borderColor: Colors.GRAY,
                marginTop: 20,
                marginBottom: 20,
              }}
            ></View>

            <BusinessPhotos business={business} />
          </View>
        </ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            margin: 8,
            gap: 8,
          }}
        >
          <TouchableOpacity
            style={styles.messagebtn}
            onPress={() => onMessageBtnClick()}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-medium",
                color: Colors.PRIMARY,
                fontSize: 18,
              }}
            >
              Message
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bookingBtn}
            onPress={() => setShowModal(true)}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-medium",
                color: Colors.WHITE,
                fontSize: 18,
              }}
            >
              Book Now
            </Text>
          </TouchableOpacity>
        </View>

        {/* Booking Screen Modal  */}
        <Modal animationType="slide" visible={showModal}>
          <BookingModal
            businessId={business.id}
            hideModal={() => setShowModal(false)}
          />
        </Modal>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  backBtnContainer: {
    position: "absolute",
    zIndex: 10,
    padding: 20,
  },
  infoContainer: {
    padding: 20,
    display: "flex",
    gap: 7,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  messagebtn: {
    padding: 15,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1,
  },
  bookingBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1,
  },
});
