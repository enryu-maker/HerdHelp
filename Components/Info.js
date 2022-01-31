import { View, Text ,TouchableOpacity,Image} from 'react-native';
import React from 'react';
import Header from './Header';

import { COLORS, SIZES,images } from './Constants';
export const Info=(props)=>{
  return (
    <View style={{
        flex:1
        }}>
      {/* <Text>{props.route.params.value}</Text> */}
      <Header 
      leftComponent={
        <View style={{
            justifyContent: 'center',
            position:'absolute',
                marginTop:25,
                zIndex: 1,
                
          }}>
            <TouchableOpacity
              style={{
                // marginTop: 20,
                marginLeft: 25,
              }}
              onPress={() => { props.navigation.goBack() }}>
              <Image source={images.back} style={{width:28,height:28,tintColor:COLORS.darkGray2}}/>

            </TouchableOpacity>

          </View>
      }
      title={"More Info"}
    />
    </View>
  );
}
