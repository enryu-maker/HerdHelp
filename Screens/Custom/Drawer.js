import {
  View,
  Text,
  Modal,
  Animated,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, images, SIZES} from '../../Components/Constants';
import {Caption, Title} from 'react-native-paper';
import LineDivider from '../../Components/LineDivider';
import DrawerCard from './DrawerCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosIns from '../../helpers/helpers';
import react from 'react';
export default function Drawer({setShow, show, navigation}) {
  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={show}
      onRequestClose={() => {
        setShow(false);
      }}>
      <View
        style={{
          height: '100%',
          width: '100%',
        backgroundColor:"#00000040",
          flexDirection: 'row',
        }}
        // onTouchStart={()=>{setShow(false)}}
        >
        <View
          style={{
            width: '75%',
            backgroundColor: COLORS.white,
            borderBottomEndRadius: SIZES.radius + 10,
            borderTopRightRadius: SIZES.radius + 10,
          }}>
          {/* <TouchableOpacity
            onPress={() => {
              setShow(false);
            }}
            >
            <Image
              source={images.cancel}
              style={{
                alignSelf: 'flex-end',
                height: 30,
                width: 30,
                marginTop:Platform.OS=="android"?0:35,
                margin: 15,
                tintColor: COLORS.red,
              }}
            />
          </TouchableOpacity> */}
            <TouchableOpacity style={{
                    marginBottom:10,
                marginTop:Platform.OS=="android"?0:45, 
            }}
            onPress={()=>
              {navigation.navigate("MyAccount"),
              setShow(false)}
            }
            >
                <Image source={{uri:"https://picsum.photos/"+global.id}} 
                resizeMode="cover"
                style={{
                    width:75,
                    height:75,
                    margin:10,
                    alignSelf:"center",
                    borderRadius:75/2
                }}/>
                <Text style={{...FONTS.h3,color:COLORS.Primary,alignSelf:"center"}}>
                  Edit
                  </Text>
                </TouchableOpacity>
          <LineDivider lineStyle={{
              marginBottom:10,
              // backgroundColor:COLORS.black,
              width:"90%",
              alignSelf:"center"
          }}/>
          <DrawerCard name={"Home"} img={images.home}
          onPress={() => {
            setShow(false);
          }}
          />
          <DrawerCard name={"Reports"} img={images.file}
          onPress={()=>navigation.replace("Report")}
          />
          
          <LineDivider lineStyle={{
              // backgroundColor:COLORS.black,
              width:"90%",
              alignSelf:"center",
              marginTop:10,
              marginBottom:10
          }}/>
          <DrawerCard name={"Setting"} img={images.setting}
          onPress={()=>navigation.replace("Setting")}
          />
          <View style={{flex:1,justifyContent:"flex-end",marginBottom:10}}>
          <LineDivider lineStyle={{
              backgroundColor:COLORS.black,
              width:"90%",
              alignSelf:"center",
              marginBottom:10
          }}/>
          <DrawerCard name={"Logout"} namestyle={{
              color:COLORS.white
          }} 
          imgstyle={{
              tintColor:COLORS.white
          }}
          img={images.logout}
          contstyle={{
            backgroundColor:"#ff5b5b",
            marginBottom:20
          }}
          onPress={()=>{
              AsyncStorage.clear()
              navigation.replace("Login")
          }}
          />
        </View>
        </View>
        <View
        onTouchStart={()=>{setShow(false)}}
          style={{
            backgroundColor:"transparent",
            width: '30%',
            height: '100%',
            justifyContent:"center",
            borderBottomStartRadius: SIZES.radius + 10,
            borderTopLeftRadius: SIZES.radius + 10,
            alignSelf:"center",
            
          }}
        >
            <Image source={images.HH} style={{
                alignSelf:"center",
                justifyContent:"center",
                width:50,
                height:50,
                tintColor:COLORS.white
                // backgroundColor:COLORS.Primary
            }}/>
            <Text style={{
                alignSelf:"center",
                justifyContent:"center",
                fontSize:35,
                color:COLORS.white
            }}>
                H {"\n"}
                E {"\n"}
                R {"\n"}
                D {"\n"}
                H {"\n"}
                E {"\n"}
                L {"\n"}
                P{"\n"}
            </Text>
            
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
title: {
    fontSize: 20,
    // marginTop: 3,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  caption: {
    fontSize: 18,
    // lineHeight: 18,
    letterSpacing: 1,
  }})