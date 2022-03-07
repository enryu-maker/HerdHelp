import { View, Text ,TouchableOpacity,Image,Platform} from 'react-native'
import React from 'react'
import { COLORS, FONTS, images, SIZES } from '../../Components/Constants'

export default function ReportB({
    img,
    reportText,
    imgstyle,
    reportTextstyle,
    btnStyle,
    onPress,
    img2,
    reportText2,
    imgstyle2,
    reportTextstyle2,
    btnStyle2,
    onPress2
}) {
  return (
      <View style={{
          flex:1,
          flexDirection:"row",
          justifyContent:"space-evenly",
        //   height:"100%"
      }}>
    <TouchableOpacity 
    style={{
        height:"20%",
        width:"30%",
        backgroundColor:COLORS.Primary,
        margin:10,
        borderRadius:SIZES.radius,
        flexDirection:"column",
        justifyContent:"space-evenly",
        ...btnStyle
    }}
    onPress={onPress}
    >
        <Image source={img} style={{
            width:50,
            height:50,
            alignSelf:"center",
            justifyContent:"center",
            tintColor:COLORS.white,
            ...imgstyle
        }}/>
      <Text style={
         Platform.OS=="android"? {
          alignSelf:"center",
          justifyContent:"center",
       color:COLORS.white,

          ...FONTS.h3
      }:
      {
       alignSelf:"center",
       justifyContent:"center",
       color:COLORS.white,
       ...FONTS.h2,
       ...reportTextstyle

   }
      }>{reportText}</Text>
    </TouchableOpacity>
    {/* Button no2 */}
    <TouchableOpacity 
    style={{
        height:"20%",
        width:"30%",
        backgroundColor:COLORS.Primary,
        margin:10,
        borderRadius:SIZES.radius,
        flexDirection:"column",
        justifyContent:"space-evenly",
        ...btnStyle2
    }}
    onPress={onPress2}
    >
        <Image source={img2} style={{
            width:50,
            height:50,
            alignSelf:"center",
            justifyContent:"center",
            tintColor:COLORS.white,
            ...imgstyle2
        }}/>
      <Text style={
         Platform.OS=="android"? {
          alignSelf:"center",
          justifyContent:"center",
       color:COLORS.white,
          ...FONTS.h3,
       ...reportTextstyle2,
      }:
      {
       alignSelf:"center",
       justifyContent:"center",
       color:COLORS.white,
       ...FONTS.h2,
       ...reportTextstyle2

   }
      }>{reportText2}</Text>
    </TouchableOpacity>
    </View>
  )
}