import { View, Text ,TouchableOpacity,Image,Platform,} from 'react-native'
import React from 'react'
import { COLORS, FONTS, images, SIZES } from '../../Components/Constants'

const  ReportB=({
    img,
    reportText,
    imgstyle,
    reportTextstyle,
    btnStyle,
    onPress,
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
              <Image source={{uri:img}}
              style={{height:50,width:50,}}/>
          </View>
          <View style={{
              flexDirection:'column',
              justifyContent:"space-evenly"
          }}>
              <Text style={[FONTS.h2,{letterSpacing:1,fontWeight:'600'}]}>
                  {reportText}
              </Text>
              
          </View>
        </TouchableOpacity>
    
  )
}
export default ReportB;
