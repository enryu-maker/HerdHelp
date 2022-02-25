import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import TextButton from '../../Components/TextButton';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  images,
  COLORS,
  SIZES,
  FONTS,
  dummydata,
} from '../../Components/Constants';
import axiosIns from '../../helpers/helpers';
const Main = ({navigation}) => {
  const [user,setUser]=React.useState([])
  const fetchprofile = async () => {
      try {
        const {data} = await axiosIns.get('profile/');
        // console.log(data)
        return data;
      } catch (e) {
       alert("Something Went Wrong")
      }
    };
    React.useEffect(() => {
      fetchprofile().then(data => {
        setUser(data[0]);
      });
      // console.log(user)
    }, []);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        img={images.herdhelp}
        imgstyle={{
          marginTop: '15%',
          tintColor: COLORS.black,
        }}
        rightComponent={
          <View
            style={{
              justifyContent: 'center',
              marginTop: '15%',
            }}>
            <TouchableOpacity
              style={{
                marginRight: 25,
              }}
              onPress={() => navigation.navigate('MyAccount',{user:user})}>
              <Image
                source={{uri:"https://joeschmoe.io/api/v1/" + user.fullname}}
                resizeMode="center"
                style={{
                  width: 55,
                  height: 55,
                  // tintColor: COLORS.lightGray2,
                  marginTop: 10,
                  borderRadius: 55 / 2,
                }}
              />
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          // marginVertical:0,
          width: '88%',
          marginTop: '20%',
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          alignSelf: 'center',
          height: 280,
        }}>
        <TextButton
          icon={images.herd}
          label={'MY HERDS'}
          onPress={() => {
            navigation.navigate('Home');
          }}
          buttonContainerStyle={{
            marginTop: 12,
          }}
        />
        <TextButton
          icon={images.add}
          label={'ADD ANIMALS'}
          onPress={() => {
            navigation.navigate('Animals');
          }}
          buttonContainerStyle={{
            marginTop: 12,
          }}
        />
        <TextButton
          icon={images.med}
          label={'ADD MEDICATION'}
          onPress={() => {
            navigation.navigate('medication');
          }}
          buttonContainerStyle={{
            marginTop: 12,
          }}
        />
        <TextButton
          icon={images.weight}
          label={'ADD CURRENT WEIGHT'}
          onPress={() => {
            navigation.navigate('weight');
          }}
          buttonContainerStyle={{
            marginTop: 12,
          }}
        />
        <TextButton
          icon={images.money}
          label={'FINANCES'}
          onPress={() => {
            navigation.navigate('FinanceInfo');
          }}
          buttonContainerStyle={{
            marginTop: 12,
          }}
        />
        <TextButton
          label={'ALERTS'}
          icon={images.bell}
          onPress={() => {
            navigation.navigate('LoadAlert');
          }}
          buttonContainerStyle={{
            marginTop: 12,
            // width:120
          }}
        />
      </ScrollView>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TextButton
          label={'LOGOUT'}
          icon={images.logout}
          onPress={() => {
            navigation.replace('Login'), AsyncStorage.clear();
          }}
          buttonContainerStyle={{
            marginBottom: Platform.OS == 'ios' ? 60 : 30,
            backgroundColor: '#ff5b5b',
          }}
        />
      </View>
    </View>
  );
};
export default Main;
