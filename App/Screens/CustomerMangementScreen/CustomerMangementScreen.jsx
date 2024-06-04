import { useUser } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../../Utils/Colors';

const CustomerManagementScreen = () => {
    const { user } = useUser();
    const navigation = useNavigation();

    const [customerOrders, setCustomerOrders] = useState([
        // Sample customer orders data
        { id: 1, customerName: 'Customer 1', orderDetails: 'Order 1 details', status: 'completed' },
        { id: 2, customerName: 'Customer 2', orderDetails: 'Order 2 details', status: 'pending' },
        { id: 3, customerName: 'Customer 3', orderDetails: 'Order 3 details', status: 'canceled' },
        { id: 4, customerName: 'Customer 4', orderDetails: 'Order 4 details', status: 'completed' },
        { id: 5, customerName: 'Customer 5', orderDetails: 'Order 5 details', status: 'pending' },
        { id: 6, customerName: 'Customer 6', orderDetails: 'Order 6 details', status: 'canceled' },
        // Add more customer orders as needed
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showOptionsModal, setShowOptionsModal] = useState(false);

    const handleBookmarkPress = () => {
        navigation.navigate('CustomerManagement');
    };

    const handleViewAllOrders = () => {
        // Logic to navigate to the screen to view all customer orders
        // Replace 'ViewAllOrdersScreen' with the appropriate screen name
        navigation.navigate('ViewAllOrdersScreen', { orders: customerOrders });
    };

    const handleEditCustomer = () => {
        // Logic to navigate to the editing screen
        // Pass the selected customer as a parameter to the editing screen
        navigation.navigate('CustomersEditingDeletingScreen', { customer: selectedCustomer });
        setShowOptionsModal(false);
    };


    const handleDeleteCustomer = () => {
        // Logic to navigate to the deletion screen
        // Pass the selected customer as a parameter to the deletion screen
        navigation.navigate('CustomersEditingDeletingScreen', { customer: selectedCustomer });
        setShowOptionsModal(false);
    };

    // Filter customer orders based on search query
    const filteredCustomerOrders = customerOrders.filter(order =>
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Render status indicator based on order status
    const renderStatusIndicator = (status) => {
        let color;
        switch (status) {
            case 'completed':
                color = 'green';
                break;
            case 'pending':
                color = 'orange';
                break;
            case 'canceled':
                color = 'red';
                break;
            default:
                color = 'gray';
        }
        return <View style={[styles.statusIndicator, { backgroundColor: color }]} />;
    };

    // Function to handle click on the three dots to show options modal
    const handleOptionsPress = (customer) => {
        setSelectedCustomer(customer);
        setShowOptionsModal(true);
    };

    return user && (
        <View style={{ height: '100%' }}>
            <View style={styles.container}>
                <View style={styles.profileMainContainer}>
                    <View style={styles.profileContainer}>
                        <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
                        <View>
                            <Text style={{ color: Colors.WHITE, fontFamily: 'outfit' }}>Welcome,Admin</Text>
                            <Text style={{ color: Colors.WHITE, fontSize: 20, fontFamily: 'outfit-medium' }}>{user?.fullName}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleBookmarkPress}>
                        <FontAwesome name="bookmark-o" size={27} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.searchBarContainer}>
                    <TextInput
                        placeholder='Search'
                        style={styles.textInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <FontAwesome name="search" style={styles.searchbtn} size={24} color={Colors.PRIMARY} />
                </View>
                <Text style={styles.ordersHeading}>Customers Orders</Text>
                <TouchableOpacity onPress={handleViewAllOrders} style={styles.viewAllLink}>
                    <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {filteredCustomerOrders.map(order => (
                    <TouchableOpacity key={order.id} style={styles.orderItem}>
                        <View style={styles.orderDetails}>
                            <Text style={styles.orderItemText}>{order.customerName}</Text>
                            {renderStatusIndicator(order.status)}
                            <TouchableOpacity onPress={() => handleOptionsPress(order)}>
                                <FontAwesome name="ellipsis-v" size={20} color={Colors.PRIMARY} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.orderDetailsText}>{order.orderDetails}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {/* Options Modal */}
            <Modal
                visible={showOptionsModal}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setShowOptionsModal(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={handleEditCustomer}>
                            <Text style={styles.optionText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDeleteCustomer}>
                            <Text style={[styles.optionText, { color: 'red' }]}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    profileMainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    textInput: {
        padding: 7,
        paddingHorizontal: 16,
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        width: '85%',
        fontSize: 16,
        fontFamily: 'outfit'
    },
    searchBarContainer: {
        marginTop: 15,
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10
    },
    searchbtn: {
        backgroundColor: Colors.WHITE,
        padding: 10,
        borderRadius: 8
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 99
    },
    ordersHeading: {
        color: Colors.WHITE,
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10
    },
    orderItem: {
        margin: 12,
        backgroundColor: Colors.WHITE,
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    orderDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    orderItemText: {
        fontSize: 16,
        fontFamily: 'outfit-medium'
    },
    orderDetailsText: {
        fontSize: 14,
        fontFamily: 'outfit',
        color: Colors.GRAY
    },
    viewAllLink: {
        alignSelf: 'flex-end',
        marginTop: 10
    },
    viewAllText: {
        color: Colors.WHITE,
        textDecorationLine: 'underline',
        fontSize: 16
    },
    statusIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        backgroundColor: Colors.WHITE,
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center'
    },
    optionText: {
        fontSize: 18,
        fontFamily: 'outfit-medium',
        paddingVertical: 10
    }
});

export default CustomerManagementScreen;