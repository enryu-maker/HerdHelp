import React, {useState} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '../../Components/Header';
import TextButton from '../../Components/TextButton';
import FormInput from '../../Components/FormInput';
// import ImagePicker from 'react-native-image-picker';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  launchCamera,
} from 'react-native-image-picker';
import {COLORS, SIZES, images} from '../../Components/Constants';
import axiosIns from '../../helpers/helpers';

const MyAccountEdit = ({navigation}) => {
  const [pic, setPic] = React.useState('');
  const [picdata, setPicdata] = React.useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [idCard, setIdCard] = useState('');
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [addr, setAddr] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState([]);
  // const updateprofile = async () => {

  //     try {
  //       await axiosIns.patch(`/update-profile/${dummyData.userid}`,{
  //           "Name":fullName,
  //         //   "Phone":phoneNo,
  //           "ShopAddress":addr,
  //           "Email":email
  //       }).then(()=>{alert("Details updated")})
  //     } catch (e) {
  //       console.log('error', e.response.data);
  //     }
  //   };
  React.useEffect(() => {
    // updateprofile()
  });
  function openCamara() {
    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      // console.log(response.assets[0].base64)
      if (response.assets) {
        imageAssetsArray = response.assets[0].uri;
        setPic(imageAssetsArray);
        setPicdata(response.assets[0].base64);
      }
    });
  }
  function renderFileUri() {
    if (pic) {
      return (
        <Image
          source={{uri: pic}}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            alignSelf: 'center',
          }}
        />
      );
    } else {
      return (
        <Image
          source={images.login}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            alignSelf: 'center',
            tintColor: COLORS.Primary,
          }}
        />
      );
    }
  }
  function renderHeader() {
    return (
      <Header
        leftComponent={
          <View
            style={{
              justifyContent: 'center',
              position: 'absolute',
              marginTop: 25,
              zIndex: 1,
            }}>
            <TouchableOpacity
              style={{
                marginLeft: 25,
              }}
              onPressIn={() => {
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{width: 28, height: 28, tintColor: COLORS.darkGray2}}
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
          value={fullName}
          onChange={value => {
            setFullName(value);
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
        />

        {/* Phone Number */}
        <FormInput
          label="Phone Number"
          value={phoneNo}
          onChange={value => {
            setPhoneNo(value);
          }}
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
          value={idCard}
          onChange={value => {
            setIdCard(value);
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
        />
        {/* Email */}
        <FormInput
          label="Email"
          keyboardType="email-address"
          autoCompleteType="email"
          value={email}
          onChange={value => {
            setEmail(value);
          }}
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
          value={addr}
          onChange={value => {
            setAddr(value);
          }}
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
      <View
          style={{
            marginBottom: SIZES.padding-10,
            borderRadius: SIZES.radius,
            paddingHorizontal: SIZES.radius,
            // backgroundColor: COLORS.lightGray2,
          }}>
          <TouchableOpacity
            onPress={() => {
              openCamara();
            }}>
            {renderFileUri()}
          </TouchableOpacity>
        </View>
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
