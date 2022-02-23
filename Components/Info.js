import { View, Text ,TouchableOpacity,Image, ScrollView} from 'react-native';
import React from 'react';
import Header from './Header';
import SquareCard from './SquareCard';
import ImageCard from './ImageCard';
import { COLORS, SIZES,images,FONTS } from './Constants';
import InfoItem from './InfoItem';
import TextButton from './TextButton';
import axiosIns from '../helpers/helpers';
export const Info=({ navigation, route })=>{
  const [animal, setAnimal] = React.useState([]);
  function getMedication(){
    let {data} = axiosIns.get('medication/')
    return data
  }
  React.useEffect(() => {
    let {value} = route.params
    setAnimal(value)
    console.log(animal)
}, [])
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

      <InfoItem label="Tag Number" value={animal?.tag_number} />
      
      <InfoItem
        label="Mother Tag"
        value={animal?.mother_tagnumber}
        // withDivider={false}
      />
      <InfoItem
        label="Father Tag"
        value={animal?.father_tagnumber}
      />
      <InfoItem
        label="Date Of Birth"
        value={animal?.birth_date}
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
      }}>
        <Image source={{uri:animal?.image}} style={{width: 100,
          height: 100,
          margin:10,
          // borderRadius: 100 / 2,
          alignSelf: 'center',}} />
      </View>
    )}
function renderSectionTwo() {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        marginBottom:SIZES.padding

      }}>
      <InfoItem
        label="Vaccinated?"
        value={animal?.vaccinated?"Yes":"No"}
      />
      <InfoItem label="vaccination Date" value={animal?.vaccination_date} withDivider={false} />
    </View>
  );
}
function renderSectionThree() {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
      }}>
      <InfoItem
        label="Weight?"
        value={`${animal?.weight} lbs`}
      />
      <InfoItem label="Price" value={ `$ ${animal?.price}`} />
      <InfoItem label="Type" value={animal?.bought==false?"Birth":"Purchased" } withDivider={false} />
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
      <InfoItem label="Breed" value={ animal?.breed} />
      <InfoItem label="Bred" value={animal?.bred==false?"No":"Yes"} withDivider={false} />
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
        paddingBottom:SIZES.padding
      }}>
      <InfoItem label="Breed" value={ animal?.breed} />
      <InfoItem label="Bred" value={animal?.bred==false?"No":"Yes"} withDivider={false} />
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
      titleStyle={{
        // marginLeft: 55,
      }}
      
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
        {renderSectionThree()}
        {renderSectionFour()}
        {renderSectionTwo()}
      </ScrollView>
    </View>
  );
};

