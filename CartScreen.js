import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            const cart = await AsyncStorage.getItem('cart');
            setCartItems(cart ? JSON.parse(cart) : []);
        };

        fetchCartItems();
    }, []);

    const removeFromCart = async (item) => {
        const updatedCart = cartItems.filter(cartItem => cartItem.id !== item.id);
        setCartItems(updatedCart);
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
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
                <Text style={styles.logo}>Open Fashion</Text>
                <Image source={require('./Search.png')} style={styles.searchIcon} />
            </View>
            <Text style={styles.title}>CHECKOUT</Text>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchIcon: {
        width: 24,
        height: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
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
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 16,
    },
});

export default CartScreen;
