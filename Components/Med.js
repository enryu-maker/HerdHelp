import { View, Text } from 'react-native'
import React from 'react'
import { COLORS, FONTS, images, SIZES } from './Constants';

const Med=({
    medication_name,
    medication_date,
    disease,
    dosage,
    withdrawal,
    withdrawal_date
})=>{
    return(
        <View style={{backgroundColor:COLORS.lightGray2,
            height:140,
            margin:SIZES.base2,
            borderRadius:SIZES.radius,
            width:'88%',
            alignSelf:'center'}}>
          <Text style={Platform.OS=="android"?{letterSpacing:2,padding:10,...FONTS.h3,color:COLORS.green}:{letterSpacing:2,padding:10,...FONTS.h2,color:COLORS.green}}>
              {disease}     {dosage}
          </Text>
    <View style={{
          flexDirection:'row',
          justifyContent:"space-between",
      }}>
            <Text style={Platform.OS=="android"?{letterSpacing:2,padding:10,...FONTS.body3,color:COLORS.black}:{letterSpacing:2,padding:10,...FONTS.body2,color:COLORS.black}}>


              {medication_name}
          </Text>

          <Text style={Platform.OS=="android"?{letterSpacing:2,padding:10,...FONTS.h3,color:COLORS.green}:{letterSpacing:2,padding:10,...FONTS.h2,color:COLORS.green}}>


              {medication_date}
          </Text>
      </View>
      <View style={{
          flexDirection:'row',
          justifyContent:"space-between",
      }}>
            <Text style={Platform.OS=="android"?{letterSpacing:2,padding:10,...FONTS.body3,color:COLORS.black}:{letterSpacing:2,padding:10,...FONTS.body2,color:COLORS.black}}>
              {withdrawal}
          </Text>

          <Text style={Platform.OS=="android"?{letterSpacing:2,padding:10,...FONTS.h3,color:COLORS.red}:{letterSpacing:2,padding:10,...FONTS.h2,color:COLORS.red}}>

              {withdrawal_date}
          </Text>
      </View>
      {/* <Text style={{letterSpacing:2,padding:10,...FONTS.h2,color:COLORS.green}}>
              {dosage}
          </Text> */}

    </View>
    )
}
export default Med;