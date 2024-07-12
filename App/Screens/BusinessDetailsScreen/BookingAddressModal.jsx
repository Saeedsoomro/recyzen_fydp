import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ToastAndroid,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import PageHeading from "../../Components/PageHeading";
import { Ionicons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import Colors from "../../Utils/Colors";
import Heading from "../../Components/Heading";
import { FlatList } from "react-native";
import { TextInput } from "react-native";
import { ScrollView } from "react-native";
import GlobalApi from "../../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import moment from "moment";
import axios from "axios";
import { backendUrl } from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function BookingAddressModal({
  businessId,
  hideModal,
  handleClose,
}) {
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [floorUnit, setFloorUnit] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);

  const [timeList, setTimeList] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [note, setNote] = useState();
  const [showAddressModal, setShowAdressModal] = useState(false);

  const { user } = useUser();
  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 7; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeList(timeList);
  };

  async function handleUpdateAddress() {
    if (
      streetName === "" ||
      streetNumber === "" ||
      city === "" ||
      postalCode === "" ||
      state === "" ||
      floorUnit === ""
    ) {
      ToastAndroid.show("Please fill all the fields!", ToastAndroid.SHORT);
      return;
    }

    const user1 = await AsyncStorage.getItem("user");
    const user = JSON.parse(user1);
    const userId = user?.id;

    const formData = {
      userId: userId,
      streetName: streetName,
      city: city,
      postalCode: postalCode,
      state: state,
      number: streetNumber,
      floorUnit: floorUnit,
    };
    setLoading(true);
    axios
      .put(`${backendUrl}/api/UserMangement/set_Address`, formData)
      .then((response) => {
        getAddress();
        setLoading(false);
        handleClose();
        ToastAndroid.show("Bookings has been scheduled!", ToastAndroid.SHORT);
      })
      .catch((error) => {
        setLoading(true);
        console.warn(error);
      });
  }

  async function getAddress() {
    const user1 = await AsyncStorage.getItem("user");
    const user = JSON.parse(user1);
    const userId = user?.id;
    axios
      .get(`${backendUrl}/api/UserMangement/get_Address`, {
        params: {
          userId: userId,
        },
      })
      .then((response) => {
        setStreetName(response.data.streetName);
        setCity(response.data.city);
        setPostalCode(response.data.postalCode);
        setState(response.data.state);
        setStreetNumber(response.data.number);
        setFloorUnit(response.data.floorUnit);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <ScrollView>
      <KeyboardAvoidingView style={{ padding: 20 }}>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginBottom: 20,
          }}
          onPress={() => hideModal()}
        >
          <Ionicons name="arrow-back-outline" size={30} color="black" />
          <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
            Address
          </Text>
        </TouchableOpacity>

        {/* Calender Section  */}
        <Heading text={"Enter Adress Detials"} />
        <View style={styles.calenderContainer}>
          <TextInput
            placeholder="Street Name"
            value={streetName}
            onChangeText={setStreetName}
            style={styles.noteTextArea}
          />
          <TextInput
            placeholder="Number"
            value={streetNumber}
            onChangeText={setStreetNumber}
            style={styles.noteTextArea}
          />
          <TextInput
            placeholder="Floor Unit"
            value={floorUnit}
            onChangeText={setFloorUnit}
            style={styles.noteTextArea}
          />
          <TextInput
            placeholder="Postal Code"
            value={postalCode}
            onChangeText={setPostalCode}
            style={styles.noteTextArea}
          />
          <TextInput
            placeholder="City"
            value={city}
            onChangeText={setCity}
            style={styles.noteTextArea}
          />
          <TextInput
            placeholder="State"
            value={state}
            onChangeText={setState}
            style={styles.noteTextArea}
          />
        </View>

        {/* confirmation Button  */}
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={handleUpdateAddress}
        >
          <Text style={styles.confirmBtn}>
            {loading ? <ActivityIndicator color="white" /> : "done"}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  calenderContainer: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15,
  },
  selectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
  },
  unSelectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    color: Colors.PRIMARY,
  },
  noteTextArea: {
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 15,
    textAlignVertical: "top",
    padding: 10,
    fontSize: 16,
    fontFamily: "outfit",
    borderColor: Colors.PRIMARY,
  },
  confirmBtn: {
    textAlign: "center",
    fontFamily: "outfit-medium",
    fontSize: 17,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    padding: 13,
    borderRadius: 99,
    elevation: 2,
  },
});
