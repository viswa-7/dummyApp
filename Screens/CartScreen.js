import React, { useState, useEffect,useContext } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, FlatList, ScrollView, TouchableOpacity,BackHandler } from 'react-native'
import ionIcon from 'react-native-vector-icons/Ionicons';
import featherIcon from 'react-native-vector-icons/Feather'
import { restaurantData } from '../Data';
import { connect } from 'react-redux';
import { CartContext } from '../context/CartContext';
import { getProduct } from '../Data';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import { PROPERTY_TYPES } from '@babel/types';
const ratingIcon = ionIcon.getImageSourceSync('star-outline');
const phoneIcon = featherIcon.getImageSourceSync('phone-call');
const backIcon = ionIcon.getImageSourceSync('arrow-back-sharp')
const CartScreen = ({navigation,route}) => {
    const { items, getItemsCount, getTotalPrice } = useContext(CartContext);

    const [Data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [count, setCount] = useState(1)
    const [showMore, setShowMore] = useState(false)
    

    // const { productId } = route.params;
    const [product, setProduct] = useState({});


    // useEffect(() => {
        

        
    //     // setProduct(getProduct(productId));
    // },[]);

    React.useEffect(() => {
        // console.log('context',product)
        AsyncStorage.getItem('CartData')
            .then(req => JSON.parse(req))
            .then(json => setData(json))
            .catch(error => console.log('error!'));
        
        console.log('data len', 
        )

        Data.map((item) => {
            if (item.checked) {
                if (item.length > 2) {
                    setShowMore(true)
                }
            }
        })

        for (let i = 0; i < Data.length; i++) {
            for (let j = 0; j < Data[i]['checked'].length; j++) {

            }

        }

        BackHandler.addEventListener("hardwareBackPress", backPress)
        return () => BackHandler.removeEventListener("hardwareBackPress",backPress)
    },[])
 
    useFocusEffect(() => {
        // console.log('show more', Data.map((item) => {
        //     if (item.checked) {
        //         console.log(item)
        //         // if (item.length > 2) {
        //         //     console.log(item.length)
        //         // }
        //     }
        // })
            
        // )
        
    })
    const quantityHandler = (action, index) => { 
        // console.log(action)
        const newItems = [...Data]

        let currentQty = newItems[index]['qty'];
        // console.log(newItems[index])
        if (action == 'more' && currentQty < 20) {
            newItems[index]['qty'] = currentQty + 1;
        } else if (action == 'less' && currentQty > 1) {
            newItems[index]['qty'] = currentQty > 0 ? currentQty - 1 : 1;

        } else if (action == 'less' && currentQty == 1) {
            Data.splice(index,1)
        }

        setData(newItems)
    }

    const backPress = () => { 
        // AsyncStorage.removeItem('CartData')
        console.log('Data in previous screen ==>', JSON.stringify(Data))
        // AsyncStorage.setItem('CartData', JSON.stringify(Data))
        //     .then(json => console.log('success!'))
        //     .catch(error => console.log('error!'));
        navigation.navigate('RestaurantScreen')
        return true
    }
    // const onpressFn = (item, index) => {
    //     // console.log(item.index)
    //     Data.map(e => {
    //         if (e.id == item.index) {

    //         }
    //         setData(Data)
    //     })
    //     // console.log('Data', Data)
    // }

    const addfn = () => {
        if (count < 20) {
            setCount(count + 1)
        }
    }

    const subFn = () => {
        if (count > 1) {
            setCount(count - 1)
        } else {
            setShow(false)
        }
    }

    const renderItem = (item, index) => {
        // console.log(item)
        return (

            <View style={{ width: '95%', alignSelf:'center'}}>
                {Data.length == 4 ? (
                    <View style={{ width: '100%' }}>
                        {item.item.checked == 1 &&
                            <View>
                                {item.index == 0 || item.index == 1 ? (
                                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, width: '100%' }}>
                                        <View style={{ width: '70%' }}>
                                            <Text style={{ fontSize: 16 }}>{item.item.name}</Text>
                                            <Text style={{ marginTop: 5 }}>{item.item.description}</Text>
                                            <Text style={{ marginTop: 5, color: 'orange', fontSize: 16 }}>€{item.item.cost}</Text>
                                        </View>

                                        {/* {item.item.show && */}
                                            <View style={{ borderColor: '#eab882', borderWidth: 0.8, width: '25%', height: 35, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 3, }}>
                                        <TouchableOpacity onPress={quantityHandler.bind(this, 'less', item.item.id)} style={{ width: '30%' }}>
                                                    <Text style={{ alignSelf: 'center', fontSize: 16 }}>-</Text>
                                                </TouchableOpacity>
                                                <Text>{item.item.qty}</Text>
                                        <TouchableOpacity onPress={quantityHandler.bind(this, 'more', item.item.id)} style={{ width: '30%' }}>
                                                    <Text style={{ alignSelf: 'center', fontSize: 16 }}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                        {/* } */}

                                        {/* {!item.item.show &&
                                            <TouchableOpacity  style={styles.addButton}>
                                                <Text style={{ color: 'white' }}>ADD</Text>
                                            </TouchableOpacity>
                                        } */}
                                
                                    </View>
                                
                                ) : null}
                            </View>
                        }
                        </View>
                ) :
                    <View style={{ width: '100%' }}>
                            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, width: '100%' }}>
                                <View style={{ width: '70%' }}>
                                    <Text style={{ fontSize: 16 }}>{item.item.name}</Text>
                                    <Text style={{ marginTop: 5 }}>{item.item.description}</Text>
                                    <Text style={{ marginTop: 5, color: 'orange', fontSize: 16 }}>€{item.item.cost}</Text>
                                </View>

                                {item.item.show &&
                                    <View style={{ borderColor: '#eab882', borderWidth: 0.8, width: '25%', height: 35, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 3, }}>
                                        <TouchableOpacity onPress={subFn} style={{ width: '30%' }}>
                                            <Text style={{ alignSelf: 'center', fontSize: 16 }}>-</Text>
                                        </TouchableOpacity>
                                        <Text>{count}</Text>
                                        <TouchableOpacity onPress={addfn} style={{ width: '30%' }}>
                                            <Text style={{ alignSelf: 'center', fontSize: 16 }}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                }

                                

                        </View>
                        </View>
                }
            </View>
        )
    }

    const separator = () => {
        return (
            <View style={{width:'95%',borderWidth:.5,height:1,borderColor:'gainsboro',alignSelf:'center'}}></View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor:'#0a1e2e',width:'100%',padding:10,alignItems:'center'}}>
               <View style={styles.headerStyle}>
                    <Image source={backIcon} style={{ width: 27, height: 27, tintColor: 'white' ,alignSelf:'center'}} />
                    <Text style={{fontWeight:'bold',fontSize:20,color:'white',marginLeft:20}}>My Cart</Text>
                </View>

                <View style={{ backgroundColor: 'white', padding: 15, alignItems: 'center', justifyContent: 'center' ,width:'50%',marginTop:50,marginBottom:20,borderRadius:5}}>
                    <Text style={{ color: '#eab882' }}>Total Cost</Text>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginTop: 5 }}>€ {route.params.total}</Text>
                </View>
            </View>

            <View style={{ backgroundColor: 'white', padding: 5, flex: 1 }}>
                <Text style={{ color: 'black', fontSize: 15 }}>Review Orders</Text>
                
                <View style={{width:'100%'}}>
                    <FlatList
                        data={Data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={separator}                    />
                    {separator()}
                    {showMore && 
                        <TouchableOpacity style={{ alignItems: 'flex-end', marginTop: 5, width: '95%', alignSelf: 'center' }}>
                            <Text style={{ textDecorationLine: 'underline', color: 'black' }}>Show More</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <TouchableOpacity style={styles.bottomTab}>
                    <Text style={{ color: 'white', marginLeft: 10 }}>PLACE ORDER</Text>
            </TouchableOpacity>
        </View>
    )
}


export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerStyle: {
        flexDirection: 'row',
        width:'100%'
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