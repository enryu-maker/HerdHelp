import React from 'react';
import {
    View,
    Text
} from 'react-native';

import LineDivider from './LineDivider';
import { COLORS, FONTS } from './Constants';

const InfoItem = ({ label, value, withDivider = true }) => {
    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    height: 70,
                    alignItems: 'center',
                }}
            >
                <Text style={{ color: COLORS.gray, ...FONTS.h2 }}>{label}</Text>
                <Text style={{ flex: 1, textAlign: 'right', ...FONTS.body2 }}>{value}</Text>
            </View>

            {withDivider &&
                <LineDivider
                    lineStyle={{
                        backgroundColor: COLORS.lightGray1
                    }}
                />
            }
        </>
    )
}

export default InfoItem;