import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../Utils/Colors";
import axios from "axios";
import { backendUrl } from "../../../config";
import { useNavigation } from "@react-navigation/native";

// Custom Header component
const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Customer Details</Text>
    </View>
  );
};

const CustomersEditingDeletingScreen = ({ route }) => {
  const { customer } = route.params;
  const [status, setStatus] = useState("");
  const navigation = useNavigation();

  const handleEditCustomer = () => {
    // Logic to edit the selected customer with updated status
    console.log("Edit customer with status:", { ...customer, status });
    // Replace the below logic with your edit implementation
    // For demonstration purposes, let's update the customer details with the new status
    // navigation.navigate('EditCustomerScreen', { ...customer, status });
  };

  const handleDeleteCustomer = () => {
    // Logic to delete the selected customer
    console.log("Delete customer:", customer);
    // Replace the below logic with your delete implementation
    // For demonstration purposes, let's navigate back to the previous screen
    navigation.goBack();
  };

  function handleChangeStatus(status) {
    axios
      .put(
        `${backendUrl}/api/Bookings/update_BookingsStatus`,
        {},
        {
          params: {
            BookingId: customer?.booking?.id,
            status: status,
          },
        }
      )
      .then((response) => {
        navigation.goBack();
        console.log(response.data);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  useEffect(() => {
    setStatus(customer?.booking?.status);
  }, [customer]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <Header />
      {/* End of Custom Header */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>
            Customer Name:{" "}
            {customer?.userScheduledTo.firstName +
              " " +
              customer?.userScheduledTo.lastName}
          </Text>
          {/* Customer Address Section */}
          <View style={styles.addressContainer}>
            <Text style={styles.subHeading}>Customer Address:</Text>
            <Text style={styles.addressText}>
              Street Name: {customer?.bookingAdress?.streetName}
            </Text>
            <Text style={styles.addressText}>
              Phone Number:{customer.address?.phoneNumber}
            </Text>
            <Text style={styles.addressText}>
              Floor Unit: {customer?.bookingAdress?.floorUnit}
            </Text>
            <Text style={styles.addressText}>
              Postal Code: {customer?.bookingAdress?.postalCode}
            </Text>
            <Text style={styles.addressText}>
              City: {customer?.bookingAdress?.city}
            </Text>
            <Text style={styles.addressText}>
              State: {customer?.bookingAdress?.state}
            </Text>
          </View>
          {/* End of Customer Address Section */}
          {/* Render other customer details here */}
          <Text style={styles.label}>Details:</Text>
          <Text style={styles.value}>{customer?.booking?.suggestionNote}</Text>
          <Text style={styles.label}>Quantity for Scrap Material:</Text>
          <Text style={styles.value}>
            Quantity: {customer?.booking?.estimatedWieght}
          </Text>
          {/* Status Indicator */}
          <View style={styles.statusContainer}>
            <Text style={styles.label}>Status:</Text>
            <View style={styles.statusButtons}>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  status === "Complete" && styles.activeStatusButton,
                ]}
                onPress={() => {
                  setStatus("Complete");
                  handleChangeStatus("Complete");
                }}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    status === "Complete" && styles.activeStatusButtonText,
                  ]}
                >
                  Complete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  status === "Pending" && styles.activeStatusButton,
                ]}
                onPress={() => {
                  setStatus("Pending");
                  handleChangeStatus("Pending");
                }}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    status === "Pending" && styles.activeStatusButtonText,
                  ]}
                >
                  Pending
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  status === "Cancel" && styles.activeStatusButton,
                ]}
                onPress={() => {
                  setStatus("Cancel");
                  handleChangeStatus("Cancel");
                }}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    status === "Cancel" && styles.activeStatusButtonText,
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* End of status indicator */}
          {/* Render sample images */}

          {/* End of sample images */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 15,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.WHITE,
    marginTop: 45,
  },
  detailsContainer: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: Colors.DARK_GRAY,
  },
  value: {
    fontSize: 16,
    color: Colors.GRAY,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: Colors.PRIMARY,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: Colors.RED,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.WHITE,
    marginLeft: 10,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    resizeMode: "cover",
  },
  statusContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.LIGHT_GRAY,
  },
  statusButtons: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
  statusButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  activeStatusButton: {
    backgroundColor: Colors.PRIMARY,
  },
  statusButtonText: {
    fontSize: 11,
    color: Colors.PRIMARY,
  },
  activeStatusButtonText: {
    color: Colors.WHITE,
  },
  addressContainer: {
    marginTop: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.DARK_GRAY,
  },
  addressText: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.GRAY,
  },
});

export default CustomersEditingDeletingScreen;
