import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, FlatList, ScrollView, TouchableOpacity, BackHandler } from 'react-native'
import ionIcon from 'react-native-vector-icons/Ionicons';
import featherIcon from 'react-native-vector-icons/Feather'
import { CartContext } from '../context/CartContext';
import AsyncStorage from '@react-native-community/async-storage';
import { restaurantData } from '../Data';

const ratingIcon = ionIcon.getImageSourceSync('star-outline');
const phoneIcon = featherIcon.getImageSourceSync('phone-call');
import ShopContext from '../context/shop-context';
import { Order } from '../components/Order';
const RestaurantScreen = ({ navigation, route, props }) => {

    const [qty,setQty] = useState(0)
    function onAddToCart() {
        navigation.navigate('CartScreen')
    }

    return (
        <ShopContext.Consumer>
            {context => (
                <View style={styles.container}>

                    <View style={styles.BgImg}>
                        <ImageBackground source={{ uri: 'https://www.zopofy.com/blog/wp-content/uploads/2019/02/blur-burger-close-up-460599.jpg' }} style={{ width: '100%', height: '100%', justifyContent: 'center' }} />
                    </View>

                    <View style={styles.card}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>Inka Restaurant</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Image source={ratingIcon} style={{ width: 15, height: 15, tintColor: 'grey', alignSelf: 'center' }} />
                            <Text style={{ marginLeft: 5 }}>5.0(200+) | All days : 09:00 AM - 06:00 PM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Image source={phoneIcon} style={{ width: 18, height: 18, tintColor: 'grey', alignSelf: 'center' }} />
                            <Text style={{ marginLeft: 10 }}>Reach us at : 9854562142</Text>
                        </View>
                        <View style={styles.Button}>
                            <Text style={{ color: 'white' }}>BOOK A TABLE</Text>
                        </View>
                    </View>

                    <ScrollView style={{ width: '90%', alignSelf: 'center', marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginTop: 15 }}>Starter</Text>


                        {/* ------------------------------------------------------------------------------------------------------------------ */}
                        {context.products.map(product => (
                            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '70%' }}>
                                    <Text style={{ fontSize: 16 }}>{product.name}</Text>
                                    <Text style={{ marginTop: 5 }}>{product.description}</Text>
                                    <Text style={{ marginTop: 5, color: 'orange', fontSize: 16 }}>€{product.cost}</Text>
                                </View>

                                {product.checked != 0 &&

                                    <View style={{ borderColor: '#eab882', borderWidth: 0.8, width: '25%', height: 35, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 3, }}>
                                        <TouchableOpacity onPress={context.removeProductFromCart.bind(this, product.id)} style={{ width: '30%' }}>
                                            <Text style={{ alignSelf: 'center', fontSize: 16 }}>-</Text>
                                        </TouchableOpacity>

                                        {context.cart.map((cartItem) => {
                                            return (
                                                <View>
                                                    {product.id === cartItem.id && <Text>{cartItem.quantity}</Text>}

                                                </View>
                                            )
                                        })}

                                        <TouchableOpacity onPress={context.addProductToCart.bind(this, product)} style={{ width: '30%' }}>
                                            <Text style={{ alignSelf: 'center', fontSize: 16 }}>+</Text>
                                        </TouchableOpacity>
                                    </View>

                                }

                                {product.checked == 0 ? (
                                    <TouchableOpacity onPress={context.addProductToCart.bind(this, product)} style={styles.addButton}>
                                        <Text style={{ color: 'white' }}>ADD</Text>
                                    </TouchableOpacity>
                                ) : null}


                            </View>
                        ))}
                    </ScrollView>

                    <View style={{ position: 'absolute', padding: 5, backgroundColor: '#eab882', flexDirection: 'row', alignSelf: 'center', top: '85%', borderRadius: 5, elevation: 2 }}>
                        <Image source={require('../constants/Images/dinner.png')} style={{ width: 20, height: 20 }} />
                        <Text style={{ fontWeight: 'bold', color: 'black', marginLeft: 10 }}>MENU</Text>
                    </View>

                    <TouchableOpacity onPress={onAddToCart} style={styles.bottomTab}>
                        <Image source={require('../constants/Images/shopping-cart.png')} style={{ width: 25, height: 25, tintColor: 'white' }} />
                        {context.cart.length != 0 ? (
                            <View>
                                <Text style={{ color: 'white', marginLeft: 10 }}>VIEW CART ({context.cart.reduce((cnt, curItem) => {
                                    return (cnt + curItem.quantity)
                                }, 0)} ITEMS)</Text>
                            </View>
                        ) : <Text style={{ color: 'white', marginLeft: 10 }}>VIEW CART</Text>
                        }
                    </TouchableOpacity>

                </View>
            )}
        </ShopContext.Consumer>

    )
}


export default RestaurantScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    BgImg: {
        width: '100%',
        height: '30%',
        position: 'absolute'
    },
    card: {
        width: '90%',
        elevation: 3,
        borderRadius: 2,
        marginTop: '40%',
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10,
        alignSelf: 'center'
    },
    Button: {
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#0a1e2e',
        borderRadius: 8,
        paddingHorizontal: 20,
        marginTop: 10
    },
    bottomTab: {
        width: '100%',
        padding: 10,
        backgroundColor: '#0a1e2e',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    addButton: {
        width: '25%',
        height: 35,
        padding: 7,
        alignItems: 'center',
        backgroundColor: '#0a1e2e',
        borderRadius: 7
    }
})