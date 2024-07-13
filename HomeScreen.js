import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getProducts } from './fakeStoreApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts();
            setProducts(products);
        };

        fetchProducts();
    }, []);

    const addItemToCart = async (item) => {
        let cartItems = await AsyncStorage.getItem('cart');
        cartItems = cartItems ? JSON.parse(cartItems) : [];
        cartItems.push(item);
        await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
    };

    const renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Product Details', { productId: item.id })}
                style={styles.imageContainer}
            >
                <Image source={{ uri: item.image }} style={styles.productImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addItemToCart(item)}>
                <Image source={require('./add_circle.png')} style={styles.plusIcon} />
            </TouchableOpacity>
            <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Image source={require('./Menu.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.logo}>Open Fashion</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
                        <Image source={require('./Cart.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <Image source={require('./Search.png')} style={styles.icon} />
                </View>
            </View>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={styles.row}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 16,
    },
    row: {
        flex: 1,
        justifyContent: 'space-between',
    },
    productContainer: {
        flex: 1,
        margin: 8,
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    imageContainer: {
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    plusIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 30,
        height: 30,
    },
    productInfo: {
        marginTop: 8,
        alignItems: 'center',
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 16,
        color: '#FF5A5F',
        fontWeight: 'bold',
        marginTop: 4,
        textAlign: 'center',
    },
});

export default HomeScreen;
