import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {images, COLORS, SIZES, FONTS} from '../../Components/Constants';
import axiosIns from '../../helpers/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecies, getStatus, getTags, UserData,getHerds, getUnit, getFinance,getAlerts, getFcat } from '../../Store/actions';
import FinanceInfo from '../Finance/FinanceInfo';
import {Home} from "./Home"
import LoadAlert from '../Alerts/LoadAlert';
const BottomTab = createBottomTabNavigator();
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import AddModel from './AddModel';
import Setting from '../Setting/Setting';
const Main = ({navigation}) => {
  const alerts = useSelector(state=>state.Reducers.fcat)
  async function loadId() {
    global.id = await AsyncStorage.getItem('id');
  }
  async function checkSubs() {
    let {data} = await axiosIns.get('subscriptions/isactive/');
    return data;
  }
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getStatus())
    dispatch(UserData())
    dispatch(getSpecies())
    dispatch(getTags())
    dispatch(getHerds())
    dispatch(getUnit())
    dispatch(getAlerts())
    dispatch(getFinance())
    dispatch(getFcat())
    loadId();
    checkSubs().then(data => {
      global.isActive = data.isactive;
      !data.isactive
        ? navigation.navigate('Subscription', {
            msg: 'No Active Subscription Please Purchase the Tier',
            cond: true,
          })
        : null;
    });
  }, []);
  
  let iconweight;
  return (
    <>
    <BottomTab.Navigator

      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let iconColor;
          if (route.name === 'Herds') {
            iconName = focused ? images.heart : images.heart
            iconColor=focused ? COLORS.Primary : COLORS.white
            iconweight=focused ? "700": null

          } else if (route.name === 'Settings') {
            iconName = focused ? images.setting : images.setting;
            iconColor=focused ? COLORS.Primary : COLORS.white
            iconweight=focused ? "700": null


          } else if (route.name === 'Finance') {
            iconName = focused ? images.coin :images.coin
            iconColor=focused ? COLORS.Primary : COLORS.white
            iconweight=focused ? "700": null


          }
          else if (route.name === 'Alerts') {
            iconName = focused ? images.bell :images.bell
            iconColor=focused ? COLORS.Primary :alerts?.length==0? COLORS.red : COLORS.white 
            iconweight=focused ? "700": null


          }
          else if (route.name === 'Add') {
            iconName = focused ? images.add :images.add
            iconColor=focused ? COLORS.Primary : COLORS.white
            iconweight=focused ? "700": null
          }

          return (
            <View
              style={{
                height: 40,
                width: 40,
                backgroundColor: focused ? COLORS.transparentPrimary : COLORS.Primary,
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 12,
              }}>
                
              <Image
                source={iconName}
                style={{
                  alignSelf: 'center',
                  height: 25,
                  width: 25,
                  tintColor:iconColor
                }}
              />                
            </View>
          );
        },
        tabBarLabelStyle: {
          ...FONTS.body4,
          fontWeight:iconweight
        },
        tabBarStyle: {
          height:SIZES.height>700?110:75,
          backgroundColor: COLORS.Primary,
        },
        tabBarActiveTintColor: COLORS.transparentPrimary2,
        tabBarInactiveTintColor: COLORS.black,
      })}>
      <BottomTab.Screen name="Herds" component={Home}/>
      <BottomTab.Screen name="Finance" component={FinanceInfo} />
      <BottomTab.Screen name="Add" component={AddModel} />
      <BottomTab.Screen name="Alerts" component={LoadAlert}/>
      <BottomTab.Screen name="Settings" component={Setting} />
    </BottomTab.Navigator>
    </>
  );
};
export default Main;
