import { View, Text,Image ,TouchableOpacity} from 'react-native'
import React from 'react'
import { COLORS, FONTS, images, SIZES } from '../../Components/Constants'

const SubscriptionCard=({
    label,
    price,
    description,
    buttonStyle,
    onPress
})=>{
  return (
    <TouchableOpacity
    style={{
        backgroundColor:COLORS.lightGray2,
        height:100,
        width:"88%",
        alignSelf:"center",
        borderRadius:SIZES.radius,
        ...buttonStyle
    }}
    onPress={onPress}
    >
        <View style={{
            justifyContent:"space-between",
            flexDirection:"row",
        }}>
            <Text style={{
                ...FONTS.h2,
                marginTop:10,
                marginLeft:10,

            }}>Tier 1</Text>
            <Image source={images.rightone} style={{
                height:15,
                width:15,
                margin:10
            }}/>
        </View>
        <Text style={{
            ...FONTS.h3,
            marginLeft:30
        }}>
            $ 0.99
        </Text>

    </TouchableOpacity>
      
  )
}
export default SubscriptionCard;