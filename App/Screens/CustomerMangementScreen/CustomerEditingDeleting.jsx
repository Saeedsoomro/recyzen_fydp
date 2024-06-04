import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../Utils/Colors';

// Custom Header component
const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Customer Details</Text>
        </View>
    );
};

const CustomersEditingDeletingScreen = ({ navigation, route }) => {
    const { customer } = route.params;
    const [status, setStatus] = useState(customer.status);

    const handleEditCustomer = () => {
        // Logic to edit the selected customer with updated status
        console.log('Edit customer with status:', { ...customer, status });
        // Replace the below logic with your edit implementation
        // For demonstration purposes, let's update the customer details with the new status
        // navigation.navigate('EditCustomerScreen', { ...customer, status });
    };

    const handleDeleteCustomer = () => {
        // Logic to delete the selected customer
        console.log('Delete customer:', customer);
        // Replace the below logic with your delete implementation
        // For demonstration purposes, let's navigate back to the previous screen
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Custom Header */}
            <Header />
            {/* End of Custom Header */}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Customer Name: Saeed Jan</Text>
                    {/* Customer Address Section */}
                    <View style={styles.addressContainer}>
                        <Text style={styles.subHeading}>Customer Address:</Text>
                        <Text style={styles.addressText}>Street Name: 1 {customer.address?.street}</Text>
                        <Text style={styles.addressText}>Phone Number: 020139021390 {customer.address?.phoneNumber}</Text>
                        <Text style={styles.addressText}>Floor Unit: 23 {customer.address?.floorUnit}</Text>
                        <Text style={styles.addressText}>Postal Code: 221 {customer.address?.postalCode}</Text>
                        <Text style={styles.addressText}>City: karachi {customer.address?.city}</Text>
                        <Text style={styles.addressText}>State: xy {customer.address?.state}</Text>
                        <Text style={styles.addressText}>Country: pakistan {customer.address?.country}</Text>
                    </View>
                    {/* End of Customer Address Section */}
                    {/* Render other customer details here */}
                    <Text style={styles.label}>Shipments Details:</Text>
                    <Text style={styles.value}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula massa non convallis lobortis. Nam ac purus vel dolor ultricies malesuada.</Text>
                    <Text style={styles.label}>Quantity for Scrap Material:</Text>
                    <Text style={styles.value}>Quantity: {customer.scrapQuantity}</Text>
                    {/* Status Indicator */}
                    <View style={styles.statusContainer}>
                        <Text style={styles.label}>Status:</Text>
                        <View style={styles.statusButtons}>
                            <TouchableOpacity
                                style={[styles.statusButton, status === 'Complete' && styles.activeStatusButton]}
                                onPress={() => setStatus('Complete')}>
                                <Text style={[styles.statusButtonText, status === 'Complete' && styles.activeStatusButtonText]}>Complete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.statusButton, status === 'Pending' && styles.activeStatusButton]}
                                onPress={() => setStatus('Pending')}>
                                <Text style={[styles.statusButtonText, status === 'Pending' && styles.activeStatusButtonText]}>Pending</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.statusButton, status === 'Cancel' && styles.activeStatusButton]}
                                onPress={() => setStatus('Cancel')}>
                                <Text style={[styles.statusButtonText, status === 'Cancel' && styles.activeStatusButtonText]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* End of status indicator */}
                    {/* Render sample images */}
                    <Text style={[styles.label, { marginTop: 10 }]}>Sample Images:</Text>
                    <View style={styles.imageContainer}>
                        <Image source={require('../../images/image1.jpg')} style={styles.image} />
                        <Image source={require('../../images/image2.jpg')} style={styles.image} />
                        <Image source={require('../../images/image3.jpg')} style={styles.image} />
                    </View>
                    {/* End of sample images */}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEditCustomer}>
                        <FontAwesome name="edit" size={20} color={Colors.WHITE} />
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteCustomer}>
                        <FontAwesome name="trash" size={20} color={Colors.WHITE} />
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
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
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
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
        fontWeight: 'bold',
        marginBottom: 5,
        color: Colors.DARK_GRAY,
    },
    value: {
        fontSize: 16,
        color: Colors.GRAY,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
        fontWeight: 'bold',
        color: Colors.WHITE,
        marginLeft: 10,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 15,
        resizeMode: 'cover',
    },
    statusContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: Colors.LIGHT_GRAY,
    },
    statusButtons: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
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
        fontWeight: 'bold',
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