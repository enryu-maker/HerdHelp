import 'react-native-gesture-handler';
import * as React from 'react';
import { View,StatusBar, SafeAreaView} from 'react-native';
import Homenav from "./Screens/Nav/Homenav"
import Rootnav from "./Screens/Nav/Rootnav"
var signal= false
export default function App() {
  
  return (
        <View style={{flex:1,}}>
          <StatusBar
          style="dark"/>
          {
            signal? <Rootnav/> : <Homenav/>
          }
        </View>
        
      );
    }
