import 'react-native-gesture-handler';
import { StripeProvider } from '@stripe/stripe-react-native';
import * as React from 'react';
import {View, StatusBar, Platform} from 'react-native';
import Homenav from './Screens/Nav/Homenav';
import Rootnav from './Screens/Nav/Rootnav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import { COLORS } from './Components/Constants';
import axiosIns from './helpers/helpers';
import axios from 'axios';
const Route = React.createContext()
export default function App() {
  const [Route, setRoute] = React.useState("");
  const [pub, setPub] = React.useState("");


  async function retrieveData() {
    return(JSON.parse(await AsyncStorage.getItem('route')))
  }
  async function getPubKey(){
    let {data}= await axios.get('payments/getpubkey/')
    return data
  }
  const fetchprofile = async () => {
    try {
      const {data} = await axiosIns.get('profile/');
      return data;
    } catch (e) {
    }
  };
  // React.useEffect(() => {
  //   if (Route == true ||Route != null ){
  //   fetchprofile().then(data => {
  //     global.User = data;
  //   });}
  // }, []);
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 4000);
    retrieveData().then(cond => {
      setRoute(cond);
      if (cond == true ||cond != null ){
        fetchprofile().then(data => {
          global.User = data;
        });}
    });
    getPubKey().then(data=>{
      setPub(data)
    })
    
  }, [Route]);

  return (
    <StripeProvider publishableKey={pub}>
    <View style={{flex: 1,backgroundColor:COLORS.white}}>
      <StatusBar
        barStyle={Platform.OS == 'android' ? 'default' : 'dark-content'}
        backgroundColor={COLORS.Primary}
      />
      <NavigationContainer>
      {Route == true || Route != null ? (
          <Homenav/>
      ) : (
          <Rootnav/>
      )}
      </NavigationContainer>
    </View>
    </StripeProvider>
  );
}
