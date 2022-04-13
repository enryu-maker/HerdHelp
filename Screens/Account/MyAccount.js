import React from 'react';
import {View, ScrollView, TouchableOpacity, Image,Text} from 'react-native';

import Header from '../../Components/Header';
import TextButton from '../../Components/TextButton';
import InfoItem from '../../Components/InfoItem';
import {COLORS, SIZES, images, dummyData, FONTS} from '../../Components/Constants';
import axiosIns from '../../helpers/helpers';
import PickerType from '../Livestocks/PickerType';
import Update from './Update';
import { Username } from '../Nav/Homenav';
import { tr } from 'date-fns/locale';
const MyAccount = ({navigation,route}) => {
  const [user,setUser]=React.useState([])
  const [show, setshow] = React.useState(false);
  const [showu, setshowu] = React.useState(false);
  const [pic, setPic] = React.useState('');
  const [picdata, setPicdata] = React.useState('');
  const [profile_pic, setprofile_pic] = React.useState([]);
  const [reload,setReload] = React.useState(false)
  const username = React.useContext(Username)
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
        setPic(data[0].profile_picture)
        global.User=data
      });
    }, []);
    function renderFileUri() {
      if (pic) {
        return (
          <View style={{
            height:100,
            width:100,
            borderRadius:100/2,
            alignSelf:"center",
          }}>
          <Image
            source={{uri: pic}}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              alignSelf: 'center',
              borderWidth:2,
            }}
          />
          <View style={{
            position:"absolute",
            alignSelf:"flex-end",
            backgroundColor:COLORS.Primary,
            height:18,
            width:28,
            justifyContent:"center",
            marginTop:70,
            borderRadius:6
          }}>
            <Text style={{
            color:COLORS.white,
            ...FONTS.h5,
            alignSelf:"center"
            }}>
            Edit
            </Text>
          </View>
          </View>
        );
      } else {
        return (
          <View style={{
            // backgroundColor:COLORS.lightGray1,
            height:100,
            width:100,
            borderRadius:100/2,
            alignSelf:"center",
          }}>
  
          <Image
            source={{uri:`https://ui-avatars.com/api/?name=${username}`}}
            resizeMethod="auto"
            resizeMode="contain"
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              alignSelf: 'center',
            borderWidth:2,
            }}
          />
  
  
          <View style={{
            position:"absolute",
            alignSelf:"flex-end",
            backgroundColor:COLORS.Primary,
            height:18,
            width:28,
            justifyContent:"center",
            marginTop:70,
            borderRadius:6
          }}>
            <Text style={{
            color:COLORS.white,
            ...FONTS.h5,
            alignSelf:"center"
            }}>
            Edit
            </Text>
          </View>
          </View>
  
  
          // 
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
                navigation.replace("DrawNav");
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
            marginTop: 6,
            borderRadius: SIZES.radius,
            paddingHorizontal: SIZES.radius,
            justifyContent:"center"
          }}>
          <TouchableOpacity
            onPress={() => {
              setshow(true)
            }}>
            {renderFileUri()}
          </TouchableOpacity>
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
      <PickerType show={show} setshow={setshow} setPic={setPic} setPicdata={setPicdata} setprofile_pic={setprofile_pic} setshowc={setshowu}/>
      <Update showu={showu} setshowu={setshowu} profile={profile_pic} cond={true}/>
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
