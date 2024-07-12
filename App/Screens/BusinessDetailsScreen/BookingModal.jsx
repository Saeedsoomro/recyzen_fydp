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
import BookingAddressModal from "./BookingAddressModal";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { backendUrl } from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookingModal({ businessId, hideModal }) {
  const [timeList, setTimeList] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [note, setNote] = useState("");
  const [showAddressModal, setShowAdressModal] = useState(false);
  const [estimatedWeight, setEstimatedWeight] = useState("");
  const [loading, setLoading] = useState(false);

  // Data for the dropdown options
  const weightOptions = [
    { label: "Less than 10 kg", value: "< 10 kg" },
    { label: "10 - 20 kg", value: "10 - 20 kg" },
    { label: "20 - 30 kg", value: "20 - 30 kg" },
    { label: "30 - 40 kg", value: "30 - 40 kg" },
    { label: "More than 40 kg", value: "> 40 kg" },
  ];

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

  // Create Booking Method
  const createNewBooking = async () => {
    if (!selectedTime || !selectedDate) {
      ToastAndroid.show("Please select Date and Time ", ToastAndroid.LONG);

      return;
    }

    const user1 = await AsyncStorage.getItem("user");
    const user = JSON.parse(user1);
    const userId = user?.id;

    const formData = {
      estimatedWieght: estimatedWeight,
      scheduledBy: 1,
      scheduledByDate: new Date(selectedDate),
      scheduledByTime: selectedTime,
      scheduledTo: businessId,
      suggestionNote: note,
    };
    setLoading(true);
    axios
      .post(`${backendUrl}/api/Bookings/add_Bookings`, formData)
      .then((response) => {
        setLoading(false);
        // ToastAndroid.show("User Address has been updated!", ToastAndroid.SHORT);
        setShowAdressModal(true);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

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
            Bookings
          </Text>
        </TouchableOpacity>

        {/* Calender Section  */}
        <Heading text={"Estimated Weight"} />
        <View style={styles.dropDownStyle}>
          <Picker
            selectedValue={estimatedWeight}
            onValueChange={(itemValue, itemIndex) =>
              setEstimatedWeight(itemValue)
            }
          >
            {weightOptions.map((option, index) => (
              <Picker.Item
                key={index}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>

        <Heading text={"Select Date"} />
        <View style={styles.calenderContainer}>
          <CalendarPicker
            onDateChange={setSelectedDate}
            width={340}
            minDate={Date.now()}
            todayBackgroundColor={Colors.BLACK}
            todayTextStyle={{ color: Colors.WHITE }}
            selectedDayColor={Colors.PRIMARY}
            selectedDayTextColor={Colors.WHITE}
          />
        </View>

        {/* Time Select Section  */}
        <View style={{ marginTop: 20 }}>
          <Heading text={"Select Time Slot"} />
          <FlatList
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => setSelectedTime(item.time)}
              >
                <Text
                  style={[
                    selectedTime == item.time
                      ? styles.selectedTime
                      : styles.unSelectedTime,
                  ]}
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Note Section  */}
        <View style={{ paddingTop: 20 }}>
          <Heading text={"Any Suggestion Note"} />
          <TextInput
            placeholder="Note"
            numberOfLines={4}
            multiline={true}
            style={styles.noteTextArea}
            onChangeText={(text) => setNote(text)}
          />
        </View>

        {/* confirmation Button  */}
        <TouchableOpacity
          style={{ marginTop: 15 }}
          //   onPress={()=>createNewBooking()}
          onPress={() => createNewBooking()}
        >
          <Text style={styles.confirmBtn}>
            {" "}
            {loading ? <ActivityIndicator color="white" /> : "Proceed"}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <Modal animationType="slide" visible={showAddressModal}>
        <BookingAddressModal
          businessId={1}
          hideModal={() => setShowAdressModal(false)}
          handleClose={() => {
            setShowAdressModal(false);
            hideModal();
          }}
        />
      </Modal>
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
    borderRadius: 15,
    textAlignVertical: "top",
    padding: 20,
    fontSize: 16,
    fontFamily: "outfit",
    borderColor: Colors.PRIMARY,
  },
  dropDownStyle: {
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: "top",
    // padding:20,
    marginBottom: 15,
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
