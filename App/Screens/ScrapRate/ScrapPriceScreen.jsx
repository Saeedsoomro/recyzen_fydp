import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Utils/Colors';

const ScrapPriceScreen = () => {
    const [scrapPrices] = useState([
        { id: 1, type: 'Plastic', price: '10 USD per kg', icon: 'recycle' },
        { id: 2, type: 'Paper', price: '5 USD per kg', icon: 'newspaper' },
        { id: 3, type: 'Glass', price: '15 USD per kg', icon: 'bottle-wine' },
        { id: 4, type: 'Aluminum', price: '20 USD per kg', icon: 'can' },
        { id: 5, type: 'Copper', price: '25 USD per kg', icon: 'copper-wire' },
        { id: 6, type: 'Steel', price: '18 USD per kg', icon: 'silverware-fork-knife' },
        { id: 7, type: 'Cardboard', price: '7 USD per kg', icon: 'package' },
        { id: 8, type: 'Tin', price: '12 USD per kg', icon: 'canned-food' },
        { id: 9, type: 'Lead', price: '30 USD per kg', icon: 'battery' },
        { id: 10, type: 'Brass', price: '22 USD per kg', icon: 'spray' },
        { id: 11, type: 'Bronze', price: '28 USD per kg', icon: 'trophy' },
        { id: 12, type: 'Nickel', price: '35 USD per kg', icon: 'coin' },
        { id: 13, type: 'Zinc', price: '17 USD per kg', icon: 'toolbox' },
        { id: 14, type: 'Stainless Steel', price: '23 USD per kg', icon: 'silverware-clean' },
        { id: 15, type: 'Gold', price: '100 USD per kg', icon: 'gold' },
        { id: 16, type: 'Silver', price: '50 USD per kg', icon: 'silverware-fork-knife' },
        { id: 17, type: 'Platinum', price: '200 USD per kg', icon: 'diamond' },
        { id: 18, type: 'Palladium', price: '150 USD per kg', icon: 'basket' },
        { id: 19, type: 'Rhodium', price: '300 USD per kg', icon: 'diamond-stone' },
        { id: 20, type: 'Titanium', price: '80 USD per kg', icon: 'car' },
    ]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Scrap Price Rates</Text>
            </View>
            <View style={{ height: '100%' }}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    {scrapPrices.map(scrap => (
                        <View key={scrap.id} style={styles.scrapItem}>
                            <MaterialCommunityIcons name={scrap.icon} size={24} color={Colors.PRIMARY} style={styles.icon} />
                            <View style={styles.textContainer}>
                                <Text style={styles.scrapType}>{scrap.type}</Text>
                                <Text style={styles.scrapPrice}>{scrap.price}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: Colors.LIGHT_GRAY,
    },
    headingContainer: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 20,
        paddingHorizontal: 20,
        paddingTop:50
    },
    heading: {
        color: Colors.WHITE,
        fontSize: 24,
        fontWeight: 'bold',
    },
    scrollViewContent: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    scrapItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        shadowColor: Colors.BLACK,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    icon: {
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    scrapType: {
        fontSize: 20,
        fontFamily: 'outfit-medium',
        color: Colors.PRIMARY,
    },
    scrapPrice: {
        fontSize: 16,
        fontFamily: 'outfit',
        color: Colors.DARK_GRAY,
        marginTop: 5,
    },
});

export default ScrapPriceScreen
