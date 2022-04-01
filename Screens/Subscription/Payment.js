import {View, Text, TouchableOpacity, Image} from 'react-native';
import {CardField, CardForm} from '@stripe/stripe-react-native';
import React from 'react';
import {images, FONTS, SIZES, COLORS} from '../../Components/Constants';
import Header from '../../Components/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextButton from '../../Components/TextButton';
export default function Payment({navigation}) {
  const [card,setCard] = React.useState([])
  const [cond,setCond] = React.useState(false)
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
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderheader()}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          marginVertical: 0,
          width: '88%',
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          alignSelf: 'center'
        }}>
          <Image source={images.card} style={{
            height:100,
            width:100,
            marginBottom:10,
            alignSelf:"center"
          }}/>
      <CardForm
        // postalCodeEnabled={true}
        
        cardStyle={{
          backgroundColor:COLORS.white
        }}
        style={{
          height:180
        }}
        onFormComplete={cardDetails=>{
          setCond(true)
          setCard(cardDetails)
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      </KeyboardAwareScrollView>
      <TextButton
        onPress={() => {
          
        }}
        icon={images.sack}
        // loading={loading}
        buttonContainerStyle={{
          // flex:1,
          height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding + 10,
          borderRadius: SIZES.radius,
          backgroundColor:cond? COLORS.Primary:COLORS.transparentPrimary2,
        }}
        label={'Confirm Payment'}
        disabled={!cond}
      />
    </View>
  );
}
