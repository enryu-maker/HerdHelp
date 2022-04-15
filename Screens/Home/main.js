import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {images, COLORS, SIZES, FONTS} from '../../Components/Constants';
import axiosIns from '../../helpers/helpers';
import CustomButton from './CustomButtom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecies, getStatus, getTags, UserData } from '../../Store/actions';
const Main = ({navigation}) => {
  const [alerts, setAlerts] = React.useState([]);
  async function loadId() {
    global.id = await AsyncStorage.getItem('id');
  }
  async function getALerts() {
    let {data} = await axiosIns.get('alerts/');
    return data;
  }
  async function checkSubs() {
    let {data} = await axiosIns.get('subscriptions/isactive/');
    return data;
  }
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getStatus())
    dispatch(UserData())
    dispatch(getSpecies())
    dispatch(getTags())
    loadId();
    getALerts().then(data => {
      setAlerts(data);
    });
    checkSubs().then(data => {
      global.isActive = data.isactive;
      !data.isactive
        ? navigation.navigate('Subscription', {
            msg: 'No Active Subscription Please Purchase the Tier',
            cond: true,
          })
        : null;
    });
  }, []);
  const User = useSelector(state=>state.Reducers.userData)
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        img={images.herdhelp}
        imgstyle={{
          width: 220,
          // marginRight: 50,
        }}
        leftComponent={
          <View
            style={{
              marginTop: 25,
            }}>
            <TouchableOpacity
              style={{
                marginLeft: 25,
                backgroundColor: COLORS.Primary,
                height: 40,
                width: 40,
                justifyContent: 'center',
                borderRadius: 40 / 2,
              }}
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Image
                source={images.menu}
                style={{
                  width: 30,
                  height: 30,
                  padding: 5,
                  alignSelf: 'center',
                  tintColor: COLORS.white,
                }}
              />
            </TouchableOpacity>
          </View>
        }
        rightComponent={
          <View
            style={{
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={{
                marginRight: 20,
                height: 50,
                width: 50,
                borderRadius: 50 / 2,
              }}
              onPress={() => {
                navigation.navigate('MyAccount');
              }}>
              <Image
                source={{uri: User?.profile_picture==null?`https://ui-avatars.com/api/?name=${User?.username}`: User?.profile_picture}}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50 / 2,
                  borderWidth: 2,
                  borderColor: COLORS.Primary,
                }}
              />
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '88%',
            marginTop: 40,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
            alignSelf: 'center',
            marginBottom: SIZES.height > 700 ? 37 : 50,
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CustomButton
              icon={images.heart}
              label={'MY HERDS'}
              onPress={() => {
                navigation.navigate('Home');
              }}
              buttonContainerStyle={{
                marginTop: 18,
                height: SIZES.height > 700 ? 75 : 60,

                // alignSelf:"flex-start"
              }}
              label2
              buttonContainerStyle2={{
                backgroundColor: COLORS.Primary,
                marginRight: 0,
              }}
            />
            <CustomButton
              icon={images.add}
              label={'ADD ANIMALS'}
              onPress={() => {
                navigation.navigate('Animals');
              }}
              buttonContainerStyle={{
                marginTop: 12,
                height: SIZES.height > 700 ? 75 : 60,
              }}
              label2
              buttonContainerStyle2={{
                backgroundColor: COLORS.Primary,
                marginRight: 0,
              }}
            />
            <CustomButton
              icon={images.med}
              label={'ADD MEDICATION'}
              onPress={() => {
                navigation.navigate('medication', {
                  cond: true,
                });
              }}
              buttonContainerStyle={{
                marginTop: 12,
                height: SIZES.height > 700 ? 75 : 60,
              }}
              label2
              buttonContainerStyle2={{
                backgroundColor: COLORS.Primary,
                marginRight: 0,
              }}
            />
            <CustomButton
              icon={images.weight}
              label={'UPDATE WEIGHT'}
              onPress={() => {
                navigation.navigate('weight');
              }}
              buttonContainerStyle={{
                marginTop: 12,
                height: SIZES.height > 700 ? 75 : 60,
              }}
              label2
              buttonContainerStyle2={{
                backgroundColor: COLORS.Primary,
                marginRight: 0,
              }}
            />
            <CustomButton
              icon={images.money}
              label={'FINANCES'}
              onPress={() => {
                navigation.navigate('FinanceInfo');
              }}
              buttonContainerStyle={{
                marginTop: 12,
                height: SIZES.height > 700 ? 75 : 60,
              }}
              label2
              buttonContainerStyle2={{
                backgroundColor: COLORS.Primary,
                marginRight: 0,
              }}
            />
            <CustomButton
              label={`ALERTS  `}
              icon={images.bell}
              iconStyle={{
                tintColor: alerts?.length > 0 ? COLORS.red : COLORS.white,
              }}
              onPress={() => {
                navigation.navigate('LoadAlert');
              }}
              label2={`${alerts?.length}`}
              buttonContainerStyle2={{
                backgroundColor: alerts?.length > 0 ? COLORS.red : COLORS.Primary,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              label2Style={{
                color: alerts?.length > 0 ? COLORS.white : COLORS.Primary,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              buttonContainerStyle={{
                marginTop: 12,
                marginBottom: 20,
                height: SIZES.height > 700 ? 75 : 60,
              }}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
export default Main;
