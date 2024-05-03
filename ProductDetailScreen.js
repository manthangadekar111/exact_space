// src/screens/ProductDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetail();
  }, []);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://dummyjson.com/products/${productId}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{product.title}</Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>Price: ${product.price}</Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>{product.description}</Text>
    </View>
  );
};

export default ProductDetailScreen;
