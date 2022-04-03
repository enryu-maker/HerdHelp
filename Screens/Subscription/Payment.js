import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import {CardField, CardForm,confirmPayment,PaymentIntents,ThreeDSecure,useStripe} from '@stripe/stripe-react-native';
import React from 'react';
import {images, FONTS, SIZES, COLORS} from '../../Components/Constants';
import Header from '../../Components/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextButton from '../../Components/TextButton';
import ApiService from './api';
export default function Payment({navigation,route}) {
  const [card,setCard] = React.useState([])
  const [cond,setCond] = React.useState(false)
  const [loading,setLoading] = React.useState(false)

  const [Amount,setAmount] =React.useState(0)
    React.useEffect(()=>{
      let {data} = route.params
      setAmount(data)
    },[])
  const stripe = useStripe()
  const handleSubmit = async () => {
    setLoading(true)
    const {paymentMethod, error} = await stripe.createPaymentMethod(
      {
       type:"Card",
       card:card,       
  })
  const handlePay= async (client_secret) =>
   {
    let {error,paymentIntent}  = await confirmPayment(client_secret,{
    type:"Card",
    billingDetails:"Kira"
  })
  if(paymentIntent){
    console.log(paymentIntent.id)
  }
  else if (error){
    alert("Something went wrong")
  }
else{
  alert("somthing went wrong")
}
}
   ApiService.saveStripeInfo(
    {
   payment_method_id: paymentMethod.id,
   amount:Amount
  }
  )
  .then(response => {
    handlePay(response.data.payment_intent.client_secret)
    // console.log(response.data.payment_intent.client_secret);
  }).catch(error => {
    console.log(error)
  })
  }

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
          backgroundColor:COLORS.white,
        }}
        style={{
          height:Platform.OS=="ios"?180:280
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
          handleSubmit().then(()=>{
            setLoading(false)
          })
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
        loading={loading}
        disabled={!cond}
      />
    </View>
  );
}
