import { View, Text,Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, SIZES,images, FONTS } from './Constants';

export const SquareCard=({Img,type,onPress})=>{
  return (
    <TouchableOpacity style={{
        flexDirection:'column',
        backgroundColor:COLORS.lightGray2,
        height:150,
        width:150,
        borderRadius:SIZES.radius,
        alignSelf:'center',
        justifyContent:'space-evenly',
        margin:'20%'
    }}
    onPress={onPress}>
        <Image
        source={Img}
        style={{
            height:80,
            width:80,
            alignSelf:'center'
        }}/>
        <Text style={[FONTS.h3,{alignSelf:'center'}]}>
            {type}
        </Text>
    </TouchableOpacity>
  );
}
export default SquareCard;
