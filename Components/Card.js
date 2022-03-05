import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, FONTS, images, SIZES } from './Constants';
const Card=({
    Tagnumber,
    Name,
    // Species,
    Gender,
    Weight,
    image,
    onPress,
    navigation
})=>{
  return (
    <TouchableOpacity style={{backgroundColor:COLORS.lightGray2,
    height:120,
    margin:SIZES.base2,
    borderRadius:SIZES.radius,
    flexDirection:'row',
    justifyContent:'space-evenly',
    width:'88%',
    alignSelf:'center'}}
    onPress={onPress}>
      <View style={{justifyContent:'center',margin:SIZES.padding}}>
          <Image source={{uri: 'https://api-herdhelp-nerdtech-q984k.ondigitalocean.app' + image}}
          style={{height:50,width:50,}}/>
      </View>
      <View style={{
          flexDirection:'column',
          justifyContent:"space-evenly"
      }}>
          <Text style={[FONTS.h4,{letterSpacing:3}]}>
              {Tagnumber}
          </Text>
          <Text style={[FONTS.h4,{letterSpacing:3,fontWeight:'700'}]}>
              {Name}
          </Text>
          <Text style={[FONTS.h4,{letterSpacing:3}]}>
              {Weight} lbs
          </Text>
      </View>
      <View style={{
          flexDirection:'column',
          justifyContent:'center'
      }}>
          {/* <Text style={FONTS.h4,{letterSpacing:3}}>
              {Species}
          </Text> */}
          <View style={{justifyContent:'center',margin:SIZES.padding}}>
          <Image source={Gender=="Male"? images.male:images.female}
          style={{height:35,width:35,}}/>
      </View>
      </View>
    </TouchableOpacity>
  );
}
export default Card;
