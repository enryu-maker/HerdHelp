import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import FormInput from '../../Components/FormInput';
import TextButton from '../../Components/TextButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axiosIns from '../../helpers/helpers';
import {COLORS, images, SIZES, FONTS} from '../../Components/Constants';
export const Weight =({ navigation })=> {
  const [tag, setTag] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [weight, setWeight] = React.useState(0);
  const [err, setErr] = React.useState("");
  async function updateWeight(){
    if (tag!="",weight!=0){
      try{
        let {resp} = await axiosIns.patch(`animals/${ tag }`,{
          'weight':weight
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((Response)=>{
          if (Response.status==200){
            alert("Weight Updated")
          }
          else{
          setErr(`Animal with tag ${tag} not found`)
          }
        })
        setLoading(true)
        return resp
      }catch(err){
        // if(err){
        //   setErr(`Animal with tag ${tag} not found`)
        // }
      }
    }
    else{
      setErr("Please Enter valid Data")
    }
  }
  function renderHeader() {
    return (
      <Header
        leftComponent={
          <View
            style={{
              justifyContent: 'center',
              position: 'absolute',
              marginTop: 25,
              zIndex: 1,
            }}>
            <TouchableOpacity
              style={{
                marginLeft: 25,
              }}
              onPress={() => {
                navigation.goBack();
              }}>
            <Image source={images.back} style={{width:30,height:30,tintColor:COLORS.darkGray2}}/>

            </TouchableOpacity>
          </View>
        }
        title={'Update Weight'}
      />
    );
  }
  function renderForm() {
    return (
      <View
        style={{
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        <Text style={{color:COLORS.red,alignSelf: 'center',...FONTS.body3}}>{err}</Text>
        <FormInput
          prependComponent={
            <View style={{alignSelf: 'center', justifyContent: 'center'}}>
              <Image
                source={images.tag}
                style={{width: 26, height: 26, tintColor: COLORS.Primary}}
              />
            </View>
          }
          label="Tag Number"
          value={tag}
          onChange={value => {
            setTag(value);
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />
        <FormInput
          prependComponent={
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                marginLeft: 0,
              }}>
              <Image
                source={images.scale}
                style={{width: 28, height: 28, tintColor: COLORS.Primary}}
              />
            </View>
          }
          label="Weight"
          value={weight}
          onChange={value => {
            setWeight(value);
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}

      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: 40,
        }}>
        {renderForm()}
      </KeyboardAwareScrollView>

      <TextButton
        onPress={() => {
          updateWeight()
        }}
        icon={images.weight}

        buttonContainerStyle={{
          // flex:1,
          height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding + 10,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label={'Update Weight'}
      />
    </View>
  );
}
