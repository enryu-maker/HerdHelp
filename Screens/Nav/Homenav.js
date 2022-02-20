import React, { Component } from 'react'
import { Text, StyleSheet, View,StatusBar ,Image} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../Auth/Login';
import {Signup} from "../Auth/Signup"
import { Home } from '../Home/Home';
import Add from '../Home/Add';
import { COLORS, SIZES, FONTS, images } from '../../Components/Constants';
import {Medication} from '../Home/medication';
import {Weight} from '../Home/weight';
import { Info } from '../../Components/Info';
import Addanimals from '../Livestocks/AddBreed';
import MyAccount from '../Account/MyAccount';
import MyAccountEdit from '../Account/MyAccountEdit';
import Main from '../Home/main';
import { Finance } from '../Finance/Finance';
const Stack = createNativeStackNavigator();

export default class Homenav extends Component {
  render() {
    return (
      <View style={{flex:1}}>
          <StatusBar
          style="auto"/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false}}
          initialRouteName={'Main'}>
          <Stack.Screen name='Main' component={Main} />
          <Stack.Screen name='Home' component={Home} options={{stackAnimation:"fade"}}/>
          <Stack.Screen name='Login' component={Login} options={{stackAnimation:"fade"}}/>
          <Stack.Screen name='Signup' component={Signup}options={{stackAnimation:"fade"}} />
          <Stack.Screen name='Info' component={Info} options={{stackAnimation:"default"}} />
          <Stack.Screen name='Animals' component={Addanimals} options={{stackAnimation:"default"}} />
          <Stack.Screen name='MyAccount' component={MyAccount} options={{stackAnimation:"fade"}}/>
          <Stack.Screen name='MyAccountEdit' component={MyAccountEdit} options={{stackAnimation:"fade"}}/>
          <Stack.Screen name='Add' component={Add} options={{stackAnimation:"fade"}}/>
          <Stack.Screen name='medication' component={Medication} options={{stackAnimation:"fade"}}/>
          <Stack.Screen name='weight' component={Weight} options={{stackAnimation:"fade"}}/>
          <Stack.Screen name='Finance' component={Finance} options={{stackAnimation:"fade"}}/>

        </Stack.Navigator>
      </NavigationContainer>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor:         COLORS.layout,
    borderTopRightRadius:    SIZES.padding,
    borderBottomRightRadius: SIZES.padding,
    width:                   '75%',
},
})