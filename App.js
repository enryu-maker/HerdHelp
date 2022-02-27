import 'react-native-gesture-handler';
import * as React from 'react';
import { View,StatusBar, SafeAreaView} from 'react-native';
import Homenav from "./Screens/Nav/Homenav"
import Rootnav from "./Screens/Nav/Rootnav"
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'
var signal= true
export default function App() {
  const [Route,setRoute]=React.useState(false);
  async function retrieveData(){
    let data
      const token = await AsyncStorage.getItem('token');
      const refresh = await AsyncStorage.getItem('refresh');
      if (token !== null && refresh !== null) {
         setRoute(true);
      }
      return data;
  };
  React.useEffect(() => {
    SplashScreen.hide();
    retrieveData()
    
  },[Route]);
  return (
        <View style={{flex:1}}>
          <StatusBar
          style="auto"/>
          {
            Route?  <Homenav/> : <Rootnav/> 
          }
        </View>
        
      );
    }
