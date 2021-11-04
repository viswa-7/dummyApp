import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { restaurantData } from '../Data';
import { Product } from '../components/Product';

export function ProductList({ navigation }) {
    function renderProduct({ item: product }) {
        return (
            <Product {...product}
                onPress
            />
        )
    }

    return (
        <FlatList
            style={{ borderStartColor: '#eeeeee' }}
            contentContainerStyle={{ backgroundColor: '#eeeeee', paddingVertical: 8, marginHorizontal: 8 }}
            keyExtractor={(item) => item.id.toString()}
            data={restaurantData}
            renderItem={renderProduct}
        />
    )
}