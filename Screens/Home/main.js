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
  dummydata,
} from '../../Components/Constants';
import axiosIns from '../../helpers/helpers';
import ActivityIndicatorExample from '../../Components/Loading';
const Main = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const [species, setSpcies] = React.useState([]);
  const [id, setId] = React.useState("");
  async function fetchanimal() {
    let {data} = await axiosIns.get('getcategories/');
    // console.log(data)
    setLoading(true);
    global.species = data
    return data;
  }
  async function loadId(){
    global.id = await AsyncStorage.getItem("id")
  }
  React.useEffect(() => {
      fetchanimal()
      loadId();
  },[]);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <TouchableOpacity
      onPress={()=>navigation.openDrawer()}
      >

     
      <Header
        img={images.herdhelp}
        imgstyle={{
          marginTop: '25%',
          tintColor: COLORS.black,
        }}
        containerStyle={{
          // marginTop: Platform.OS == 'ios' ? 50 : 30,
          marginBottom: Platform.OS == 'ios' ? 10 : 30,

        }}
        // rightComponent={
        //   <View
        //     style={{
        //       justifyContent: 'center',
        //       marginTop: '15%',
        //     }}>
        //     <TouchableOpacity
        //       style={{
        //         marginRight: 10,
        //       }}
        //       onPress={() => navigation.navigate('MyAccount')}>
        //       <Image
        //         source={images.login}
        //         resizeMode="center"
        //         style={{
        //           width: 55,
        //           height: 55,
        //           tintColor: COLORS.lightGray1,
        //           marginTop: 10,
        //           borderRadius: 55 / 2,
        //         }}
        //       />
        //     </TouchableOpacity>
        //   </View>
        // }
      />
       </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View 
        style={{
            width: '88%',
            marginTop: '25%',
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
