import 'react-native-gesture-handler';
import * as React from 'react';
import {View, StatusBar, Platform} from 'react-native';
import Homenav from './Screens/Nav/Homenav';
import Rootnav from './Screens/Nav/Rootnav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import { COLORS } from './Components/Constants';
import axiosIns from './helpers/helpers';
export default function App() {
  const [Route, setRoute] = React.useState(null);
  async function retrieveData() {

    return(JSON.parse(await AsyncStorage.getItem('route')))

  }
  const fetchprofile = async () => {
    try {
      const {data} = await axiosIns.get('profile/');
      return data;
    } catch (e) {
    }
  };
  React.useEffect(() => {
    if (Route!=false ||Route!= null ){
    fetchprofile().then(data => {
      global.User = data;
    });}
  }, []);
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 4000);
    retrieveData().then(cond => {
      setRoute(cond);
    });
    
  }, [Route]);
  console.log(Route)
  return (
    <View style={{flex: 1,backgroundColor:COLORS.white}}>
      <StatusBar
        barStyle={Platform.OS == 'android' ? 'default' : 'dark-content'}
      />
      <NavigationContainer>
      {Route != false || Route != null ? (
          <Homenav />
      ) : (
          <Rootnav />
      )}
      </NavigationContainer>
    </View>
  );
}
