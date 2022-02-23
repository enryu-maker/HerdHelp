import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image
} from 'react-native';
import { FONTS, COLORS ,SIZES} from "./Constants";
import ActivityIndicatorExample from './Loading';

const TextButton = ({
    buttonContainerStyle,
    disabled,
    label,
    labelStyle,
    label2 = "",
    label2Style,
    onPress,
    icon,
    iconStyle
}) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection:"row",
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.Primary,
                ...buttonContainerStyle,
                borderRadius:SIZES.radius,
                height:55,
                width:'88%',
                alignSelf:'center'
            }}
            disabled={disabled}
            onPress={onPress}
        >
            {
                icon != false &&
                <View
                    style={{
                        margin:10
                        // flex: 1,
                        // alignSelf: "flex-start",
                        // color: COLORS.white,
                        // ...FONTS.h3,
                        // ...label2Style
                    }}
                >
                    <Image source={icon} style={{...iconStyle,height:25,width:25,tintColor:COLORS.white}}/>
            </View>
            }
            <Text style={{ color: COLORS.white, ...FONTS.h3, ...labelStyle,letterSpacing:2 }}>
                {label}
            </Text>

            {label2 != false &&
                <View
                    style={{
                        flex: 1,
                        alignSelf: "flex-end",
                        color: COLORS.white,
                        // ...FONTS.h3,
                        // ...label2Style
                    }}
                >
            </View>
            }
        </TouchableOpacity>
    )
}

export default TextButton;