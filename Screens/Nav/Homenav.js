import React, { Component } from 'react'
import { Text, StyleSheet, View,StatusBar ,Image} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
const Stack = createNativeStackNavigator();
import Setting from '../Setting/Setting';
import Report from '../Report/Report';
import ReportOP from '../Report/ReportOP';
import WeightH from '../WeightHistory/WeightH';
import History from '../WeightHistory/History';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Parents from '../Parents/Parents';
const Drawer = createDrawerNavigator();
import Drawercontent from './Drawercontent';
const DrawerNav = () => {
  return (
    <Drawer.Navigator initialRouteName='Home'
      screenOptions={{
        headerShown: false, drawerActiveBackgroundColor: COLORS.Primary,
        drawerActiveTintColor: COLORS.white,
        drawerStyle:[{backgroundColor:COLORS.transparent},styles.drawerStyle],
        drawerLabelStyle: [FONTS.body3,{letterSpacing:2}],
        drawerType:"front",
        overlayColor: "#00000040",
        backBehavior:"history",  
        drawerStatusBarAnimation:"fade",
      }}
      drawerContent={props =><Drawercontent {...props}
      />
    }
    >
      <Drawer.Screen name='Draw' component={Main} options={{
        // drawerActiveTintColor: COLORS.white,
            drawerIcon: ({ focused, size }) => (
              <Image
                source={images.home}
                style={[{ height: 25, width: 25}]}
              /> )       
          }} />
          <Drawer.Screen name='Report' component={Report} options={{
        // drawerActiveTintColor: COLORS.white,
            drawerIcon: ({ focused, size }) => (
              <Image
                source={images.file}
                style={[{ height: 25, width: 25}]}
              /> )       
          }} />
          <Drawer.Screen name='WeightH' component={WeightH} options={{
        // drawerActiveTintColor: COLORS.white,
            drawerIcon: ({ focused, size }) => (
              <Image
                source={images.weight}
                style={[{ height: 25, width: 25}]}
              /> )       
          }} />
          <Drawer.Screen name='Setting' component={Setting} options={{
        // drawerActiveTintColor: COLORS.white,
            drawerIcon: ({ focused, size }) => (
              <Image
                source={images.setting}
                style={[{ height: 25, width: 25}]}
              /> )       
          }} />
          <Drawer.Screen name='Parents' component={Parents} options={{
        // drawerActiveTintColor: COLORS.white,
            drawerIcon: ({ focused, size }) => (
              <Image
                source={images.setting}
                style={[{ height: 25, width: 25}]}
              /> )       
          }} />
      </Drawer.Navigator>)}
export default class Homenav extends Component {
  render() {
    return (
      <View style={{flex:1}}>
          <StatusBar
          style="auto"/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false}}
          initialRouteName={'Draw'}>
          <Stack.Screen name='Draw' component={DrawerNav} />
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
          <Stack.Screen name='ReportOP' component={ReportOP}/>
          <Stack.Screen name='WeightH' component={WeightH}/>
          <Stack.Screen name='History' component={History}/>



        </Stack.Navigator>
      </NavigationContainer>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor:         COLORS.layout,
    // borderTopRightRadius:    SIZES.padding,
    borderBottomRightRadius: SIZES.padding,
    width:                   '75%',
},
})