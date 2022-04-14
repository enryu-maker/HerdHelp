import {View, Text, Image, TouchableOpacity, ScrollView,ActivityIndicator} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {COLORS, FONTS, images, SIZES} from '../../Components/Constants';
import TextButton from '../../Components/TextButton';
import axiosIns, { baseURL } from '../../helpers/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomButton from './CustomButtom';
export const Home = ({navigation}) => {
  const [animals, setAnimals] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [active, setActive] = React.useState(false);

  async function fetchanimal() {
    setLoading(true)
    let {data} = await axiosIns.get('animals/');
    // console.log(data[4])
    return data;
  }
 
  React.useEffect(() => {
      fetchanimal().then(data => {
        setAnimals(data);
        setLoading(false)
      });
  },[]);
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
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
              />
            </TouchableOpacity>
          </View>
        }
        title={'My Herds'}
      />
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {renderHeader()}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          marginVertical: 0,
          width: '88%',
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          alignSelf: 'center'
        }}>
          {
            loading?(
              <ActivityIndicator size="large" color={COLORS.Primary}/>
            ):(            
        animals.map(a => {
          if (a.data.length != 0) {
            return (
              <CustomButton
                buttonContainerStyle={{
                  marginTop: SIZES.padding,
                }}
                icon={{uri: baseURL + a.data[0].image}}
                key={a.id}
                label={`My ${a.label}`}
                label2={`${a.data.length}`}
                onPress={() => {
                  navigation.navigate('Add', {
                    label: `My ${a.label}'s`,
                    data: a.data,
                    cond:true
                  });
                }}
              />
            );
          }
        })
        )
          }
      </KeyboardAwareScrollView>
    </View>
  );
};
