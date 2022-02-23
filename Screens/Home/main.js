import { View, Text,Image, ScrollView } from 'react-native'
import React from 'react'
import TextButton from '../../Components/TextButton'
import Header from '../../Components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {images,COLORS,SIZES, FONTS, dummydata} from '../../Components/Constants'
import axiosIns from '../../helpers/helpers'
import datacat from '../../Components/Constants'
 const  Main = ({navigation}) => {
  const [animals,setAnimals] = React.useState([])
  const [loading,setLoading] = React.useState(false)
  // async function fetchanimal(){
  //   let { data } = await axiosIns.get("getcategories/")
  //   setLoading(true)
  //   return data
  // }
  // React.useEffect(()=>{
  //   if (!loading){
  //     fetchanimal().then(data=>
  //       datacat = data  )
  //   }
  //   // console.log(animals)
  // })
  return (
    <View style={{flex:1,backgroundColor:COLORS.white}}>
      <Header
      img={images.logo}
      imgstyle={{
        marginTop:'18%'
      }}/>
      <ScrollView style={{marginVertical:0, marginTop:'30%'}}>
      <TextButton
      label={"MY HERDS"}
      onPress={()=>{navigation.navigate("Home")}}
      buttonContainerStyle={{
          marginTop:12
      }}
          />
          <TextButton
      label={"ADD ANIMALS"}
      onPress={()=>{navigation.navigate("Animals")}}
      buttonContainerStyle={{
        marginTop:12
    }}
          />
          <TextButton
      label={"ADD MEDICATION"}
      onPress={()=>{navigation.navigate("medication")}}
      buttonContainerStyle={{
        marginTop:12
    }}
          />
          <TextButton
      label={"ADD CURRENT WEIGHT"}
      onPress={()=>{navigation.navigate("weight")}}
      buttonContainerStyle={{
        marginTop:12
    }}
          />
          <TextButton
      label={"FINANCES"}
      onPress={()=>{navigation.navigate("FinanceInfo")}}
      buttonContainerStyle={{
        marginTop:12
    }}
          />
          <TextButton
      label={"ALERTS"}
      onPress={()=>{navigation.navigate("Alerts")}}
      buttonContainerStyle={{
        marginTop:12,
        // width:120
    }}
          />
          
      </ScrollView>
      <View style={{flex:1,justifyContent:'flex-end'}}>
          <TextButton
      label={"LOGOUT"}
      onPress={()=>{navigation.replace("Login"),AsyncStorage.clear()}}
      buttonContainerStyle={{
        marginBottom:20
    }}
          />
          </View>
    </View>
  )
}
export default Main;