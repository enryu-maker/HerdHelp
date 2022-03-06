import {
  View,
  Text,
  Modal,
  Animated,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, images, SIZES} from '../../Components/Constants';
import {Caption, Title} from 'react-native-paper';
import LineDivider from '../../Components/LineDivider';
import DrawerCard from './DrawerCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
        backgroundColor:COLORS.Primary,
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '75%',
            backgroundColor: COLORS.Primary,
            // borderBottomEndRadius: SIZES.radius + 10,
            // borderTopRightRadius: SIZES.radius + 10,
          }}>
          <TouchableOpacity
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
                //   marginTop:15,
                margin: 15,
                tintColor: COLORS.red,
              }}
            />
          </TouchableOpacity>
            <TouchableOpacity style={{
                flexDirection:"row",
                    marginLeft:25,
                    marginBottom:10
                
            }}
            onPress={()=>{navigation.navigate("MyAccount")}}
            >
                <Image source={images.login} style={{
                    width:75,
                    height:75,
                    margin:10,
                    
                    
                }}/>
                <View style={{
                    flexDirection:"column",
                    padding:3
                }}>
                <Title style={styles.title}>{
                global.userData[0].fullname
                }</Title>
                <Caption style={[styles.caption, {color: COLORS.gray}]}>
                {global.userData[0].farm_name}
                </Caption>
                <Caption style={styles.caption}>{`@ ${global.userData[0].username}`}</Caption>
                </View>
                </TouchableOpacity>
          <LineDivider lineStyle={{
              marginBottom:10,
              backgroundColor:COLORS.black,
              width:"90%",
              alignSelf:"center"
          }}/>
          <DrawerCard name={"Home"} img={images.home}
          onPress={() => {
            setShow(false);
          }}
          />
          <DrawerCard name={"Reports"} img={images.file}
          onPress={()=>navigation.replace("Setting")}
          />
          
          <LineDivider lineStyle={{
              backgroundColor:COLORS.black,
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
              color:"#ff5b5b"
          }} 
          imgstyle={{
              tintColor:"#ff5b5b"
          }}
          img={images.logout}
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
            backgroundColor: COLORS.white,
            width: '30%',
            height: '80%',
            justifyContent:"center",
            borderBottomStartRadius: SIZES.radius + 10,
            borderTopLeftRadius: SIZES.radius + 10,
            alignSelf:"center",
            
          }}
        >
            <Image source={images.HH} style={{
                alignSelf:"center",
                justifyContent:"center",
                width:40,
                height:40
            }}/>
            <Text style={{
                alignSelf:"center",
                justifyContent:"center",
                fontSize:30,
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