import 'react-native-gesture-handler';
import * as React from 'react';
import { View,StatusBar} from 'react-native';
import Homenav from "./Screens/Nav/Homenav"
import Rootnav from "./Screens/Nav/Rootnav"
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'
import axiosIns from './helpers/helpers';

export default function App() {
  const [Route,setRoute]=React.useState("");
  async function retrieveData(){
    var data = (JSON.parse(await AsyncStorage.getItem('route')))
    var cond
    if (data==true){
      return cond="true"
    }
    else if (data==false){
      return cond="false"
    }
    else{
      return cond="null"
    }
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
      fetchprofile().then(data => {
        global.User=data;
      });
    },[])
  React.useEffect(() => {
    setTimeout(()=>{
      SplashScreen.hide();
    },2000)
    retrieveData().then(cond=>{
      setRoute(cond)
    })
  },[Route]);
  return (
        <View style={{flex:1}}>
          <StatusBar 
          barStyle="default"
          />
          {
            Route=="true" || Route!='null'?<Homenav/>:<Rootnav/>
          }
        </View>
        
      );
    }
