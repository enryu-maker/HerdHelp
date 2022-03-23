import 'react-native-gesture-handler';
import * as React from 'react';
import {View, StatusBar, Platform} from 'react-native';
import Homenav from './Screens/Nav/Homenav';
import Rootnav from './Screens/Nav/Rootnav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  const [Route, setRoute] = React.useState('');
  async function retrieveData() {

    return(JSON.parse(await AsyncStorage.getItem('route')))

  }
  
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 4000);
    retrieveData().then(cond => {
      setRoute(cond);
    });
    
  }, [Route]);
  // console.log(Route)
  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={Platform.OS == 'android' ? 'default' : 'dark-content'}
      />
      <NavigationContainer>
      {Route == true || Route != null ? (

          <Homenav />
      ) : (

          <Rootnav />

      )}
      </NavigationContainer>
    </View>
  );
}
