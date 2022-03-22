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
import Report from '../Report/Report';
import ReportOP from '../Report/ReportOP';
const Stack = createNativeStackNavigator();
import Setting from '../Setting/Setting';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WeightH from '../WeightHistory/WeightH';
import History from '../WeightHistory/History';
const Drawer = createDrawerNavigator();
import Drawercontent from './Drawercontent';
import Parents from '../Parents/Parents';
import Homenav from './Homenav';
// const DrawerNav = () => {
//   return (
//     <Drawer.Navigator initialRouteName='Draw'
//       screenOptions={{
//         headerShown: false, drawerActiveBackgroundColor: COLORS.Primary,
//         drawerActiveTintColor: COLORS.white,
//         drawerStyle:[{backgroundColor:COLORS.transparent},styles.drawerStyle],
//         drawerLabelStyle: [FONTS.body3,{letterSpacing:2}],
//         drawerType:"front",
//         overlayColor:"#0d0d0d40",    
//         backBehavior:"history",  
//         drawerStatusBarAnimation:"fade",
//       }}
//       drawerContent={props =><Drawercontent {...props}
//       drawerWidth= {SIZES.width- 120}
//       />
//     }
//     >
//       <Drawer.Screen name='Draw' component={Main} options={{
//             drawerIcon: ({ focused, size }) => (
//               <Image
//                 source={images.home}
//                 style={[{ height: 25, width: 25}]}
//               /> )       
//           }} />
//           <Drawer.Screen name='Report' component={Report} options={{
//         // drawerActiveTintColor: COLORS.white,
//             drawerIcon: ({ focused, size }) => (
//               <Image
//                 source={images.file}
//                 style={[{ height: 25, width: 25}]}
//               /> )       
//           }} />
//           <Drawer.Screen name='WeightH' component={WeightH} options={{
//         // drawerActiveTintColor: COLORS.white,
//             drawerIcon: ({ focused, size }) => (
//               <Image
//                 source={images.weight}
//                 style={[{ height: 25, width: 25}]}
//               /> )       
//           }} />
//           <Drawer.Screen name='Parents' component={Parents} options={{
//         // drawerActiveTintColor: COLORS.white,
//             drawerIcon: ({ focused, size }) => (
//               <Image
//                 source={images.setting}
//                 style={[{ height: 25, width: 25}]}
//               /> )       
//           }} />
//       </Drawer.Navigator>)}
export default class Rootnav extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <Stack.Navigator screenOptions={{ headerShown: false}}
          initialRouteName={'Login'} mode="modal">
          <Stack.Screen name='Draw' component={Homenav} />
          {/* <Stack.Screen name='Home' component={Home}/> */}
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Signup' component={Signup} />
          {/* <Stack.Screen name='Info' component={Info}/>
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
          <Stack.Screen name='History' component={History}/> */}



        </Stack.Navigator>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor:         COLORS.layout,
    borderTopRightRadius:    12,
    borderBottomRightRadius: 12,
    width:                   '80%',
},
})