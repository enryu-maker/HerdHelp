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
import CustomButton from './CustomButtom';
import { useDispatch, useSelector } from 'react-redux';
import Add from './Add';
import LinearGradient from 'react-native-linear-gradient';
import { getSpecies, getStatus, getTags, UserData,getHerds, getUnit } from '../../Store/actions';
import { Weight } from './weight';
import FinanceInfo from '../Finance/FinanceInfo';
import {Home} from "./Home"
import LoadAlert from '../Alerts/LoadAlert';
const BottomTab = createBottomTabNavigator();
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Update from './AddModel';
import AddModel from './AddModel';
import Setting from '../Setting/Setting';
const Main = ({navigation}) => {
  const [alerts, setAlerts] = React.useState([]);
  const [showu, setshowu] = React.useState(true);

  async function loadId() {
    global.id = await AsyncStorage.getItem('id');
  }
  async function getALerts() {
    let {data} = await axiosIns.get('alerts/');
    return data;
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
    loadId();
    getALerts().then(data => {
      setAlerts(data);
    });
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
  const User = useSelector(state=>state.Reducers.userData)
  // return (
  //   <View style={{flex: 1, backgroundColor: COLORS.white}}>
  //     <Header
  //       img={images.herdhelp}
  //       imgstyle={{
  //         width: 220,
  //         // marginRight: 50,
  //       }}
  //       leftComponent={
  //         <View
  //           style={{
  //             marginTop: 25,
  //           }}>
  //           <TouchableOpacity
  //             style={{
  //               marginLeft: 25,
  //               backgroundColor: COLORS.Primary,
  //               height: 40,
  //               width: 40,
  //               justifyContent: 'center',
  //               borderRadius: 40 / 2,
  //             }}
  //             onPress={() => {
  //               navigation.openDrawer();
  //             }}>
  //             <Image
  //               source={images.menu}
  //               style={{
  //                 width: 30,
  //                 height: 30,
  //                 padding: 5,
  //                 alignSelf: 'center',
  //                 tintColor: COLORS.white,
  //               }}
  //             />
  //           </TouchableOpacity>
  //         </View>
  //       }
  //       rightComponent={
  //         <View
  //           style={{
  //             marginTop: 20,
  //           }}>
  //           <TouchableOpacity
  //             style={{
  //               marginRight: 20,
  //               height: 50,
  //               width: 50,
  //               borderRadius: 50 / 2,
  //             }}
  //             onPress={() => {
  //               navigation.navigate('MyAccount');
  //             }}>
  //             <Image
  //               source={{uri: User?.profile_picture==null?`https://ui-avatars.com/api/?name=${User?.username}`: User?.profile_picture}}
  //               style={{
  //                 height: 50,
  //                 width: 50,
  //                 borderRadius: 50 / 2,
  //                 borderWidth: 2,
  //                 borderColor: COLORS.Primary,
  //               }}
  //             />
  //           </TouchableOpacity>
  //         </View>
  //       }
  //     />
  //     <ScrollView showsVerticalScrollIndicator={false}>
  //       <View
  //         style={{
  //           width: '88%',
  //           marginTop: 40,
  //           paddingVertical: SIZES.padding,
  //           paddingHorizontal: SIZES.radius,
  //           borderRadius: SIZES.radius,
  //           backgroundColor: COLORS.lightGray2,
  //           alignSelf: 'center',
  //           marginBottom: SIZES.height > 700 ? 37 : 50,
  //         }}>
  //         <ScrollView showsVerticalScrollIndicator={false}>
  //           <CustomButton
  //             icon={images.heart}
  //             label={'MY HERDS'}
  //             onPress={() => {
  //               navigation.navigate('Home');
  //             }}
  //             buttonContainerStyle={{
  //               marginTop: 18,
  //               height: SIZES.height > 700 ? 75 : 60,

  //               // alignSelf:"flex-start"
  //             }}
  //             label2
  //             buttonContainerStyle2={{
  //               backgroundColor: COLORS.Primary,
  //               marginRight: 0,
  //             }}
  //           />
  //           <CustomButton
  //             icon={images.add}
  //             label={'ADD ANIMALS'}
  //             onPress={() => {
  //               navigation.navigate('Animals');
  //             }}
  //             buttonContainerStyle={{
  //               marginTop: 12,
  //               height: SIZES.height > 700 ? 75 : 60,
  //             }}
  //             label2
  //             buttonContainerStyle2={{
  //               backgroundColor: COLORS.Primary,
  //               marginRight: 0,
  //             }}
  //           />
  //           <CustomButton
  //             icon={images.med}
  //             label={'ADD MEDICATION'}
  //             onPress={() => {
  //               navigation.navigate('medication', {
  //                 cond: true,
  //               });
  //             }}
  //             buttonContainerStyle={{
  //               marginTop: 12,
  //               height: SIZES.height > 700 ? 75 : 60,
  //             }}
  //             label2
  //             buttonContainerStyle2={{
  //               backgroundColor: COLORS.Primary,
  //               marginRight: 0,
  //             }}
  //           />
  //           <CustomButton
  //             icon={images.weight}
  //             label={'UPDATE WEIGHT'}
  //             onPress={() => {
  //               navigation.navigate('weight');
  //             }}
  //             buttonContainerStyle={{
  //               marginTop: 12,
  //               height: SIZES.height > 700 ? 75 : 60,
  //             }}
  //             label2
  //             buttonContainerStyle2={{
  //               backgroundColor: COLORS.Primary,
  //               marginRight: 0,
  //             }}
  //           />
  //           <CustomButton
  //             icon={images.money}
  //             label={'FINANCES'}
  //             onPress={() => {
  //               navigation.navigate('FinanceInfo');
  //             }}
  //             buttonContainerStyle={{
  //               marginTop: 12,
  //               height: SIZES.height > 700 ? 75 : 60,
  //             }}
  //             label2
  //             buttonContainerStyle2={{
  //               backgroundColor: COLORS.Primary,
  //               marginRight: 0,
  //             }}
  //           />
  //           <CustomButton
  //             label={`ALERTS  `}
  //             icon={images.bell}
  //             iconStyle={{
  //               tintColor: alerts?.length > 0 ? COLORS.red : COLORS.white,
  //             }}
  //             onPress={() => {
  //               navigation.navigate('LoadAlert');
  //             }}
  //             label2={`${alerts?.length}`}
  //             buttonContainerStyle2={{
  //               backgroundColor: alerts?.length > 0 ? COLORS.red : COLORS.Primary,
  //               justifyContent: 'center',
  //               alignSelf: 'center',
  //             }}
  //             label2Style={{
  //               color: alerts?.length > 0 ? COLORS.white : COLORS.Primary,
  //               justifyContent: 'center',
  //               alignSelf: 'center',
  //             }}
  //             buttonContainerStyle={{
  //               marginTop: 12,
  //               marginBottom: 20,
  //               height: SIZES.height > 700 ? 75 : 60,
  //             }}
  //           />
  //         </ScrollView>
  //       </View>
  //     </ScrollView>
  //   </View>
  // );
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
            iconColor=focused ? COLORS.Primary : COLORS.white
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
          height: 110,
          borderTopLeftRadius: SIZES.padding,
          borderTopRightRadius: SIZES.padding,
          backgroundColor: COLORS.Primary,
        },
        tabBarActiveTintColor: COLORS.transparentPrimary2,
        tabBarInactiveTintColor: COLORS.black,
      })}>
      <BottomTab.Screen name="Herds" component={Home} options={{
        
      }}/>
      <BottomTab.Screen name="Finance" component={FinanceInfo} />
      <BottomTab.Screen name="Add" component={AddModel} />
      <BottomTab.Screen name="Alerts" component={LoadAlert}/>
      <BottomTab.Screen name="Settings" component={Setting} />


    </BottomTab.Navigator>
    </>
  );
};
export default Main;
