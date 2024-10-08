import { View, Text, Image, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import Colors from "./../../Utils/Colors";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import EditUserProfile from "./EditUserProfile";
import EditUserAddress from "./EditUserAddress";
import axios from "axios";
import { backendUrl } from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
export default function ProfileScreen() {
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [openEditAddressModal, setOpenEditAddressModal] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  const navigation = useNavigation();
  const { user } = useUser();
  const profileMenu = [
    {
      id: 1,
      name: "Home",
      icon: "home",
      action: "home",
    },
    {
      id: 2,
      name: "Edit profile",
      icon: "person",
      action: "editProfile",
    },
    {
      id: 3,
      name: "Edit Address",
      icon: "location",
      action: "location",
    },
    {
      id: 4,
      name: "My Booking",
      icon: "bookmark-sharp",
      action: "booking",
    },
    {
      id: 5,
      name: "Support",
      icon: "call",
      action: "support",
    },

    {
      id: 6,
      name: "Logout",
      icon: "log-out",
      action: "logout",
    },
  ];

  function handleProfileItemClick(action) {
    if (action === "editProfile") {
      setOpenEditProfileModal(true);
    }
    if (action === "location") {
      setOpenEditAddressModal(true);
    }
    if (action === "logout") {
      navigation.navigate("signin");
    }
  }

  async function getUser() {
    const user1 = await AsyncStorage.getItem("user");
    const user = JSON.parse(user1);
    const userId = user?.id;

    axios
      .get(`${backendUrl}/api/UserMangement/get_UserById`, {
        params: {
          userId: userId,
        },
      })
      .then((response) => {
        setLoggedUser(response.data);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View>
      <View
        style={{ padding: 20, paddingTop: 30, backgroundColor: Colors.PRIMARY }}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            color: Colors.WHITE,
          }}
        >
          Profile
        </Text>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Image
            source={{
              uri: `${loggedUser?.profileImage}`,
            }}
            style={{ width: 90, height: 90, borderRadius: 99 }}
          />
          <Text
            style={{
              fontSize: 26,
              marginTop: 8,
              fontFamily: "outfit-medium",
              color: Colors.WHITE,
            }}
          >
            {loggedUser?.firstName + " " + loggedUser?.lastName}
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginTop: 8,
              fontFamily: "outfit-medium",
              color: Colors.WHITE,
            }}
          >
            {user?.primaryEmailAddress.emailAddress}
          </Text>
        </View>
      </View>

      <View style={{ paddingTop: 40 }}>
        <FlatList
          data={profileMenu}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleProfileItemClick(item.action)}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginBottom: 20,
                paddingHorizontal: 30,
              }}
            >
              <Ionicons name={item.icon} size={25} color={Colors.PRIMARY} />
              <Text style={{ fontFamily: "outfit", fontSize: 20 }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <Modal animationType="slide" visible={openEditProfileModal}>
        <EditUserProfile
          getUser={getUser}
          businessId={1}
          hideModal={() => setOpenEditProfileModal(false)}
          loggedUser={loggedUser}
        />
      </Modal>
      <Modal animationType="slide" visible={openEditAddressModal}>
        <EditUserAddress
          businessId={1}
          hideModal={() => setOpenEditAddressModal(false)}
        />
      </Modal>
    </View>
  );
}
