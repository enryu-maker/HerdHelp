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
import ActivityIndicatorExample from '../../Components/Loading';
const Main = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const [species, setSpcies] = React.useState([]);
  const [id, setId] = React.useState("");
  async function fetchanimal() {
    let {data} = await axiosIns.get('getcategories/');
    setLoading(true);
    return data;
  }
  async function loadId(){
    setId(await AsyncStorage.getItem("id"))
  }
  React.useEffect(() => {
    if (!loading) {
      fetchanimal().then(data => {
        setSpcies(data);
      });
      loadId();
    }
    else{
      <ActivityIndicatorExample/>
    }
    // console.log(animals)
  },[]);
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
              onPress={() => navigation.navigate('MyAccount')}>
              <Image
                source={images.login}
                resizeMode="center"
                style={{
                  width: 55,
                  height: 55,
                  tintColor: COLORS.lightGray1,
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
          height: 300,
        }}>
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
            navigation.navigate('Animals',{
              sep:species,
              id:id
            });
          }}
          buttonContainerStyle={{
            marginTop: 12,
          }}
        />
        <TextButton
          icon={images.med}
          label={'ADD MEDICATION'}
          onPress={() => {
            navigation.navigate('medication',{
              sep:species,
              id:id
            });
          }}
          buttonContainerStyle={{
            marginTop: 12,
          }}
        />
        <TextButton
          icon={images.weight}
          label={'ADD CURRENT WEIGHT'}
          onPress={() => {
            navigation.navigate('weight',{
              sep:species,
              id:id
            });
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
