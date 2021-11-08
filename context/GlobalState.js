import React, { useState } from 'react'
import { ToastAndroid } from 'react-native';
import ShopContext from './shop-context';

const GlobalState = (props) => {
    const [products, setProducts] = useState([
        {
            id: 0,
            name: 'Guac de la Costa',
            description: 'tortillas de mais, fruit de la passion, mango',
            cost: 7,
            checked: 0,
            qty: 1,
        },
        {
            id: 1,
            name: 'KFC',
            description: 'Burger, Fast Food,Beverages',
            cost: 7,
            checked: 0,
            qty: 1
        },
        {
            id: 2,
            name: 'Thalappakatti',
            description: 'South indian, Chettinad,Chinese',
            cost: 7,
            checked: 0,
            qty: 1
        },
        {
            id: 3,
            name: 'Madras foods',
            description: 'Sandwich, Fast Food, Shake',
            cost: 7,
            checked: 0,
            qty: 1
        }
    ])

    const [cart, setCart] = useState([]);

    const addProductToCart = product => {
        const newItems = [...products]
        newItems[product.id].checked = (product.checked == 0) ? 1 : 1;
        const updatedCart = [...cart]
        const updatedItemIndex = updatedCart.findIndex(
            item => item.id === product.id
        );

        console.log(updatedItemIndex)

        if (updatedItemIndex < 0) {
            console.log('1st')
            // products.push({...product,quantity:1})
            updatedCart.push({ ...product, quantity: 1 });
        } else {
            const updatedItem = {
                ...updatedCart[updatedItemIndex]
            }

            if (updatedItem.quantity<=19) {
                updatedItem.quantity++;
            } 
            
            updatedCart[updatedItemIndex] = updatedItem
        }
        setCart(updatedCart)
    }

    const removeProductFromCart = productId => {
        const updatedCart = [...cart]
        const updatedItemIndex = updatedCart.findIndex(
            item => item.id === productId
        );

        const updatedItem = {
            ...updatedCart[updatedItemIndex]
        };
        updatedItem.quantity--;
        if (updatedItem.quantity <= 0) {
            const newItems = [...products]
            newItems[productId].checked = (true) ? 0 : 0;
            updatedCart.splice(updatedItemIndex, 1);
        } else {
            updatedCart[updatedItemIndex] = updatedItem;
        }
        setCart(updatedCart)
    }
    return (
        <ShopContext.Provider value={{
            products: products,
            cart: cart,
            addProductToCart: addProductToCart,
            removeProductFromCart:removeProductFromCart
        }}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default GlobalState;