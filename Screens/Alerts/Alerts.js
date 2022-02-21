import { View, Text,TextInput } from 'react-native'
import React from 'react'

export default function Alerts() {
  return (
    <View style={{borderColor:"black",borderWidth:2,height:30,width:300,marginTop:200}}>
      <TextInput
      
      placeholder='hello'
      placeholderTextColor={"black"}
      />
    </View>
  )
}