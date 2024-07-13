import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { getProduct } from './fakeStoreApi';

const ProductDetailScreen = ({ route }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const product = await getProduct(productId);
            setProduct(product);
        };

        fetchProduct();
    }, [productId]);

    if (!product) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Button title="Add to Cart" onPress={() => { /* Add to cart logic */ }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    productImage: {
        width: '100%',
        height: 300,
        marginBottom: 16,
        borderRadius: 8,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 20,
        color: '#888',
        marginBottom: 8,
    },
    productDescription: {
        fontSize: 16,
        marginBottom: 16,
    },
});

export default ProductDetailScreen;
