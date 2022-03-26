import { View, Text } from 'react-native'
import React from 'react'
import { images,COLORS,SIZES,FONTS } from '../../Components/Constants';
import { Dropdown } from 'sharingan-rn-modal-dropdown';

export default function SettingContent({
    title,
    append

  }){
    return(
        <View
        style={{
            flexDirection: 'row',
            height: 70,
            alignItems: 'center',
            justifyContent:"space-evenly"
        }}
    >
        <Text style={{ color: COLORS.gray, ...FONTS.h2 }}>{title}</Text>
        {append}
        </View>
    )
  }