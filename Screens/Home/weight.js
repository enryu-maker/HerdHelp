import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import FormInput from '../../Components/FormInput';
import TextButton from '../../Components/TextButton';
import { COLORS, images,SIZES,FONTS } from '../../Components/Constants';
export default function weight({ navigation }) {
  const [tag, setTag]=React.useState('')
  const [weight, setWeight]=React.useState('')
  return (
    <View >
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
                marginLeft: 25,
              }}
              onPress={() => { navigation.openDrawer() }}>
                <Image source={images.back} style={{width:28,height:28,tintColor:COLORS.darkGray2}}/>
            </TouchableOpacity>
              
          </View>
        }
        title={"Update Weight"}
      />
      <FormInput
        prependComponent={
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
          <Image source={images.tag} style={{width:26,height:26,tintColor:COLORS.darkGray2}}/>
            
          </View>
        }
        value={tag}
        // keyboardType="numeric"
        onChange={(value)=>{setTag(value)}}
        placeholder={"Tag Number"}
        inputStyle={{ marginLeft: 10 }}
        keytype={"next"}
      />
      <FormInput
            prependComponent={
              <View style={{ alignSelf: 'center', justifyContent: 'center',marginLeft:0 }}>
        <Image source={images.scale} style={{width:28,height:28,tintColor:COLORS.darkGray2}}/>

              </View>
            }
            value={weight}
            onChange={(value)=>{setWeight(value)}}
            placeholder={"Weight"}
            inputStyle={{ marginLeft: 10 }} 
            keytype={"go"}
            />
            <TextButton
      onPress={()=>{alert([tag,weight])}}
      buttonContainerStyle={{
        height: 55,
        alignItems: 'center',
        // marginTop: SIZES.padding,
        borderRadius: SIZES.radius,
      top:50}}
      label={"Update Weight"}/>
    </View>
  );
}
