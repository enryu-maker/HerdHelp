import { View, Text } from 'react-native'
import React,{useContext} from 'react'
import Homenav from './Homenav'
import Rootnav from './Rootnav'
import {NavigationContainer} from '@react-navigation/native';
import { Cond } from '../../App';
export default function Routes({
    value
}) {
    // const value = useContext(Cond)
  return (
    <View style={{
        flex:1
    }}>
      <NavigationContainer>
      {value ?<Homenav/> : <Rootnav/>}
      </NavigationContainer>
    </View>
  )
}