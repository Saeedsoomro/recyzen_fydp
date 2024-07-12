import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./App/Screens/LoginScreen/Login";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./App/Navigations/TabNavigation";
import { useFonts } from "expo-font";
import SignIn from "./App/Screens/LoginScreen/SignInScreen";
import SignInScreen from "./App/Screens/LoginScreen/SignInScreen";
import SignUpScreen from "./App/Screens/LoginScreen/SignUpScreen";
// import SignIn from "./App/Screens/LoginScreen/SignIn";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./App/Screens/HomeScreen/HomeScreen";
import Toast from "react-native-toast-message";
import ScrapperTabNavigation from "./App/Navigations/ScrapperTabNavigation";

const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    outfit: require("./assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./assets/fonts/Outfit-Bold.ttf"),
  });
  return (
    <ClerkProvider publishableKey="pk_test_ZGVsaWNhdGUtaGVycmluZy0wLmNsZXJrLmFjY291bnRzLmRldiQ">
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="signin"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="signup"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="home"
              component={TabNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="scrapper-home"
              component={ScrapperTabNavigation}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
