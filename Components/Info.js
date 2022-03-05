import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import Header from './Header';
import {COLORS, SIZES, images, FONTS} from './Constants';
import InfoItem from './InfoItem';
import axiosIns from '../helpers/helpers';
export const Info = ({navigation, route}) => {
  const [animal, setAnimal] = React.useState([]);
  const [med, setMed] = React.useState([]);

   async function getMedication() {
    let {data} = await axiosIns.get(`getmedication/${animal?.tag_number}`);
    setMed(data)
    return data;
  }
  React.useEffect(() => {
    let {value} = route.params;
    setAnimal(value);
    getMedication()
  }, [med]);

  function renderSectionOne() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        <InfoItem label="Name" value={animal?.name} />
        <InfoItem label="Gender" value={animal?.gender} />
        <InfoItem label="Tag Number" value={animal?.support_tag} />
        <InfoItem
          label="Weight"
          value={`${animal?.weight} lbs`}
          withDivider={false}
        />
      </View>
    );
  }
  function renderSectionZero() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'column',
            alignSelf: 'center',
            marginLeft: 50,
          }}>
          <Image
            // source={{uri:}}
            source={{uri: 'https://api-herdhelp-nerdtech-q984k.ondigitalocean.app' + animal?.image}}
            style={{width: 80, height: 80, margin: 10, alignSelf: 'center'}}
          />
          <Text style={{alignSelf: 'center', ...FONTS.h3, paddingBottom: 10}}>
            ID: {animal?.tag_number}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.Primary,
            height: 120,
            width: 80,
            borderRadius: SIZES.radius,
            margin: 8,
            flexDirection: 'column',
            justifyContent: 'space-evenly',
          }}
          onPress={() => {
            console.log(med)
            navigation.navigate("MedCard",{
              medication:med
            })
          }}>
          <Image
            source={images.med}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.white,
              alignSelf: 'center',
            }}
          />
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{color: COLORS.white, ...FONTS.h3, alignSelf: 'center'}}>
              Med
            </Text>
            <Text
              style={{color: COLORS.white, ...FONTS.h3, alignSelf: 'center'}}>
              Details
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  function Vaccinated() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          marginBottom: SIZES.padding,
        }}>
        <InfoItem
          label="Vaccinated?"
          value={animal?.vaccinated ? 'Yes' : 'No'}
        />
        {animal?.vaccinated ? (
          <InfoItem
            label="vaccination Date"
            value={animal?.vaccination_date}
            withDivider={false}
          />
        ) : (
          <View></View>
        )}
      </View>
    );
  }
  function Type() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        <InfoItem
          label="Type"
          value={animal?.bought == false ? 'Birth' : 'Purchased'}
        />
        {animal?.bought == false ? (
          <View>
            <InfoItem label="Date Of Birth" value={animal?.birth_date} />
            <InfoItem
              label="Mother Tag"
              value={animal?.mother_tagnumber}
              // withDivider={false}
            />
            <InfoItem
              label="Father Tag"
              value={animal?.father_tagnumber}
              withDivider={false}
            />
          </View>
        ) : (
          <InfoItem
            label="Price"
            value={`$ ${animal?.price}`}
            withDivider={false}
          />
        )}
      </View>
    );
  }
  function renderSectionFour() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        <InfoItem label="Breed" value={animal?.breed} />
        <InfoItem
          label="Bred"
          value={animal?.bred == false ? 'No' : 'Yes'}
          withDivider={false}
        />
      </View>
    );
  }
  function medication() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          paddingBottom: SIZES.padding,
        }}>
        <InfoItem label="Breed" value={animal?.breed} />
        <InfoItem
          label="Bred"
          value={animal?.bred == false ? 'No' : 'Yes'}
          withDivider={false}
        />
      </View>
    );
  }
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
                style={{width: 28, height: 28, tintColor: COLORS.darkGray2}}
              />
            </TouchableOpacity>
          </View>
        }
        title={'More Info'}
        titleStyle={
          {
            // marginLeft: 55,
          }
        }
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
        }}>
        {renderSectionZero()}
        {renderSectionOne()}
        {Type()}
        {renderSectionFour()}
        {Vaccinated()}
      </ScrollView>
    </View>
  );
};
