import { View, Text,Image,TouchableOpacity,ScrollView,ActivityIndicator,Alert,Modal } from 'react-native'
import React from 'react'
import { images,COLORS,SIZES ,FONTS} from '../../Components/Constants';
import Header from '../../Components/Header';
import SettingContent from './settingContent';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../Home/CustomButtom';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from 'react-redux';
import { WeightUnit } from '../../Store/actions';
export default function Setting({navigation}) {
  const [unit,setUnit] = React.useState("")
  const [loading,setLoading] = React.useState(false)
  const [cond,setCond] = React.useState("")
  const [EmailError,setEmailError] = React.useState("")
  const [color,setCol] = React.useState(COLORS.lightGray1)
  const dispatch = useDispatch()
  const onChangeUnit = (value) =>{
    setLoading(true)
    setUnit(value)
    dispatch(WeightUnit(value.toString()))
    setLoading(false)
    showMessage({
      message: "Setting Updated",
      type: "default",
      backgroundColor: COLORS.Primary,
      color:COLORS.white,
      titleStyle:{
        alignSelf:"center",
        ...FONTS.h3
      },
      animationDuration:250
    });
  }
  const units = [
    {
      value: true,
      label: 'lbs',
      avatarSource:images.weight
    },
    {
      value: false,
      label: 'kg',
      avatarSource:images.weight
    },
  ];
  function renderheader() {
    return (
      <Header
        leftComponent={
          <View
            style={{
              justifyContent: 'center',
              position: 'absolute',
              marginTop: 20,
              zIndex: 1,
            }}>
            <TouchableOpacity
              style={{
                marginLeft: 25,
                backgroundColor:COLORS.Primary,
                height:40,
                width:40,
                justifyContent:"center",
                borderRadius:40/2,
                }}
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Image
                source={images.menu}
                style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Setting'}
      />
    );
  }
  function renderContent(){
    return(
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          paddingBottom: SIZES.padding,
        }}>
          {
            loading?<ActivityIndicator size="large" color={COLORS.Primary}/>:
          
          <SettingContent title={"Weight"}
          append={
            <Dropdown
            data={units}
            mainContainerStyle={{
              width:120,
              alignSelf:"flex-end"
            }}
            label="Unit"
          dropdownIcon={images.down}
          dropdownIconSize={20}
          borderRadius={SIZES.radius}
          animationIn="bounceInRight"
          animationOut="bounceOutRight"
          textInputStyle={(FONTS.body2, {letterSpacing: 2})}
          selectedItemTextStyle={
            (FONTS.body3,
            {color: COLORS.white, letterSpacing: 2, alignSelf: 'center'})
          }
          selectedItemViewStyle={{
            backgroundColor: COLORS.Primary,
            margin: 5,
            borderRadius: SIZES.radius,
          }}
          disableSelectionTick
          primaryColor={COLORS.Primary}
          value={unit}
          onChange={onChangeUnit}
            />
          }
          />}
        </View>
    )
  }
  const [react,showReact] = React.useState(false)
  const renderReaction=({
    react
  })=>{
    return(
      <Modal 
      animationType={'fade'}
      visible={react}
      onRequestClose={() => {
        setShow(false);
      }}>
        <View>

        </View>

      </Modal>
    )
  }
  return (
    <View style={{flex:1, backgroundColor:COLORS.white}}>
      {renderheader()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
        }}>
      {renderContent()}

      </ScrollView>
    </View>
  )
}