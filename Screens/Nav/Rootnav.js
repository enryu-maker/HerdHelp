import React, { Component } from 'react'
import { Text, StyleSheet, View,StatusBar,Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../Auth/Login';
import {Signup} from "../Auth/Signup"
import { Home } from '../Home/Home';
import Add from '../Home/Add';
import { COLORS, SIZES, FONTS,images } from '../../Components/Constants';
import medication from '../Home/medication';
import weight from '../Home/weight';
import { Info } from '../../Components/Info';
import AddBreed from '../Livestocks/AddBreed';
import AddPurchased from '../Livestocks/AddPurchased';
import MyAccount from '../Account/MyAccount';
import MyAccountEdit from '../Account/MyAccountEdit';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const DrawerNav = () => {
  return (
    <Drawer.Navigator initialRouteName='Home'
      screenOptions={{
        headerShown: false, drawerActiveBackgroundColor: COLORS.Primary,
        drawerActiveTintColor: COLORS.white,
        drawerStyle:[{backgroundColor:COLORS.transparent},styles.drawerStyle],
        drawerLabelStyle: [FONTS.h4,{letterSpacing:2}],
        drawerType:"front",
        overlayColor: COLORS.Primary,
        backBehavior:"history", 
        drawerStatusBarAnimation:"fade"     
      }}
    >
      <Drawer.Screen name='Home' component={Home} options={{
            drawerIcon: ({ focused, size }) => (
              <Image
                source={images.home}
                style={[{ height: 25, width: 25 }]}
              /> )       
          }} />
       <Drawer.Screen name='Add Livestock' component={Add} options={{
            drawerIcon: ({ focused, size }) => (
              <Image
                source={images.add}
                style={[{ height: 25, width: 25 }]}
              /> )       
          }} />
       <Drawer.Screen name='Update Weight' component={weight} options={{
            drawerIcon: ({ focused, size }) => (
              <Image
                source={images.weight}
                style={[{ height: 25, width: 25 }]}
              /> )       
          }} />
       <Drawer.Screen name='Add Medication' component={medication} options={{
            drawerIcon: ({ focused, size }) => (
              <Image
                source={images.med}
                style={[{ height: 25, width: 25 }]}
              /> )       
          }} />
    </Drawer.Navigator>
  )
}

export default class Rootnav extends Component {
  render() {
    return (
      <View style={{flex:1}}>
          <StatusBar
          style="auto"/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false ,}}
          initialRouteName={'Login'}>
          <Stack.Screen name='Draw' component={DrawerNav} />
          <Stack.Screen name='Login' component={Login} options={{stackAnimation:"fade"}}/>
          <Stack.Screen name='Signup' component={Signup}options={{stackAnimation:"fade"}} />
          <Stack.Screen name='Info' component={Info} options={{stackAnimation:"default"}} />
          <Stack.Screen name='Breed' component={AddBreed} options={{stackAnimation:"fade"}} />
          <Stack.Screen name='Buy' component={AddPurchased} options={{stackAnimation:"fade"}}/>
          <Stack.Screen name='MyAccount' component={MyAccount} options={{stackAnimation:"fade"}}/>
          <Stack.Screen name='MyAccountEdit' component={MyAccountEdit} options={{stackAnimation:"fade"}}/>


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