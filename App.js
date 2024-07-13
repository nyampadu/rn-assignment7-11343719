import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import CheckoutScreen from './CheckoutScreen';
import ProductDetailScreen from './ProductDetailScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
    const [checkoutItems, setCheckoutItems] = useState([]);

    const addItemToCheckout = async (item) => {
        const itemExists = checkoutItems.find(checkoutItem => checkoutItem.id === item.id);
        const updatedCheckoutItems = itemExists
            ? checkoutItems.map(checkoutItem =>
                checkoutItem.id === item.id ? { ...checkoutItem, quantity: checkoutItem.quantity + 1 } : checkoutItem
            )
            : [...checkoutItems, { ...item, quantity: 1 }];
        setCheckoutItems(updatedCheckoutItems);
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCheckoutItems));
    };

    const removeItemFromCheckout = async (itemId) => {
        const updatedCheckoutItems = checkoutItems.map(item =>
            item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0);
        setCheckoutItems(updatedCheckoutItems);
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCheckoutItems));
    };

    function MainStack() {
        return (
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home">
                    {props => <HomeScreen {...props} addItemToCheckout={addItemToCheckout} />}
                </Stack.Screen>
                <Stack.Screen name="Product Details" component={ProductDetailScreen} />
                <Stack.Screen name="Checkout">
                    {props => (
                        <CheckoutScreen
                            {...props}
                            checkoutItems={checkoutItems}
                            removeItemFromCheckout={removeItemFromCheckout}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        );
    }

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={MainStack} />
                <Drawer.Screen name="Checkout">
                    {props => (
                        <CheckoutScreen
                            {...props}
                            checkoutItems={checkoutItems}
                            removeItemFromCheckout={removeItemFromCheckout}
                        />
                    )}
                </Drawer.Screen>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
