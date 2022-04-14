import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, images, SIZES} from './Constants';
import { baseURL } from '../helpers/helpers';
const Card = ({
  Tagnumber,
  Name,
  cond,
  Gender,
  Weight,
  image,
  onPress,
  weight_kg,
  navigation,
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.lightGray2,
        height: 120,
        margin: SIZES.base2,
        borderRadius: SIZES.radius,
        flexDirection: 'row',
        justifyContent: "space-between",
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
        width: '88%',
        alignSelf: 'center',

      }}
      onPress={onPress}>
      <View style={{justifyContent: 'center', marginRight: SIZES.padding,height: 80, width: 80,alignSelf:"center",marginLeft:15}}>
        {cond ? (
          <Image
            source={{
              uri:
                baseURL +
                image,
            }}
            resizeMode="cover"
            style={{height: 80, width: 80,borderRadius:SIZES.padding}}
          />
        ) : (
          <Image source={{uri: image}} style={{height: 80, width: 80,borderRadius:SIZES.padding}}
          />
        )}
      </View>
      {/* <View
            style={{
                height: 80,
                width: 1,
                backgroundColor: COLORS.Primary,
                justifyContent:"center",
                alignSelf:"center",
                position:"absolute",
                marginLeft:130,
                margin:20
            }}
        /> */}
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          position:"absolute",
          marginLeft:120,
          marginTop:15
        }}>
        <Text style={[FONTS.h4, {letterSpacing: 3,padding:3}]}>{Tagnumber}</Text>
        <Text style={[FONTS.h4, {letterSpacing: 3, fontWeight: '700',padding:3}]}>
          {Name}
        </Text>
        <Text style={[FONTS.h4, {letterSpacing: 3,padding:3}]}>
          {global.unit ? `${Weight} lbs` : `${weight_kg} kg`}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
        //   justifyContent: 'center',
        }}>
            <Image
        source={images.rightone}
        style={{
          height: 15,
          width: 15,
          margin: 10,
          tintColor: COLORS.black,
        //   position:"absolute",
          alignSelf:"flex-end"
        }}
      />
        <View style={{}}>
          <Image
            source={Gender == 'Male' ? images.male : images.female}
            style={{height: 40, width: 40,justifyContent:"center",marginTop:10,marginRight:20}}
          />
        </View>
      </View>
      
    </TouchableOpacity>
  );
};
export default Card;
