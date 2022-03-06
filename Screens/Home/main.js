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
    // console.log(data)
    setLoading(true);
    global.species = data
    return data;
  }
  async function loadUser(){
    try {
      let {data} = await axiosIns.get('profile/');
      setLoading(false)
      return data;
    } catch (e) {
     alert("Something Went Wrong")
    }
  };
  
  async function loadId(){
    global.id = await AsyncStorage.getItem("id")
  }
  React.useEffect(() => {
      fetchanimal();
      loadId();
      loadUser().then(data=>{
        setUser(data)
        // console.log(data)
      })
  },[]);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
    {/* <Loader loading={loading}/> */}
    
      <Header
        title={"HerdHelp"}
        titleStyle={{
          marginTop:30,
          marginRight: 70,
          color:COLORS.black,
          ...FONTS.h1

        }}
        leftComponent={
          <View
            style={{
              justifyContent: 'center',
              // marginTop: '15%',
            }}>
            <TouchableOpacity
              style={{
                marginLeft: 30,
              }}
              onPress={() => {setShow(true)}}>
              <Image
                source={images.HH}
                resizeMode="center"
                style={{
                  width: 55,
                  height: 55,
                }}
              />
            </TouchableOpacity>
          </View>
        }
      />
      {
    <Drawer setShow={setShow} show={show} navigation={navigation} user={user}/>
      }
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
          label={'ALERTS'}
          icon={images.bell}
          onPress={() => {
            navigation.navigate('LoadAlert'
            );
          }}
          buttonContainerStyle={{
            marginTop: 12,
            marginBottom: 12,
            // width:120
          }}
        />
     </ScrollView>
      </View>

      {/* <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TextButton
          label={'LOGOUT'}
          icon={images.logout}
          onPress={() => {
            navigation.replace('Login'), AsyncStorage.clear();
          }}
          buttonContainerStyle={{
            marginBottom: Platform.OS == 'ios' ? 20 : 30,
            marginTop: Platform.OS == 'ios' ? 20 : 30,

            backgroundColor: '#ff5b5b',
          }}
        />
      </View> */}
      </ScrollView>
    </View>
  );
};
export default Main;
