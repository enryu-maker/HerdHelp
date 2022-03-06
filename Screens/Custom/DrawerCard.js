import { View, Text ,Image,TouchableOpacity,Platform} from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../../Components/Constants'

export default function DrawerCard({img,name,imgstyle,namestyle,onPress,contstyle}) {
  return (
    <TouchableOpacity
    onPress={onPress}
    >
        <View style={{
            // paddingTop:10,
            flexDirection:"row",
            paddingLeft:25,
            padding:10,
            backgroundColor:COLORS.Primary,
            width:"80%",
            alignSelf:"center",
            borderRadius:10,
            margin:5,
            alignContent:"center",
            height:48,
            ...contstyle
        }}>
            <Image source={img} style={{
                tintColor:COLORS.white,
                width:25,
                height:25,
                ...imgstyle
            }}/>
            <Text style={{
                paddingLeft:15,
                letterSpacing:2,
                color:COLORS.white,
                ...namestyle,
                ...FONTS.h2,
            }}>{name}</Text>
        </View>
    </TouchableOpacity>
  )
}