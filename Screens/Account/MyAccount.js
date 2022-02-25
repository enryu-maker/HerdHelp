import React from 'react';
import {View, ScrollView, TouchableOpacity, Image,Text} from 'react-native';

import Header from '../../Components/Header';
import TextButton from '../../Components/TextButton';
import InfoItem from '../../Components/InfoItem';
import {COLORS, SIZES, images, dummyData, FONTS} from '../../Components/Constants';
import { launchImageLibrary, ImageLibraryOptions, launchCamera } from 'react-native-image-picker';
import axiosIns from '../../helpers/helpers';

const MyAccount = ({navigation,route}) => {
  const [user,setUser]=React.useState([])
    React.useEffect(() => {
      let {user} = route.params
      setUser(user)
    }, []);
  
function renderFileUri() {
    if (user) {
      return <Image
      source={{uri:`https://joeschmoe.io/api/v1/ + ${user.fullname}`}}
        resizeMode="contain"
        style={{width: 100,
          height: 100,
          borderRadius: 100 / 2,
          alignSelf: 'center',}}
      />
    } else {
      return <Image
      source={{uri:`https://joeschmoe.io/api/v1/ + ${user.fullname}`}}
        style={{width: 100,
          height: 100,
          borderRadius: 100 / 2,
          alignSelf: 'center',
          tintColor:COLORS.Primary
        }}
      />
    }
  };
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
        title={'My Account'}
        titleStyle={{
          // alignSelf:"center",
          marginLeft:90
        }}
        rightComponent={
          <Text
          style={{
            padding:SIZES.padding,
            color:COLORS.Primary,
            ...FONTS.h2
          }}
          onPress={()=>navigation.navigate("MyAccountEdit",{
            user:user
          })}
          >EDIT</Text>
        }
      />
    );
  }
  function rederSectionZero(){
    return(
      <View
        style={{
          // marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          // backgroundColor: COLORS.lightGray2,
        }}>
                        {renderFileUri()}
                        {/* <TouchableOpacity
                            onPress={() => openCamara()}>
                        </TouchableOpacity> */}
        </View>
    )
  }
  function renderSectionOne() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        <InfoItem label="Full Name" value={user.fullname} />
        <InfoItem label="Username" value={user.username} />
        <InfoItem
          label="Phone Number"
          value={user.phone}
          // withDivider={false}
        />
        <InfoItem
          label="Email"
          value={user.email}
          withDivider={false}
        />
      </View>
    );
  }

  function renderSectionTwo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>

        <InfoItem
          label="Farm Name"
          value={user.farm_name}

          // withDivider={false}
        />
        <InfoItem label="Address"value={user.address} withDivider={false} />
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

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
        }}>
        {rederSectionZero()}
        {renderSectionOne()}
        {renderSectionTwo()}
      </ScrollView>
    </View>
  );
};

export default MyAccount;
