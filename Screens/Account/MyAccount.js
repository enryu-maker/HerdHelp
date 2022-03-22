import React from 'react';
import {View, ScrollView, TouchableOpacity, Image,Text} from 'react-native';

import Header from '../../Components/Header';
import TextButton from '../../Components/TextButton';
import InfoItem from '../../Components/InfoItem';
import {COLORS, SIZES, images, dummyData, FONTS} from '../../Components/Constants';
import axiosIns from '../../helpers/helpers';

const MyAccount = ({navigation,route}) => {
  const [user,setUser]=React.useState([])
  const fetchprofile = async () => {
      try {
        const {data} = await axiosIns.get('profile/');
        return data;
      } catch (e) {
       alert("Something Went Wrong")
      }
    };
    React.useEffect(() => {
      fetchprofile().then(data => {
        setUser(data[0]);
        global.User=data
      });
    }, []);
  
function renderFileUri() {
      return <Image
      source={{uri:"https://picsum.photos/"+global.id}}
        style={{width: 100,
          height: 100,
          borderRadius: 100 / 2,
          alignSelf: 'center',
        }}
      />
    };
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
                borderRadius:SIZES.base,
                }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
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
          <TouchableOpacity
          onPress={()=>navigation.navigate("MyAccountEdit",{
            user:user
          })}
          >
          <Text
          style={{
            padding:SIZES.padding,
            color:COLORS.Primary,
            ...FONTS.h2
          }}
          
          >EDIT</Text>
          </TouchableOpacity>
          
        }
      />
    );
  }
  function rederSectionZero(){
    return(
      <View
        style={{
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
        }}>
        {renderFileUri()}
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
