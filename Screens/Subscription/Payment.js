import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { images,FONTS,SIZES, COLORS } from '../../Components/Constants';
import Header from '../../Components/Header'
export default function Payment({navigation}) {
    function renderheader() {
        return (
          <Header
            leftComponent={
              <View
                style={{
                  justifyContent: 'center',
                  position: 'absolute',
                  marginTop: 20,
                  zIndex: 1,
                }}>
                <TouchableOpacity
                  style={{
                    marginLeft: 25,
                    backgroundColor: COLORS.Primary,
                    height: 40,
                    width: 40,
                    justifyContent: 'center',
                    borderRadius: SIZES.base,
                  }}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Image
                    source={images.back}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: COLORS.white,
                      alignSelf: 'center',
                    }}
                  />
                </TouchableOpacity>
              </View>
            }
            title={'Payment'}
          />
        );
      }
  return (
    <View style={{
        flex:1,
        backgroundColor:COLORS.white
      }}>
        {renderheader()}
      </View>
  )
}