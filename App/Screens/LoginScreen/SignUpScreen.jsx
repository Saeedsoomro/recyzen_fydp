import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import { backendUrl } from "../config";
import Colors from "../../Utils/Colors";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    console.log("signup");
    // const user = {
    //   name: name,
    //   email: email,
    //   password: password,
    //   image: image,
    // };
    // // send the POST request to backend Api to register user
    // axios
    //   .post(`${backendUrl}/register`, user)
    //   .then((response) => {
    //     // console.log(response);
    //     Alert.alert(
    //       "Registeration successful",
    //       "You have been registered successfully"
    //     );
    //     setName("");
    //     setEmail("");
    //     setPassword("");
    //     setImage("");
    //   })
    //   .catch((err) => {
    //     console.log("Registeration failed", err);
    //     Alert.alert(
    //       "Registeration Error",
    //       "An error occured while registering"
    //     );
    //   });
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: "white",
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
          <Text
            style={{ color: Colors.PRIMARY, fontSize: 17, fontWeight: 600 }}
          >
            Register
          </Text>
          <Text style={{ fontSize: 17, fontWeight: 600, marginTop: 15 }}>
            Register to Your Account
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontWeight: 600, fontSize: 18, color: "gray" }}>
              Name
            </Text>
            <TextInput
              placeholder="Enter Your Name"
              placeholderTextColor={"black"}
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
                fontSize: name ? 18 : 18,
              }}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: 600, fontSize: 18, color: "gray" }}>
              Email
            </Text>
            <TextInput
              placeholder="Enter Your Email"
              placeholderTextColor={"black"}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
                fontSize: email ? 18 : 18,
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontWeight: 600, fontSize: 18, color: "gray" }}>
            Password
          </Text>
          <TextInput
            placeholder="Enter Your Password"
            placeholderTextColor={"black"}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              marginVertical: 10,
              width: 300,
              fontSize: password ? 18 : 18,
            }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontWeight: 600, fontSize: 18, color: "gray" }}>
            Image
          </Text>
          <TextInput
            placeholder="Image"
            placeholderTextColor={"black"}
            value={image}
            onChangeText={(text) => {
              setImage(text);
            }}
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              marginVertical: 10,
              width: 300,
              fontSize: image ? 18 : 18,
            }}
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

const styles = StyleSheet.create({});
