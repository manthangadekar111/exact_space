// src/screens/ProductListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://dummyjson.com/products');
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const searchProducts = async () => {
    if (searchTerm.trim()) {
      try {
        setLoading(true);
        const response = await axios.get(`https://dummyjson.com/products/search?q=${searchTerm}`);
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error searching products:', error);
        setLoading(false);
      }
    }
  };

  const handleProductClick = (product) => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder="Search for a product..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={searchProducts}
        style={{ padding: 10, borderWidth: 1, borderColor: '#ccc', marginBottom: 10 }}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleProductClick(item)}>
              <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default ProductListScreen;

