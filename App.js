import 'react-native-gesture-handler';
import * as React from 'react';
import { View,StatusBar} from 'react-native';
import Homenav from "./Screens/Nav/Homenav"
import Rootnav from "./Screens/Nav/Rootnav"
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'
import axiosIns from './helpers/helpers';
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
  const fetchprofile = async () => {
      try {
        const {data} = await axiosIns.get('profile/');
        return data;
      } catch (e) {
      //  console.l("Something Went Wrong")
      }
    };
  React.useEffect(() => {
    setInterval(()=>{
      fetchprofile().then(data => {
        global.User=data;
      });
    },100000);
    })
      
  React.useEffect(() => {
    setTimeout(()=>{
      SplashScreen.hide();
    },3000)
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
