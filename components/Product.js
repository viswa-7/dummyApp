import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'

export function Product({ name, cost, onPress }) {
    return (
        <TouchableOpacity style={{flex:1,alignItems:'center'}} onPress={onPress}>
            <View style={{flex:1}}>
                <Text>{name}</Text>
                <Text>{cost}</Text>
            </View>
        </TouchableOpacity>
    )
}