import { View, Text,Image, ScrollView,TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import TextButton from '../../Components/TextButton'
import Header from '../../Components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {images,COLORS,SIZES, FONTS, dummydata} from '../../Components/Constants'
 const  Main = ({navigation}) => {
  return (
    <View style={{flex:1,backgroundColor:COLORS.white}}>
      <Header
      img={images.herdhelp}
      imgstyle={{
        marginTop:'18%',
        tintColor: COLORS.black,

      }}
      rightComponent={
        <View
          style={{
            justifyContent: 'center',
        marginTop:'15%'

          }}>
          <TouchableOpacity
            style={{
              marginRight: 25,
            }}
            onPress={() => navigation.navigate('MyAccount')}>
            <Image
              source={images.login}
              style={{
                width: 50,
                height: 50,
                tintColor: COLORS.lightGray2,
                marginTop: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      }
      />
      <ScrollView style={{
        // marginVertical:0, 
        width:"88%",
        marginTop:'25%',
        paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          alignSelf:"center",
          height:300
        }}>
      <TextButton
      icon={images.herd}
      label={"MY HERDS"}
      onPress={()=>{navigation.navigate("Home")}}
      buttonContainerStyle={{
          marginTop:12
      }}
          />
          <TextButton
          icon={images.add}
      label={"ADD ANIMALS"}
      onPress={()=>{navigation.navigate("Animals")}}
      buttonContainerStyle={{
        marginTop:12
    }}
          />
          <TextButton
          icon={images.med}
      label={"ADD MEDICATION"}
      onPress={()=>{navigation.navigate("medication")}}
      buttonContainerStyle={{
        marginTop:12
    }}
          />
          <TextButton
          icon={images.weight}
      label={"ADD CURRENT WEIGHT"}
      onPress={()=>{navigation.navigate("weight")}}
      buttonContainerStyle={{
        marginTop:12
    }}
          />
          <TextButton
          icon={images.money}

      label={"FINANCES"}
      onPress={()=>{navigation.navigate("FinanceInfo")}}
      buttonContainerStyle={{
        marginTop:12
    }}
          />
          <TextButton
      label={"ALERTS"}
      icon={images.bell}
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
      icon={images.logout}
      onPress={()=>{navigation.replace("Login"),AsyncStorage.clear()}}
      buttonContainerStyle={{
        marginBottom:Platform.OS=="ios"?60:30,
        backgroundColor:"#ff5b5b"
    }}
          />
          </View>
    </View>
  )
}
export default Main;