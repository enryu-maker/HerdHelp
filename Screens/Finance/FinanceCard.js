import { View, Text, Image, TouchableOpacity,Platform } from 'react-native';
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
    alignSelf:'center',
}}
    >
      <View style={{flexDirection:"column",justifyContent:"space-evenly"}}>
          <Text style={{paddingLeft:SIZES.padding,paddingTop:SIZES.padding-8,...FONTS.h2}}>{category}</Text>
          <View style={{flexDirection:"row"}}>
          <Text style={
            Platform.OS=="android"?{paddingLeft:SIZES.padding,paddingTop:5,...FONTS.h3,color:COLORS.green}:{paddingLeft:SIZES.padding,paddingTop:5,...FONTS.h2,color:COLORS.green}
          }>{` Qty: ${quantity}`}</Text>
          <Text style={
          Platform.OS=="android"?{paddingTop:5,...FONTS.h3,marginLeft:60,color:COLORS.green}:{paddingTop:5,...FONTS.h2,marginLeft:60,color:COLORS.green}
            }>{`$ ${price}`}</Text>
          </View>
          <Text 
          style={
          Platform.OS=="android"?{paddingLeft:SIZES.padding,paddingTop:5,...FONTS.h3}:{paddingLeft:SIZES.padding,paddingTop:5,...FONTS.h2}
          }
          
          >{` Date: ${date}`}</Text>
      </View>
    </View>
  );
}
export default FinanceCard;
