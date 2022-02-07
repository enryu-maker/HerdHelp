import { View, Text,Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, SIZES,images, FONTS } from './Constants';

export default function Vertical({Img,type,onPress,style}) {
  return (
    <View>
<TouchableOpacity style={{
        flexDirection:'column',
        backgroundColor:COLORS.lightGray2,
        height:150,
        width:150,
        borderRadius:SIZES.radius,
        alignSelf:'center',
        justifyContent:'space-evenly',
        margin:'20%',
        ...style
    }}
    onPress={onPress}>
        <Text style={[FONTS.h3,{alignSelf:'center'}]}>
            {type}
        </Text>
    </TouchableOpacity>
    </View>
  );
}
