import {View, Text, Image, TouchableOpacity, ScrollView,} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {COLORS, FONTS, images, SIZES} from '../../Components/Constants';
import TextButton from '../../Components/TextButton';
import axiosIns, { baseURL } from '../../helpers/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomButton from './CustomButtom';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getHerds } from '../../Store/actions';
export const Home = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const animals = useSelector(state=>state.Reducers.herds)
  const id = useSelector(state=>state.Reducers.id)
  console.log(id)
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
              <ActivityIndicator size="small" color={COLORS.Primary}/>
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
