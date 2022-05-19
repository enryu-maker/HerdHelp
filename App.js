// import 'react-native-gesture-handler';
import {StripeProvider} from '@stripe/stripe-react-native';
// import * as React from 'react';
// import {View, StatusBar, Platform,ActivityIndicator} from 'react-native';
// // import Homenav from './Screens/Nav/Homenav';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Rootnav from './Screens/Nav/Rootnav';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
// import {NavigationContainer} from '@react-navigation/native';
// import {COLORS} from './Components/Constants';
// import axiosIns from './helpers/helpers';
import {baseURL} from './helpers/helpers';
import {request, PERMISSIONS, requestMultiple} from 'react-native-permissions';
import FlashMessage from 'react-native-flash-message';
import axios from 'axios';
// import {Provider, useDispatch, useSelector} from 'react-redux';
// import {store} from './Store';
// import { Init } from './Store/actions';
// import { Signup } from './Screens/Auth/Signup';
// import LoginScreen from './Screens/Auth/Login';
// export const Permission = React.createContext();
// export const Access = React.createContext();
// export default function App() {
//   const [Route, setRoute] = React.useState('');
//   const [pub, setPub] = React.useState('');
//   const [PermissionResult, setPermissionResult] = React.useState(null);
//   const [access, setAccess] = React.useState('');

//   async function retrieveData() {
//     setAccess(await AsyncStorage.getItem('token'));
//     return JSON.parse(await AsyncStorage.getItem('route'));
//   }
//   async function getPubKey() {
//     let {data} = await axios.get(baseURL + 'payments/getpubkey/');
//     return data;
//   }
//   const fetchprofile = async () => {
//     try {
//       const {data} = await axiosIns.get('profile/');
//       return data;
//     } catch (e) {}
//   };

//   // React.useEffect(() => {
//   //   setTimeout(() => {
//   //     SplashScreen.hide();
//   //   }, 4000);
//   //   retrieveData().then(cond => {
//   //     setRoute(cond);
//   //     if (cond == true || cond != null) {
//   //       fetchprofile().then(data => {
//   //         global.User = data;
//   //       });
//   //     }
//   //   });
//   //   getPubKey().then(data => {
//   //     setPub(data.pub_key);
//   //   });
//   // }, [Route]);
//   requestMultiple(
//     Platform.OS === 'ios'
//       ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]
//       : [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION],
//   ).then(result => {
//     setPermissionResult(result);
//   });
// const Stack = createNativeStackNavigator();

//   const Homenav=()=>{
//     return(
//         <Stack.Navigator screenOptions={{ headerShown: false}}
//           initialRouteName={'Signup'}>
//           <Stack.Screen name='Signup' component={Signup} />
//           </Stack.Navigator>

//     )
//   }
//   const Lognav=()=>{
//     return(
//         <Stack.Navigator screenOptions={{ headerShown: false}}
//           initialRouteName={'Login'}>
//           <Stack.Screen name='Login' component={LoginScreen} />
//           </Stack.Navigator>

//     )
//   }
//   const RootNavigation = () => {
//     const token = useSelector(state => state.Reducers.authToken);
//     console.log(token);
//     const [loading, setLoading] = React.useState(true);

//     const dispatch = useDispatch();
//     const init =  () => {
//        dispatch(Init());
//       setLoading(false);
//     }

//     // React.useEffect(() => {
//     //   init()
//     // }, [])

//     // if (loading) {
//     //   return (
//     //     <View style={{flex: 1, justifyContent: 'center'}}>
//     //       <ActivityIndicator size="large" color={COLORS.Primary} />
//     //     </View>
//     //   )
//     // }
//     return (
//       <View style={{flex: 1, backgroundColor: COLORS.white}}>
//         <FlashMessage position="top" />
//         <NavigationContainer>
//           {token === null ? <Rootnav/> :<Homenav/>}
//         </NavigationContainer>
//       </View>
//     );
//   };
//   return (
//     <Provider store={store}>
//       <StripeProvider publishableKey={pub}>
//         <Permission.Provider value={PermissionResult}>
//           <Access.Provider value={access}>
//             <StatusBar
//               barStyle={Platform.OS == 'android' ? 'default' : 'dark-content'}
//               backgroundColor={'black'}
//             />
//             <RootNavigation />
//           </Access.Provider>
//         </Permission.Provider>
//       </StripeProvider>
//     </Provider>
//   );
// }

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, View} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {Init} from './Store/actions';
import {store} from './Store';
import {ActivityIndicator} from 'react-native-paper';
import {COLORS} from './Components/Constants';
import Homenav from './Screens/Nav/Homenav';
import Rootnav from './Screens/Nav/Rootnav';
import {enableScreens} from 'react-native-screens';

const RootNavigation = () => {
  const token = useSelector(state => state.Reducers.authToken);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(Init());
    setLoading(false);
  };

  useEffect(() => {
    enableScreens(false);
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    init();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.Primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <FlashMessage position="top" />

      {token === null ? <Rootnav /> : <Homenav />}
    </NavigationContainer>
  );
};
export const Permission = React.createContext();
export const Access = React.createContext();
const App = () => {
  async function getPubKey() {
    let {data} = await axios.get(baseURL + 'payments/getpubkey/');
    console.log(data)
    return data;
  }
  React.useEffect(()=>{
    getPubKey().then(data=>{
      // console.log(data)
      setPub(data)
    })
  },[])
  const [pub, setPub] = React.useState('');
  const [PermissionResult, setPermissionResult] = React.useState(null);
  requestMultiple(
    Platform.OS === 'ios'
      ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]
      : [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION],
  ).then(result => {
    setPermissionResult(result);
  });
  // console.log(pub)

  return (
    <Provider store={store}>
      <StripeProvider publishableKey={"pk_test_51KkRiWSCRjhQ59aV02LeMYb4qDlPbjYjDzNg6tkqbQaslExRye4QO9m1Do7FgnuAeKmVzpvTAjbVKQYnPANExl900000675L28"}>
        <Permission.Provider value={PermissionResult}>
          <StatusBar
            barStyle={Platform.OS == 'android' ? 'default' : 'dark-content'}
            backgroundColor={'black'}
          />
          <RootNavigation />
        </Permission.Provider>
      </StripeProvider>
    </Provider>
  );
};

export default App;
