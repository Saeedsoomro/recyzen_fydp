import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import User from "../components/User";

const HomeScreen = () => {
  const navigation = useNavigation();
  //   destructuring to get the value of userId and setUserId that we have set in UserContext
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Swift Chat</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <MaterialCommunityIcons
            name="message-processing-outline"
            size={24}
            color="black"
          />
          <Ionicons name="people-outline" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      console.log(token);
      // decoding the token
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      const userId = decodedToken.userId;
      setUserId(userId);

      axios
        .get(`http://192.168.1.39:8000/users/${userId}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((err) => {
          console.log("Error retrieving data");
        });
    };
    fetchUsers();
  }, []);

  console.log("users", users);
  return (
    <View>
      <View style={{ padding: 10 }}>
        {users.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
