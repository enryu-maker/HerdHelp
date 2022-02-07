import { View, Text,Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, SIZES,images, FONTS } from './Constants';
import LineDivider from './LineDivider';

export const ImageCard=({Name,onPress,style,Tag,Weight, purchased, birth, purchase,species })=>{
  return (
    <View>
<TouchableOpacity style={{
        flexDirection:'column',
        backgroundColor:COLORS.lightGray2,
        height:320,
        width:170,
        borderRadius:SIZES.radius,
        alignSelf:'center',
        // justifyContent:'space-evenly',
        // margin:'20%',
        ...style
    }}
    onPress={onPress}>
      <View style={{padding:5}}>
        <Text style={[FONTS.h2,{alignSelf:'center'}] }>
        Details
        </Text>
        </View>
        <View style={{justifyContent:'space-evenly',alignItems:'center',marginTop:10}}>
        <Text style={[FONTS.body3,{padding:8}]}>
        Name: {Name}
        </Text>
        <LineDivider/>
        <Text style={[FONTS.body3,{padding:8}]}>
            Tag: {Tag}
        </Text>
        <LineDivider/>
        <Text style={[FONTS.body3,{padding:8}]}>
            Weight: {Weight} lbs
        </Text>
        <LineDivider/>
        {
          purchased == 1 ? <Image source={purchase} style={{ width:80,height:80,margin:10}}/> : <Image source={birth} style={{ width:80,height:80,margin:10}}/>
        }
        <LineDivider/>
        <Text style={[FONTS.body3,{padding:8}]}>
        Species: {species}
        </Text>
        </View>
    </TouchableOpacity>
    </View>
    
  );
}
export default ImageCard;
