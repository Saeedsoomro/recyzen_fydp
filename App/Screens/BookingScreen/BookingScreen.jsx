import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Header } from "react-native/Libraries/NewAppScreen";
import { PageHeading } from "./../../Components/PageHeading";
import GlobalApi from "./../../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import BusinessListItem from "./../BusinesListByCategoryScreen/BusinessListItem";
import { backendUrl } from "../../../config";
import axios from "axios";
import BookingItem from "./BookingItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function BookingScreen() {
  const { user } = useUser();
  const [bookingList, setBookingList] = useState([
    {
      bookingStatus: "Booked",
      businessList: {
        about:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        address: "255 Grand Park Ave, New York",
        category: [],
        contactPerson: "Jenny Wilson",
        email: "accounts@tubeguruji.com",
        id: "clqpl5uui0au20bkagz06fgea",
        images: [
          {
            url: "https://www.rcmscrapmetal.com/images/blog/1650289667blog-22-04-18.jpg",
          },
        ],
        name: "Metal scrap",
      },
      date: "08-May-2024",
      id: "clvvi8sxb56qh07k1ji1iywd1",
      time: "8:30 AM",
      userEmail: "abdulwahid4888888@gmail.com",
      userName: "wahid abdul wahid",
    },
  ]);
  const [loading, setLoading] = useState(false);

  async function getBookings() {
    const user1 = await AsyncStorage.getItem("user");
    const user = JSON.parse(user1);
    const userId = user?.id;
    axios
      .get(`${backendUrl}/api/Bookings/get_UserBookings`, {
        params: {
          userId: userId,
        },
      })
      .then((response) => {
        setBookingList(response.data);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  useEffect(() => {
    getBookings();
  }, []);

  useEffect(() => {
    console.log(bookingList);
  }, [bookingList]);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 26 }}>
        My Bookings
      </Text>

      <View>
        {bookingList?.length > 0 ? (
          <FlatList
            data={bookingList}
            onRefresh={() => getUserBookings()}
            refreshing={loading}
            renderItem={({ item, index }) => (
              <BookingItem key={index} booking={item} />
            )}
          />
        ) : (
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 25,
              textAlign: "center",
              marginTop: 100,
            }}
          >
            No Booking Found
          </Text>
        )}
      </View>
    </View>
  );
}
