import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {COLORS, FONTS, images, SIZES} from '../../Components/Constants';
import TextButton from '../../Components/TextButton';
import axiosIns from '../../helpers/helpers';
import Loader from '../../Components/Loader';
export const Home = ({navigation}) => {
  const [animals, setAnimals] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  async function fetchanimal() {
    setLoading(true)
    let {data} = await axiosIns.get('animals/');
    return data;
  }
  React.useEffect(() => {
      fetchanimal().then(data => {
        setAnimals(data);
        setLoading(false);
      });
  }, []);
  // console.log(global.stat)

  // console.log(global.stat)
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
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* <Loader loading={loading}/> */}
      {renderHeader()}
      <View
        style={{
          marginVertical: 0,
          width: '88%',
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          alignSelf: 'center'
        }}>
        {animals.map(a => {
          if (a.data.length != 0) {
            return (
              <TextButton
                buttonContainerStyle={{
                  marginTop: SIZES.padding,
                }}
                icon={{uri: 'https://api-herdhelp-nerdtech-q984k.ondigitalocean.app' + a.data[0].image}}
                key={a.id}
                label={`My ${a.label}'s`}
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
        })}
      </View>
    </View>
  );
};
