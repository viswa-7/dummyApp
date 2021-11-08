/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import RestaurantScreen from './Screens/RestaurantScreen';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from './Screens/CartScreen';
// import CartPageDemo from './CartPageDemo';
import { Provider } from 'react-redux';
// import { CartProvider } from './context/CartContext';
const Stack = createNativeStackNavigator();
import GlobalState from './context/GlobalState';
import { VideoUploading } from './Screens/VideoUploading';
const App = (props) => {
  return (
    
    <GlobalState>
    <NavigationContainer >

      <Stack.Navigator initialRouteName="RestaurantScreen">
      <Stack.Screen
        options={{
        headerShown: false
          }}
          name="RestaurantScreen"
        component={RestaurantScreen} /> 

      <Stack.Screen
        options={{
        headerShown: false
          }}
          name="CartScreen"
        component={CartScreen} />

        {/* <Stack.Screen
          options={{
            headerShown: false
          }}
            name="VideoUploading"
          component={VideoUploading} /> */}
      </Stack.Navigator>

      </NavigationContainer>
    </GlobalState>
  )
}
export default App;
