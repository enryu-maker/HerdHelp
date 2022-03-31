import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, FONTS, images, SIZES } from './Constants';
const Card=({
    Tagnumber,
    Name,
    cond,
    Gender,
    Weight,
    image,
    onPress,
    weight_kg,
    navigation
})=>{
  return (
    <TouchableOpacity style={{backgroundColor:COLORS.lightGray2,
    height:120,
    margin:SIZES.base2,
    borderRadius:SIZES.radius,
    flexDirection:'row',
    justifyContent:"space-between",
    width:'88%',
    alignSelf:'center'}}
    onPress={onPress}>
      <View style={{justifyContent:'center',marginLeft:SIZES.padding}}>
          {
              cond?(<Image source={{uri: 'https://api-herdhelp-nerdtech-q984k.ondigitalocean.app' + image}} style={{height:50,width:50,}}/>):(<Image source={{uri: image}} style={{height:50,width:50,}}/>)
          }
      </View>
      <View
            style={{
                height: 80,
                width: 1,
                backgroundColor: COLORS.Primary,
                justifyContent:"center",
                alignSelf:"center",
                position:"absolute",
                marginLeft:85
            }}
        />
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
              {global.unit?`${Weight} lbs`:`${weight_kg} kg`}
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
      <Image source={images.rightone} style={{
                height:15,
                width:15,
                margin:10,
                tintColor:COLORS.black
            }}/>
    </TouchableOpacity>
  );
}
export default Card;
