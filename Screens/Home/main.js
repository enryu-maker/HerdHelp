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
  },[]);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        // title={"HerdHelp"}
        // titleStyle={{
        //   marginTop:20,
        //   // marginRight: 55,
        //   color:COLORS.black,
        //   ...FONTS.h1

        // }}
        img={images.herdhelp}
        imgstyle={{
          width:220
        }}
        leftComponent={
          <View
            style={{
              marginTop:25,
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
              onPress={() => {navigation.openDrawer()}}>
              <Image
                source={images.menu}
                style={{
                  width: 30,
                  height: 30,
                  padding:5,
                  alignSelf:"center",
                  tintColor:COLORS.white
                }}
              />
            </TouchableOpacity>
          </View>
        }
        rightComponent={
          <View
            style={{
              marginTop:25,
            }}>
            <TouchableOpacity
              style={{
              marginRight: 25,
              backgroundColor:COLORS.Primary,
              height:40,
              width:40,
              justifyContent:"center",
              borderRadius:SIZES.base,
              }}
              onPress={() => {navigation.navigate("MyAccount")}}>
              <Image
                source={images.HH}
                style={{
                  width: 30,
                  height: 30,
                  padding:5,
                  alignSelf:"center",
                  tintColor:COLORS.white
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
            marginTop:40 ,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
            alignSelf: 'center',
            marginBottom:SIZES.height>700?30:120
        }}>
          <ScrollView showsVerticalScrollIndicator={false}>
        <TextButton
          icon={images.heart}
          label={'MY HERDS'}
          onPress={() => {
            navigation.navigate('Home');
          }}
          buttonContainerStyle={{
            marginTop: 18,
            height:75,

            // width:200,
            // alignSelf:"flex-start"
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
            height:75,

            // width:200,
            // alignSelf:"flex-end"
          }}
        />
        <TextButton
          icon={images.med}
          label={'ADD MEDICATION'}
          onPress={() => {
            navigation.navigate('medication')}}
          buttonContainerStyle={{
            marginTop: 12,
            height:75,
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
            height:75,
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
            height:75,

            // width:200,
            // alignSelf:"flex-start"
          }}
        />
        <TextButton
          label={`ALERTS  `}
          icon={images.bell}
          // iconStyle={{
          //   tintColor:global.alertlength.length>0?COLORS.red:COLORS.white
          // }}
          onPress={() => {
            navigation.navigate('LoadAlert'
            );
          }}
          label2={`${global.alertlength?.length}`}
          buttonContainerStyle2={{
            height:25,
            width:25,
            backgroundColor:global.alertlength?.length>0?COLORS.red:COLORS.Primary
          }}
          label2Style={{
            color:global.alertlength?.length>0?COLORS.white:COLORS.Primary,
            // justifyContent:"center",
            // alignSelf:"center"
          }}
          buttonContainerStyle={{
            marginTop: 12,
            marginBottom: 12,
            height:75,
            // width:200,
            // alignSelf:"flex-end"
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
