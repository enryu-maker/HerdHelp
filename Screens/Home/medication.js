import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import FormInput from '../../Components/FormInput';
import TextButton from '../../Components/TextButton';
import {images, COLORS, SIZES, FONTS} from '../../Components/Constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormDateInput from '../../Components/FormDateInput';

export const Medication = ({ navigation }) =>{
  const [tag, setTag] = React.useState('');
  const [treat, setTreat] = React.useState('');
  const [Dis, setDis] = React.useState('');
  const [med, setMed] = React.useState('');
  const [dos, setDos] = React.useState('');
  const [withdraw, setWithdraw] = React.useState('');
  const [date, setDate] = React.useState('');

  function renderheader() {
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
                // marginTop: 20,
                marginLeft: 25,
              }}
              onPress={() =>  {navigation.goBack()} }>
              <Image source={images.back} style={{width:30,height:30,tintColor:COLORS.darkGray2}}/>

            </TouchableOpacity>
          </View>
        }
        title={'Add Medication'}
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
            // justifyContent: 'center',
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />

        <FormInput
          prependComponent={
            <View style={{alignSelf: 'center', justifyContent: 'center'}}>
              <Image
                source={images.disease}
                style={{width: 28, height: 28, tintColor: COLORS.Primary}}
              />
            </View>
          }
          label="Reason for Medication?"
          value={Dis}
          onChange={value => {
            setDis(value);
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />
        <FormInput
          prependComponent={
            <View style={{alignSelf: 'center', justifyContent: 'center'}}>
              <Image
                source={images.medicines}
                style={{width: 28, height: 28, tintColor: COLORS.Primary}}
              />
            </View>
          }
          value={med}
          onChange={value => {
            setMed(value);
          }}
          label={'Medicine'}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />
        <FormInput
          prependComponent={
            <View style={{alignSelf: 'center', justifyContent: 'center'}}>
              <Image
                source={images.dropper}
                style={{width: 28, height: 28, tintColor: COLORS.Primary}}
              />
            </View>
          }
          value={dos}
          // keyboardType="numeric"
          onChange={value => {
            setDos(value);
          }}
          label={'Dosage'}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />
        <FormInput
          prependComponent={
            <View style={{alignSelf: 'center', justifyContent: 'center'}}>
              <Image
                source={images.withdraw}
                style={{width: 28, height: 28, tintColor: COLORS.Primary}}
              />
            </View>
          }
          value={withdraw}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          onChange={value => {
            setWithdraw(value);
          }}
          label={'Withdrawal'}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />
        <FormDateInput
          label="Withdrawal Date"
          placeholder="MM/DD/YYYY"
          value={date}
          setDate={setDate}
          containerStyle={{
            marginTop: SIZES.radius,
            // marginLeft:20
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
            width: '88%',
            alignSelf: 'center',
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
      {renderheader()}
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
          alert([tag, med, dos, withdraw, date, Dis]);
        }}
        buttonContainerStyle={{
          // flex:1,
          height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding + 10,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label={'Add Medication'}
      />
    </View>
  );
}
