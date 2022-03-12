import {View, Text, Modal,TouchableOpacity,Image} from 'react-native';
import React from 'react';
import {COLORS, SIZES, FONTS,images} from './Constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from './Header';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import TextButton from './TextButton';
import FormInput from './FormInput';
import axiosIns from '../helpers/helpers';
const Status = ({show, setShow,animal}) => {
    const [status,setStatus] = React.useState("")
    const [Price,setPrice] = React.useState(0)
    const [loading,setloading] = React.useState(false)
    const [statusCat,setStatusCat] = React.useState([])


    const [err,setErr] = React.useState("")
    const updateStatus=value=>{
        setStatus(value)
    }
    React.useEffect(()=>{
      setStatusCat(global.stat)
    })
    const updateAnimal=async()=>{
        if(Price!=""){
            axiosIns.patch(`animals/${animal.tag_number}`,{
              'status':status
            }, {
              headers: {
                'Content-Type': 'application/json',
              },
            }).then((Response)=>{
              if(Response.status==200){
                setErr("Status Update sucessfully")
                setloading(true)
                setShow(false)
              }
              else{
                setErr("Status Not Update")
                setloading(false)
              }
            })
        }
        else{
          setErr("Invalid input")
          setloading(false)
        }
    }
    function renderHeader() {
        return (
          <Header
            rightComponent={
              <View
                style={{
                  justifyContent: 'center',
                  position: 'absolute',
                  marginTop: 25,
                // padding:10,
                  zIndex: 1,
                }}>
                <TouchableOpacity
                  style={{
                    marginLeft: 25,
                  }}
                  onPressIn={() => {
                    setShow(false)
                  }}>
                  <Image
                    source={images.cancel}
                    style={{width: 35, height: 35, tintColor: COLORS.red}}
                  />
                </TouchableOpacity>
              </View>
            }
            title={'Status'}
          />
        );
      }
      function renderForm(){
          return(
            <View
            style={{
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray2,
            }}>
        <Text style={{color:!loading?COLORS.red:COLORS.Primary, alignSelf: 'center', ...FONTS.body3}}>
          {err}
        </Text>
        <Dropdown
          label="Status"
          borderRadius={SIZES.radius}
          data={statusCat}
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
          enableAvatar
          required
          // showLoader
          // mode="outlined"
          disableSelectionTick
          primaryColor={COLORS.Primary}
          // avatarSize={28}
          value={status}
          onChange={updateStatus}
          animationIn="zoomIn"
          animationOut="zoomOut"
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{backgroundColor: COLORS.white, margin: 5}}
        />
        <FormInput
              prependComponent={
                <View style={{alignSelf: 'center', justifyContent: 'center'}}>
                  <Image
                    source={images.money}
                    style={{width: 26, height: 26, tintColor: COLORS.Primary}}
                  />
                </View>
              }
              label={Status!="Dead"?"Sold Price*":"Lost Amount*"}
              value={Price}
              onChange={value => {
                setPrice(value);
              }}
              inputContainerStyle={{
                backgroundColor: COLORS.white,
              }}
              containerStyle={{
                marginTop: SIZES.radius,
              }}
              inputStyle={{marginLeft: 20, fontSize: 16}}
            />
            </View>
          )
      }
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
          backgroundColor: '#00000040',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        >
        <View
          style={{
            height: 550,
            width: 342,
            backgroundColor: COLORS.white,
            alignSelf: 'center',
            borderRadius: SIZES.radius,
          }}>
              {renderHeader()}

              <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: 40,
        }}>
        
        {renderForm()}
      </KeyboardAwareScrollView>
      <TextButton
        onPress={() => {
          // alert(` ${id}${valueMS}${tag}`)
          updateAnimal();
          // clear();
        }}
        icon={images.update}
        buttonContainerStyle={{
          // flex:1,
          height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding + 10,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label={'Update'}
        // label2={true}
      />
    
        </View>
      </View>
    </Modal>
  );
};
export default Status;
