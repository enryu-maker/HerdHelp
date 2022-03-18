import { View, Text, TouchableOpacity,Image} from 'react-native'
import React from 'react'
import Header from '../../Components/Header';
import { images,SIZES,FONTS,COLORS } from '../../Components/Constants';
export default function Parents({navigation}) {
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
            backgroundColor:COLORS.Primary,
            height:40,
            width:40,
            justifyContent:"center",
            borderRadius:SIZES.base,
            }}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Image
            source={images.menu}
            style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
          />
        </TouchableOpacity>
      </View>
    }
    title={'Parents'}
  />
        )}

  return (
    <View style={{
        flex:1,
        backgroundColor:COLORS.white
    }}>
      {renderheader()}
    </View>
  )
}