import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import HomeScreen from './HomeScreen';
import ProductDetailScreen from './ProductDetailScreen';
import CheckoutScreen from './CheckoutScreen';
import PlaceholderScreen from './PlaceholderScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
    return (
        <View style={styles.drawerContent}>
            <Text style={styles.drawerHeader}>ERIC ATSU</Text>
            <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Store')}>
                <Text style={styles.drawerItemText}>Store</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Locations')}>
                <Text style={styles.drawerItemText}>Locations</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Blog')}>
                <Text style={styles.drawerItemText}>Blog</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Jewellery')}>
                <Text style={styles.drawerItemText}>Jewellery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Electronics')}>
                <Text style={styles.drawerItemText}>Electronics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Clothing')}>
                <Text style={styles.drawerItemText}>Clothing</Text>
            </TouchableOpacity>
        </View>
    );
};

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Product Details" component={ProductDetailScreen} />
            <Drawer.Screen name="Checkout" component={CheckoutScreen} />
            <Drawer.Screen name="Store" component={PlaceholderScreen} />
            <Drawer.Screen name="Locations" component={PlaceholderScreen} />
            <Drawer.Screen name="Blog" component={PlaceholderScreen} />
            <Drawer.Screen name="Jewellery" component={PlaceholderScreen} />
            <Drawer.Screen name="Electronics" component={PlaceholderScreen} />
            <Drawer.Screen name="Clothing" component={PlaceholderScreen} />
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    drawerHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    drawerItem: {
        paddingVertical: 8,
    },
    drawerItemText: {
        fontSize: 18,
    },
});

export default DrawerNavigator;
