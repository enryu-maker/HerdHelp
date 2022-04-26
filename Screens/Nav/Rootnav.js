import React, { Component } from 'react'
import { Text, StyleSheet, View,StatusBar ,Image} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Auth/Login';
import {Signup} from "../Auth/Signup"

import Homenav from './Homenav';
import Subsciption from '../Auth/Subsciption'
import SubDetails from '../Subscription/SubDetails';
import Payment from '../Subscription/Payment';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
const Stack = createSharedElementStackNavigator()
export default class Rootnav extends Component {
  render() {
    return (
      <>
        <Stack.Navigator screenOptions={({navigation})=>{
          return{
            detachPreviousScreen:!navigation.isFocused(),
            headerShown: false
          }
        }}
          initialRouteName={'Login'} >
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Signup' component={Signup} />
          {/* <Stack.Screen name='DrawNav' component={Homenav} /> */}
        </Stack.Navigator>
      </>
    )
  }
}
