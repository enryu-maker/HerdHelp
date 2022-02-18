import React from 'react';
import {View, ScrollView, TouchableOpacity, Image} from 'react-native';

import Header from '../../Components/Header';
import TextButton from '../../Components/TextButton';
import InfoItem from '../../Components/InfoItem';
import {COLORS, SIZES, images, dummyData} from '../../Components/Constants';

import axiosIns from '../../helpers/helpers';

const MyAccount = ({navigation}) => {
  // const [user,setUser]=React.useState([])
  // const fetchprofile = async () => {
  //     try {
  //       const {data} = await axiosIns.get('profile/');
  //       return data;
  //     } catch (e) {
  //       console.log('error', e.response.data.detail);
  //     }
  //   };
  //   React.useEffect(() => {
  //     fetchprofile().then(data => {
  //       setUser(data[0]);
  //       dummyData.userid=user.id
  //     });
  //   }, []);
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
          marginLeft: 50,
        }}
        rightComponent={
          <View
            style={{
              justifyContent: 'center',
              // position:'absolute',
              // marginTop:25,
              // zIndex: 1,
            }}>
            <TextButton
              label="Edit"
              labelStyle={{
                color: COLORS.Primary,
                // marginRight:15
              }}
              buttonContainerStyle={{
                backgroundColor: null,
                marginRight: 25,
              }}
              onPress={() => navigation.navigate('MyAccountEdit')}
            />
          </View>
        }
      />
      // <Header
      //     title={"MY ACCOUNT"}
      //     containerStyle={{
      //         // height: 50,
      //         // marginHorizontal: SIZES.padding,
      //         // marginTop: 40
      //     }}
      //     leftComponent={
      //         <View style={{
      //           justifyContent: 'center',
      //           position: 'absolute',
      //           marginTop: 25,
      //           zIndex: 1,
      //         }}>
      //           <TouchableOpacity
      //             style={{
      //               // marginTop: 20,
      //             //   marginLeft: 25,
      //             }}
      //             onPress={() => { navigation.goBack() }}>
      //              <Image source={images.back} style={{width:28,height:28,tintColor:COLORS.darkGray2}}/>

      //           </TouchableOpacity>

      //         </View>
      //       }
      //     rightComponent={
      //         <TextButton
      //             label="Edit"
      //             labelStyle={{
      //                 color: COLORS.Primary
      //             }}
      //             buttonContainerStyle={{
      //                 backgroundColor: null
      //             }}
      //             onPress={() => navigation.navigate("MyAccountEdit")}
      //         />
      //     }
      // />
    );
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
        <InfoItem label="Full Name" value="Akif Khan" />
        <InfoItem label="Username" value="Akif" />
        <InfoItem
          label="Phone Number"
          value="12345"
          // withDivider={false}
        />
        <InfoItem
          label="Email"
          value="test_mail@gmail.com"
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
        {/* <InfoItem
                    label="ID Card"
                    value="Not updated"
                />

                <InfoItem
                    label="Date of Birth"
                    value="03/03/1990"
                />

                <InfoItem
                    label="Gender"
                    value="Male"
                /> */}

        {/* <InfoItem
                    label="Joined"
                    value="March 2017"
                /> */}

        <InfoItem
          label="Farm Name"
          value="Robbins farm"
          // withDivider={false}
        />
        <InfoItem label="Address" value="usa" withDivider={false} />
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
        {renderSectionOne()}
        {renderSectionTwo()}
      </ScrollView>
    </View>
  );
};

export default MyAccount;
