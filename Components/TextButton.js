import React from 'react';
import {
    TouchableOpacity,
    Text,
    View
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
    onPress
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
                height:50,
                width:'88%',
                alignSelf:'center'
            }}
            disabled={disabled}
            onPress={onPress}
        >
            <Text style={{ color: COLORS.white, ...FONTS.h3, ...labelStyle }}>
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
                    <ActivityIndicatorExample/>
            </View>
            }
        </TouchableOpacity>
    )
}

export default TextButton;