import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../Utils/Colors";

// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { backendUrl } from "../../../config";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("authToken", token);
  //       if (token) {
  //         navigation.replace("Home");
  //       } else {
  //         // token not found
  //       }
  //     } catch (error) {
  //       console.log("Error:", error);
  //     }
  //   };
  //   checkLoginStatus();
  // }, []);

  const handleLogin = () => {
    const user = {
      username: email,
      password: password,
    };
    navigation.replace("scrapper-home");

    // axios
    //   .post(`${backendUrl}/api/UserMangement/Login`, user)
    //   .then((response) => {
    //     // console.log(response);
    //     // const token = response.data.token;
    //     console.log(response.data);
    //     // it takes a key and value
    //     // AsyncStorage.setItem("authToken", token);
    //     // when we do not want to go back to the previous screen then instead of navigate we use replace
    //     // navigation.replace("home");
    //   })
    //   .catch((err) => {
    //     Alert.alert("Login Error", "Invalid Email or Password");
    //     console.log("Login Error", err);
    //   });
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: Colors.PRIMARY_LIGHT,
        alignItems: "center",
      }}
    >
      <StatusBar
        backgroundColor={Colors.PRIMARY_LIGHT}
        barStyle="light-content"
      />
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../images/logoofrecyzen.png")}
            style={{
              width: 90,
              height: 90,
              borderRadius: 99,
              marginVertical: 10,
            }}
          />
          <Text
            style={{ color: Colors.PRIMARY, fontSize: 17, fontWeight: 600 }}
          >
            Sign In
          </Text>
          <Text style={{ fontSize: 17, fontWeight: 600, marginTop: 15 }}>
            Sign In to Your Account
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <View>
            {/* <Text style={{ fontWeight: 600, fontSize: 18, color: "gray" }}>
              Email
            </Text> */}
            <TextInput
              placeholder="Enter Your Email"
              placeholderTextColor={"black"}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
              style={styles.noteTextArea}
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          {/* <Text style={{ fontWeight: 600, fontSize: 18, color: "gray" }}>
            Password
          </Text> */}
          <TextInput
            placeholder="Enter Your Password"
            placeholderTextColor={"black"}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
            style={styles.noteTextArea}
          />
        </View>
        <Pressable
          onPress={handleLogin}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: 200,
            padding: 15,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 6,
            marginTop: 50,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </Pressable>
        <Pressable
          style={{ marginTop: 15 }}
          onPress={() => {
            navigation.navigate("signup");
          }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  noteTextArea: {
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 15,
    padding: 10,
    fontSize: 16,
    fontFamily: "outfit",
    borderColor: Colors.PRIMARY,
    width: 300,
  },
});
