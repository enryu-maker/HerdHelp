import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, FONTS, images, SIZES } from '../../Components/Constants';
const FinanceCard=({
    category,
    price,
    date,
    quantity,
    
})=>{
  return (
    <View style={{backgroundColor:COLORS.lightGray2,
    height:120,
    margin:SIZES.base2,
    borderRadius:SIZES.radius,
    width:'88%',
    alignSelf:'center'
}}
    >
      <View style={{flexDirection:"column"}}>
          <Text style={{paddingLeft:SIZES.padding,paddingTop:SIZES.padding,...FONTS.h2}}>{category}</Text>
          <View style={{flexDirection:"row"}}>
          <Text style={{paddingLeft:SIZES.padding-5,paddingTop:5,...FONTS.body2,color:COLORS.green}}>{` Qty: ${quantity}`}</Text>
          <Text style={{paddingLeft:SIZES.padding,paddingTop:5,...FONTS.body2,marginLeft:80,color:COLORS.green}}>{`$ ${price}`}</Text>
          </View>
          <Text style={{paddingLeft:SIZES.padding-5,paddingTop:5,...FONTS.body2}}>{` Date: ${date}`}</Text>
      </View>
    </View>
  );
}
export default FinanceCard;
