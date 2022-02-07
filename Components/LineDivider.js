import React from 'react';
import {
    View
} from 'react-native';
import { COLORS } from "./Constants"

const LineDivider = ({ lineStyle }) => {
    return (
        <View
            style={{
                height: 2,
                width: "75%",
                backgroundColor: COLORS.gray2,
                ...lineStyle
            }}
        />
    )
}

export default LineDivider;