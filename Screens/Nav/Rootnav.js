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
import Alerts from '../Alerts/Alerts';
import FinanceInfo from '../Finance/FinanceInfo';
import LoadAlert from '../Alerts/LoadAlert';
import MedCard from '../../Components/MedCard';
import Report from '../Report/Report';
const Stack = createNativeStackNavigator();
import Setting from '../Setting/Setting';

export default class Rootnav extends Component {
  render() {
    return (
      <View style={{flex:1}}>
          <StatusBar
          style="auto"/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false}}
          initialRouteName={'Login'}>
          <Stack.Screen name='Main' component={Main} />
          <Stack.Screen name='Home' component={Home}/>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Signup' component={Signup} />
          <Stack.Screen name='Info' component={Info}/>
          <Stack.Screen name='Animals' component={Addanimals}  />
          <Stack.Screen name='MyAccount' component={MyAccount} />
          <Stack.Screen name='MyAccountEdit' component={MyAccountEdit} />
          <Stack.Screen name='medication' component={Medication} />
          <Stack.Screen name='weight' component={Weight} />
          <Stack.Screen name='Finance' component={Finance} />
          <Stack.Screen name='Alerts' component={Alerts} />
          <Stack.Screen name='FinanceInfo' component={FinanceInfo} />
          <Stack.Screen name='LoadAlert' component={LoadAlert}/>
          <Stack.Screen name='Add' component={Add}/>
          <Stack.Screen name='MedCard' component={MedCard}/>
          <Stack.Screen name='Setting' component={Setting}/>
          <Stack.Screen name='Report' component={Report}/>

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