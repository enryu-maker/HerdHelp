import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import FormInput from '../../Components/FormInput';
import {COLORS, FONTS, images, SIZES} from '../../Components/Constants';
import FilterModal from './filterModel';
import Card from '../../Components/Card';
import TextButton from '../../Components/TextButton';
import axiosIns from '../../helpers/helpers';
import ActivityIndicatorExample from '../../Components/Loading';
import Loader from '../../Components/Loader';
// import { Item } from 'react-native-paper/lib/typescript/components/List/List';
export const Home = ({navigation}) => {
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [animals, setAnimals] = React.useState([]);
  const [searched, setSearched] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [available, setAvailable] = React.useState([]);
  async function fetchanimal() {
    setLoading(true);
    let {data} = await axiosIns.get('animals/');
    
    return data;
  }
  React.useEffect(() => {
    setLoading(false);
    setAnimals([]);
    if(!loading){
      fetchanimal().then(data => {
        setLoading(false);
        setAnimals(data);
      });
    }
    
  }, []);
  function renderHeader() {
    return (
      <Header
        leftComponent={
          <View
            style={{
              justifyContent: 'center',
              position: 'absolute',
              marginTop: 25,
              zIndex: 1,
            }}>
            <TouchableOpacity
              style={{
                marginLeft: 25,
              }}
              onPressIn={() => {
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{width: 30, height: 30, tintColor: COLORS.darkGray2}}
              />
            </TouchableOpacity>
          </View>
        }
        title={'My Herds'}
      />
    );
  }
  // console.log(available)
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Loader loading={loading} boxstyle={{
      }}/>
      {renderHeader()}

      <View
        // showsVerticalScrollIndicator={false}
        style={{
          marginVertical: 0,
          width: '88%',
          // marginTop: '20%',
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          alignSelf: 'center',
          // height:100
        }}>
        {animals.map(a => {
          if (a.data.length != 0) {
            return (
              <TextButton
                buttonContainerStyle={{
                  marginTop: SIZES.padding,
                }}
                icon={{uri: 'http://herdhelp.herokuapp.com' + a.data[0].image}}
                key={a.id}
                label={`My ${a.label}'s`}
                onPress={() => {
                  navigation.navigate('Add', {
                    label: `My ${a.label}'s`,
                    data: a.data,
                  });
                }}
              />
            );
          }
        })}
      </View>
    </View>
  );
};
