import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckoutScreen = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            const cart = await AsyncStorage.getItem('cart');
            setCartItems(cart ? JSON.parse(cart) : []);
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        // This useEffect will run when cartItems changes
        const saveCartItems = async () => {
            await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
        };

        saveCartItems();
    }, [cartItems]);

    const removeFromCart = async (item) => {
        const updatedCart = cartItems.filter(cartItem => cartItem.id !== item.id);
        setCartItems(updatedCart);
    };

    const renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item)}>
                <Image source={require('./remove.png')} style={styles.removeIcon} />
            </TouchableOpacity>
        </View>
    );

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('./Logo.png')} style={styles.logo} />
                <Image source={require('./Checkoutlogo.png')} style={styles.headerTitle} />
                <Image source={require('./Search.png')} style={styles.searchIcon} />
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>EST. TOTAL</Text>
                    <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutText}>CHECKOUT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        position: 'relative',
    },
    logo: {
        width: 150,
        height: 50,
        resizeMode: 'contain',
    },
    headerTitle: {
        width: 250,  // Adjust width as needed
        height: 120,  // Adjust height as needed
        resizeMode: 'contain',
        marginTop: -20,  // Move slightly up to sit below the logo
    },
    searchIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        right: 16,
        top: 30,  // Adjusted to bring it slightly down
    },
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    productInfo: {
        flex: 1,
        paddingHorizontal: 16,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF5A5F',
        marginTop: 8,
    },
    removeButton: {
        padding: 8,
    },
    removeIcon: {
        width: 24,
        height: 24,
        tintColor: '#FF5A5F',
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
    },
    totalLabel: {
        fontSize: 18,
        color: '#333',
    },
    totalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF5A5F',
    },
    checkoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
    },
    checkoutText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CheckoutScreen;
