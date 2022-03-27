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
import CustomButton from './CustomButtom';
const Main = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState("");
  const [user,setUser] = React.useState([])
  async function fetchanimal() {
    let {data} = await axiosIns.get('getcategories/');
    setLoading(true);
    global.species = data
    return data;
  } 
  async function getWeightUnit(){
    global.unit=JSON.parse(await AsyncStorage.getItem('weight'))
    // return data
  }
  async function fetchStatus() {
    let {data} = await axiosIns.get('getstatuses/');
    setLoading(true);
    global.stat=data
    return data;
  } 
  async function loadId(){
    global.id = await AsyncStorage.getItem("id")
  }
  async function getALerts(){
    let {data} = await axiosIns.get('alerts/');
    return(data)
  }
  
  React.useEffect(() => {
    fetchStatus();
      fetchanimal();
      loadId();
      getALerts().then((data)=>{
        setUser(data)
      })
      getWeightUnit()
      // global.unit=show
      // console.log(show)
  },[show]);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        img={images.herdhelp}
        imgstyle={{
          width:220,
          // marginRight: 50,

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
                source={images.login}
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
            marginBottom:SIZES.height>700?37:50,
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
            height:SIZES.height>700?75:60,

            // alignSelf:"flex-start"
          }}
          label2
          buttonContainerStyle2={{
            backgroundColor:COLORS.Primary,
            marginRight:0

          }}
        />
        <CustomButton
          icon={images.add}
          label={'ADD ANIMALS'}
          onPress={() => {
            navigation.navigate('Animals'
          )}}
          buttonContainerStyle={{
            marginTop: 12,
            height:SIZES.height>700?75:60,

          }}
          label2
          buttonContainerStyle2={{
            backgroundColor:COLORS.Primary,
            marginRight:0

          }}
        />
        <CustomButton
          icon={images.med}
          label={'ADD MEDICATION'}
          onPress={() => {
            navigation.navigate('medication',{
              cond:true
            })}}
          buttonContainerStyle={{
            marginTop: 12,
            height:SIZES.height>700?75:60,

          }}
          label2
          buttonContainerStyle2={{
            backgroundColor:COLORS.Primary,
            marginRight:0

          }}
        />
        <CustomButton
          icon={images.weight}
          label={'UPDATE WEIGHT'}
          onPress={() => {
            navigation.navigate('weight'
            );
          }}
          buttonContainerStyle={{
            marginTop: 12,
            height:SIZES.height>700?75:60,
          }}
          label2
          buttonContainerStyle2={{
            backgroundColor:COLORS.Primary,
            marginRight:0

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
            height:SIZES.height>700?75:60,

          }}
          label2
          buttonContainerStyle2={{
            backgroundColor:COLORS.Primary,
            marginRight:0
          }}
        />
        <CustomButton
          label={`ALERTS  `}
          icon={images.bell}
          iconStyle={{
            tintColor:user?.length>0?COLORS.red:COLORS.white
          }}
          onPress={() => {
            navigation.navigate('LoadAlert');
          }}
          label2={`${user?.length}`}
          buttonContainerStyle2={{
            backgroundColor:user?.length>0?COLORS.red:COLORS.Primary,
            justifyContent:"center",
            alignSelf:"center",
          }}
          label2Style={{
            color:user?.length>0?COLORS.white:COLORS.Primary,
            justifyContent:"center",
            alignSelf:"center"
          }}
          buttonContainerStyle={{
            marginTop: 12,
            marginBottom: 20,
            height:SIZES.height>700?75:60,

          }}
        />
     </ScrollView>
      </View>
      </ScrollView>
    </View>
  );
};
export default Main;
