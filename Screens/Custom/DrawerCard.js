import { View, Text ,Image,TouchableOpacity,Platform} from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../../Components/Constants'

export default function DrawerCard({img,name,imgstyle,namestyle,onPress}) {
  return (
    <TouchableOpacity
    onPress={onPress}
    >
        <View style={{
            // paddingTop:10,
            flexDirection:"row",
            paddingLeft:25,
            padding:10,
            backgroundColor:COLORS.white,
            width:"80%",
            alignSelf:"center",
            borderRadius:10,
            margin:5,
            alignContent:"center"
        }}>
            <Image source={img} style={{
                tintColor:COLORS.Primary,
                width:25,
                height:25,
                ...imgstyle
            }}/>
            <Text style={{
                paddingLeft:15,
                letterSpacing:2,
                color:COLORS.Primary,
                ...namestyle,
                ...FONTS.h2,
            }}>{name}</Text>
        </View>
    </TouchableOpacity>
  )
}