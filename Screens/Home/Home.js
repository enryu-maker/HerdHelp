import {View, Text, Image, TouchableOpacity, FlatList,} from 'react-native';
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
import ActivityIndicatorExample from '../../Components/Loading';
export const Home = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const animals = useSelector(state=>state.Reducers.herds)
  // const id = useSelector(state=>state.Reducers.id)
  // console.log(id)
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
                navigation.openDrawer();
              }}>
              <Image
                source={images.menu}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.white,
                  alignSelf: 'center',
                }}
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
      {
        animals?.length===0?<ActivityIndicatorExample/>:
      <FlatList
      style={{
        alignSelf:"center",
      }}
        data={animals}
        numColumns={2}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          item.data.length>0?
              <CustomButton
                buttonContainerStyle={{
                  margin:10
                }}
                icon={{uri: baseURL + item.data[0].image}}
                key={item.id}
                label={`My ${item.label}`}
                label2={`${item.data.length}`}
                onPress={() => {
                  navigation.navigate('add', {
                    label: `My ${item.label}'s`,
                    data: item.data,
                    cond:true
                  });
                }}
              />:null
        )}/>
              }
    </View>
  );
};
