import React, {useState} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '../../Components/Header';
import TextButton from '../../Components/TextButton';
import FormInput from '../../Components/FormInput';
import {COLORS, SIZES, images} from '../../Components/Constants';
import axiosIns from '../../helpers/helpers';
import CustomAlert from '../../Components/CustomAlert';

const MyAccountEdit = ({navigation,route}) => {
  const [fullName, setFullName] = useState(route.params.user.fullname);
  const [phoneNo, setPhoneNo] = useState(route.params.user.phone);
  const [idCard, setIdCard] = useState(route.params.user.farm_name);
  const [addr, setAddr] = useState(route.params.user.address);
  const [user,setUser]=React.useState([])
  const [show, setShow] = React.useState(false);
  const [validation, setValidation] = React.useState(false);
  const [dataText, setDataText] = React.useState('');

  const updateprofile = async () => {
      try {
        await axiosIns.patch(`updateprofile/${global.id}`,
        {
          "fullname": fullName,
          "phone": phoneNo,
          "farm_name": idCard,
          "address": addr
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        ).then(()=>{
          setDataText("Details updated")
          setShow(true)
          setValidation(true)
        })
      } catch (e) {
        // console.log(e.response)
        setDataText("Not updated")
        setShow(true)
        setValidation(false)
      }
    };
  React.useEffect(() => {
    let { user } = route.params
    setUser(user)
  },[]);
  function renderHeader() {
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
              navigation.replace("MyAccount");

            }}>
            <Image
              source={images.back}
              style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
            />
          </TouchableOpacity>
        </View>
        }
        title={'Edit Account'}
        titleStyle={{
          // alignSelf:"center",
          marginLeft: 50,
        }}
        rightComponent={
          <View
            style={{
              width: 40,
            }}
          />
        }
      />
    );
  }

  function renderForm() {
    return (
      <View
        style={{
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        
        {/* Name */}
        <FormInput
          label="Full Name"
          placeholder={user.fullname}
          value={fullName}
          onChange={value => {
            setFullName(value);
          }}
          returnKeyType={"next"}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
        />

        {/* Phone Number */}
        <FormInput
          label="Phone Number"
          placeholder={user.phone}
          value={phoneNo}
          onChange={value => {
            setPhoneNo(value);
          }}
          returnKeyType={"next"}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
        />

        {/* ID Card */}
        <FormInput
          label="Farm Name"
          placeholder={user.farm_name}

          value={idCard}
          onChange={value => {
            setIdCard(value);
          }}
          returnKeyType={"next"}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
        />
        {/* Address */}
        <FormInput
          label="Address"
          placeholder={user.address}

          value={addr}
          onChange={value => {
            setAddr(value);
          }}
          returnKeyType={"next"}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}
      <CustomAlert show={show} setShow={setShow} validation={validation} label={dataText}/>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: 40,
        }}>
        {renderForm()}
      </KeyboardAwareScrollView>

      <TextButton
      icon={images.update}
        buttonContainerStyle={{
          height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label="Save"
        onPress={() => {
          updateprofile();
        }}
      />
    </View>
  );
};

export default MyAccountEdit;
