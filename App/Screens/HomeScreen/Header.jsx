import { useUser } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../Utils/Colors";

export default function Header() {
  //   const { user, isLoading } = useUser();
  const navigation = useNavigation(); // Access the navigation object

  const handleBookmarkPress = () => {
    // Navigate to CustomerManagement screen
    navigation.navigate("CustomerManagement");
  };

  return (
    <View style={styles.container}>
      {/* Profile Section  */}
      <View style={styles.profileMainContainer}>
        <View style={styles.profileContainer}>
          {/* <Image source={{ uri: user?.imageUrl }} style={styles.userImage} /> */}
          <View>
            <Text style={{ color: Colors.WHITE, fontFamily: "outfit" }}>
              Welcome,
            </Text>
            <Text
              style={{
                color: Colors.WHITE,
                fontSize: 20,
                fontFamily: "outfit-medium",
              }}
            >
              Abdul Wahid
            </Text>
          </View>
        </View>
        {/* Use TouchableOpacity for clickable area */}
        <Text style={{ color: Colors.WHITE, fontFamily: "outfit" }}>
          Admin Panel
        </Text>
        <TouchableOpacity onPress={handleBookmarkPress}>
          <FontAwesome name="bookmark-o" size={27} color="white" />
        </TouchableOpacity>
      </View>
      {/* Search Bar Section  */}
      <View style={styles.searchBarContainer}>
        <TextInput placeholder="Search" style={styles.textInput} />
        <FontAwesome
          name="search"
          style={styles.searchbtn}
          size={24}
          color={Colors.PRIMARY}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profileMainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textInput: {
    padding: 7,
    paddingHorizontal: 16,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    width: "85%",
    fontSize: 16,
    fontFamily: "outfit",
  },
  searchBarContainer: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  searchbtn: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 8,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
});
