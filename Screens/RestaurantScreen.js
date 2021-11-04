import React,{useState,useEffect,useContext} from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, FlatList,ScrollView, TouchableOpacity,BackHandler } from 'react-native'
import ionIcon from 'react-native-vector-icons/Ionicons';
import featherIcon from 'react-native-vector-icons/Feather'
import { CartContext } from '../context/CartContext';
import AsyncStorage from '@react-native-community/async-storage';
import { restaurantData } from '../Data';
import { getProduct } from '../Data';
import { useFocusEffect } from '@react-navigation/core';

const ratingIcon = ionIcon.getImageSourceSync('star-outline');
const phoneIcon = featherIcon.getImageSourceSync('phone-call');
const RestaurantScreen = ({ navigation,route }) => {
    const { items, getItemsCount, getTotalPrice ,addItemToCart } = useContext(CartContext);

    const [Data,setData] = useState(restaurantData)
    const [show, setShow] = useState(false)
    const [count, setCount] = useState(1)
    const [addShow,setAddShow] = useState(true)
    const [cartData, setCartData] = useState([])
    
    useEffect(() => {
        // AsyncStorage.getItem('CartData')
        //     .then(req => JSON.parse(req))
        //     .then(json => {
        //         if (json.length != 0) {
        //             setData(json)
        //         } else {
        //             setData(restaurantData)
        //         }
        //     })
        //     .catch(error => console.log('error!'));
        
    },[])

    useFocusEffect(() => {
        // console.log('navigation response',cartData)
        // console.log()
    })
    
    function onAddToCart() {
        // console.log(product.id) 
        // addItemToCart(1);
        
        AsyncStorage.setItem('CartData', JSON.stringify(Data))
            .then(json => console.log('success!'))
            .catch(error => console.log('error!'));
        navigation.navigate('CartScreen', {total:subTotalPrice().toFixed()})

    }

    const onpressFn = (index, value) => {
        // console.log(value,index)
        const newItems = [...Data]
        newItems[index].checked = (value == 0) ? 1 : 0;
        setData(newItems)
        setAddShow(false)
    }

    const quantityHandler = (action, index) => {
        // console.log(action)
        const newItems = [...Data]

        let currentQty = newItems[index]['qty'];
        // console.log(newItems[index])
        if (action == 'more' && currentQty<20) {
            newItems[index]['qty'] = currentQty + 1;
        } else if (action == 'less'&& currentQty>1 ) {
            newItems[index]['qty'] = currentQty > 0 ? currentQty - 1 : 1;
            
        } else if (action == 'less' && currentQty == 1) {
            newItems[index].checked = 0
        }

        setData(newItems)
    }

    const subtotal = () => {
        // const { cartItems } = this.state;

        if (Data) {
            return Data.reduce((sum, item) => sum + (item.checked == 1 ? item.qty  : 0), 0);
        }
        return 0;
    }

    const subTotalPrice = () => {
        if (Data) {
            return Data.reduce((sum, item) => sum + (item.checked == 1 ? item.qty * item.cost : 0), 0);
        }
        return 0;
    }

    const renderItem = (item, index) => {
        return (
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '70%' }}>
                    <Text style={{ fontSize: 16 }}>{item.item.name}</Text>
                    <Text style={{ marginTop: 5 }}>{item.item.description}</Text>
                    <Text style={{ marginTop: 5, color: 'orange', fontSize: 16 }}>€{item.item.cost}</Text>
                </View>

                {item.item.checked != 0 && !addShow?(
                    <View style={{ borderColor: '#eab882', borderWidth: 0.8, width: '25%', height: 35, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 3, }}>
                    <TouchableOpacity onPress={quantityHandler.bind(this,'less',item.item.id)} style={{ width: '30%' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 16 }}>-</Text>
                        </TouchableOpacity>
                         <Text>{item.item.qty}</Text>
                    <TouchableOpacity onPress={quantityHandler.bind(this, 'more', item.item.id)} style={{ width: '30%' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 16 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                ):null}

                {item.item.checked==0 || addShow?(
                    <TouchableOpacity onPress={onpressFn.bind(this,item.index,item.item.checked)} style={styles.addButton}>
                        <Text style={{ color: 'white' }}>ADD</Text>
                    </TouchableOpacity>
                ):null}
            </View>
        )
    }
    return (
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

            <ScrollView style={{ width: '90%', alignSelf: 'center',marginBottom:10 }}>
                <Text style={{fontSize:18,fontWeight:'bold',color:'black',marginTop:15}}>Starter</Text>
                <FlatList
                    data={Data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </ScrollView>

            <View style={{ position: 'absolute', padding: 5, backgroundColor: '#eab882', flexDirection: 'row',alignSelf:'center',top:'85%',borderRadius:5,elevation:2 }}>
                <Image source={require('../constants/Images/dinner.png')} style={{width:20,height:20}}/>
                <Text style={{fontWeight:'bold',color:'black',marginLeft:10}}>MENU</Text>
            </View>

            <TouchableOpacity onPress={onAddToCart} style={styles.bottomTab}>
                <Image source={require('../constants/Images/shopping-cart.png')} style={{width:25,height:25,tintColor:'white'}}/>
                {subtotal().toFixed() != 0 ?(
                    <Text style={{ color: 'white', marginLeft: 10 }}>VIEW CART ({subtotal().toFixed()} ITEMS) </Text>
                ) : <Text style={{ color: 'white', marginLeft: 10 }}>VIEW CART</Text>
                }
            </TouchableOpacity>

        </View>

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
        alignSelf:'center'
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
        justifyContent:'center',
        flexDirection:'row'
    },
    addButton: {
        width: '25%',
        height:35,
        padding: 7,
        alignItems: 'center',
        backgroundColor: '#0a1e2e',
        borderRadius:7
    }
})