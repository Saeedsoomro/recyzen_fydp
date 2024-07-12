import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { backendUrl } from "../../../config";
import Colors from "../../Utils/Colors";

const SignUpScreen = () => {
  const [username, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    console.log("signup");
    const user = {
      username: username,
      phoneNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName,
      password: password,
      roles: "user",
    };
    // // send the POST request to backend Api to register user
    axios
      .post(`${backendUrl}/api/UserMangement/Register`, user)
      .then((response) => {
        console.log(response.data);
        Alert.alert(
          "Registeration successful",
          "You have been registered successfully"
        );
        setUserName("");
        setPhoneNumber("");
        setFirstName("");
        setLastName("");
        setPassword("");
        navigation.replace("signin");
      })
      .catch((err) => {
        console.log("Registeration failed", err);
        Alert.alert(
          "Registeration Error",
          "An error occured while registering"
        );
      });
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
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 20,
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
            Register
          </Text>
          <Text style={{ fontSize: 17, fontWeight: 600, marginTop: 15 }}>
            Register to Your Account
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <View>
            {/* <Text style={{ fontWeight: 600, fontSize: 18, color: "gray" }}>
              User Name
            </Text> */}
            <TextInput
              placeholder="Enter Your Email"
              placeholderTextColor={"black"}
              value={username}
              onChangeText={(text) => {
                setUserName(text);
              }}
              style={styles.noteTextArea}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            {/* <Text style={{ fontWeight: 600, fontSize: 18, color: "gray" }}>
              Phone Number
            </Text> */}
            <TextInput
              placeholder="Enter Your Phone Number"
              placeholderTextColor={"black"}
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
              }}
              style={styles.noteTextArea}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            {/* <Text style={{ fontWeight: 600, fontSize: 18, color: "gray" }}>
              First Name
            </Text> */}
            <TextInput
              placeholder="Enter Your First Name"
              placeholderTextColor={"black"}
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
              }}
              style={styles.noteTextArea}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            {/* <Text style={{ fontWeight: 600, fontSize: 18, color: "gray" }}>
              Last Name
            </Text> */}
            <TextInput
              placeholder="Enter Your Last Name"
              placeholderTextColor={"black"}
              value={lastName}
              onChangeText={(text) => {
                setLastName(text);
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
          onPress={handleRegister}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: 200,
            padding: 15,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 6,
            marginTop: 20,
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
            Register
          </Text>
        </Pressable>
        <Pressable
          style={{ marginTop: 15 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  noteTextArea: {
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 15,
    padding: 10,
    fontSize: 16,
    // fontFamily: "outfit",
    borderColor: Colors.PRIMARY,
    width: 300,
  },
});
