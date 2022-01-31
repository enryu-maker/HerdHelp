import React from 'react';
import { 
    View,
    Text,
    Image
} from 'react-native';
import { COLORS, FONTS } from "./Constants"

const Header = ({ containerStyle, title, titleStyle, leftComponent, rightComponent,img }) => {
    return (
        <View
            style={{
                height: 80,
                flexDirection: 'row',
                ...containerStyle,
                alignSelf:'center',
                marginTop:'8%'
            }}
        >
            {
                leftComponent
            }
            {title?
            (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{  ...FONTS.h3, ...titleStyle}}>{title}</Text>
        </View>):(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image
                        source={img}
                        resizeMode="contain"
                        style={{
                            height: 200,
                            width: 250
                        }}
                    />
            </View>
        )}
            
            {
                rightComponent
            }

        </View>
    )
}

export default Header