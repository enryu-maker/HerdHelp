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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  images,
  COLORS,
  SIZES,
  FONTS,
  
} from '../../Components/Constants';
import axiosIns from '../../helpers/helpers';
import Drawer from '../Custom/Drawer';
import ActivityIndicatorExample from '../../Components/Loading';
import Loader from '../../Components/Loader';
const Main = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [user,setUser] = React.useState([])
  async function fetchanimal() {
    let {data} = await axiosIns.get('getcategories/');
    // let {stat} = await axiosIns.get('getstatuses/');
    setLoading(true);
    global.species = data
    // global.stat=stat
    return data;
  } 
  async function fetchStatus() {
    let {data} = await axiosIns.get('getstatuses/');
    setLoading(true);
    // console.log(data)
    global.stat=data
    return data;
  } 
  async function loadId(){
    global.id = await AsyncStorage.getItem("id")
  }
  React.useEffect(() => {
    fetchStatus();
      fetchanimal();
      loadId();
      global.alertlength;
  },[]);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
    {/* <Loader loading={loading}/> */}
      <Header
        title={"HerdHelp"}
        titleStyle={{
          marginTop:30,
          marginRight: 65,
          color:COLORS.black,
          ...FONTS.h1

        }}
        leftComponent={
          <View
            style={{
              justifyContent: 'center',
              marginTop: '8%',
            }}>
            <TouchableOpacity
              style={{
                marginLeft: 30,
              }}
              onPress={() => {navigation.openDrawer()}}>
              <Image
                source={images.menu}
                style={{
                  width: 35,
                  height: 35,
                }}
              />
            </TouchableOpacity>
          </View>
        }
      />
      {/* {
        show&&
    <Drawer setShow={setShow} show={show} navigation={navigation} user={user}/>
      } */}
      <ScrollView showsVerticalScrollIndicator={false}>
      <View 
        style={{
            width: '88%',
            marginTop:SIZES.height*.1225 ,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
            alignSelf: 'center',
        }}>
          <ScrollView showsVerticalScrollIndicator={false}>
        <TextButton
          icon={images.herd}
          label={'MY HERDS'}
          onPress={() => {
            navigation.navigate('Home');
          }}
          buttonContainerStyle={{
            marginTop: 18,
          }}
        />
        <TextButton
          icon={images.add}
          label={'ADD ANIMALS'}
          onPress={() => {
            navigation.navigate('Animals'
          )}}
          buttonContainerStyle={{
            marginTop: 12,
          }}
        />
        <TextButton
          icon={images.med}
          label={'ADD MEDICATION'}
          onPress={() => {
            navigation.navigate('medication')}}
          buttonContainerStyle={{
            marginTop: 12,
          }}
        />
        <TextButton
          icon={images.weight}
          label={'UPDATE WEIGHT'}
          onPress={() => {
            navigation.navigate('weight'
            );
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
          label={`ALERTS  `}
          icon={images.bell}
          iconStyle={{
            // tintColor:global.alertlength.length>0?COLORS.red:COLORS.white
          }}
          onPress={() => {
            navigation.navigate('LoadAlert'
            );
          }}
          // label2={`${global.alertlength.length}`}
          // buttonContainerStyle2={{
          //   backgroundColor:global.alertlength.length>0?COLORS.red:COLORS.Primary
          // }}
          // label2Style={{
          //   color:global.alertlength.length>0?COLORS.white:COLORS.Primary
          // }}
          buttonContainerStyle={{
            marginTop: 12,
            marginBottom: 12,
            // borderColor:global.alertlength.length>0?COLORS.red:COLORS.white,
            // borderWidth:2
          }}
        />
     </ScrollView>
      </View>
      </ScrollView>
    </View>
  );
};
export default Main;
