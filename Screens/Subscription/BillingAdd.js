import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {COLORS, SIZES, FONTS, images} from '../../Components/Constants';
import Header from '../../Components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormInput from '../../Components/FormInput';
import {Dropdown} from 'sharingan-rn-modal-dropdown';
import axiosIns from '../../helpers/helpers';
import TextButton from '../../Components/TextButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function BillingAdd({ navigation }) {
  const [line1, setLine1] = React.useState('');
  const [city, setCity] = React.useState('');
  const [postalcode, setPostalcode] = React.useState('');
  const [state, setState] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [countrylist, setCountrylist] = React.useState([]);
  const [statelist, setStatelist] = React.useState([]);
  const [loading,setLoading] = React.useState(false)
    async function storeData (){
        await AsyncStorage.setItem()
    }
  async function getLocation() {
    let {data} = await axiosIns.get('payments/getlocations/');
    return data;
  }
  React.useEffect(() => {
    getLocation().then(data => {
      setCountrylist(data[0]['countrylist']);
      setStatelist(data[0]['data']);
    });
  }, []);
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
        title={'Address'}
      />
    );
  }
  function renderForm() {
    return (
      <View>
          <Dropdown
          label="Country"
          borderRadius={SIZES.radius}
          data={countrylist}
          textInputStyle={[FONTS.body3, {letterSpacing: 2}]}
          selectedItemTextStyle={[FONTS.body3, {color: COLORS.white}]}
          selectedItemViewStyle={{
            backgroundColor: COLORS.Primary,
            margin: 5,
            borderRadius: SIZES.radius,
          }}
          enableSearch
          required
          disableSelectionTick
          dropdownIcon={images.down}
          dropdownIconSize={22}
          primaryColor={COLORS.Primary}
          avatarSize={28}
          value={country}
          onChange={value => {
            setCountry(value);
          }}
          animationIn="zoomIn"
          animationOut="zoomOut"
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{
            backgroundColor: COLORS.white,
            margin: 5,
            borderRadius: SIZES.radius,
          }}
        />
        <Dropdown
          label="State"
          borderRadius={SIZES.radius}
            data={statelist}
          textInputStyle={[FONTS.body3, {letterSpacing: 2}]}
          selectedItemTextStyle={[FONTS.body3, {color: COLORS.white}]}
          selectedItemViewStyle={{
            backgroundColor: COLORS.Primary,
            margin: 5,
            borderRadius: SIZES.radius,
          }}
          required
          disableSelectionTick
          dropdownIcon={images.down}
          dropdownIconSize={22}
          primaryColor={COLORS.Primary}
          avatarSize={28}
            value={state}
          onChange={value => {
            setState(value);
          }}
          animationIn="zoomIn"
          animationOut="zoomOut"
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{
            backgroundColor: COLORS.white,
            margin: 5,
            borderRadius: SIZES.radius,
          }}
        />
        <FormInput
          prependComponent={
            <>
              <Image
                source={images.line}
                style={{
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  tintColor:COLORS.Primary
                }}
              />
            </>
          }
          label="Line 1*"
          value={line1}
          onChange={value => {
            setLine1(value);
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
        />
        <FormInput
          prependComponent={
            <>
              <Image
                source={images.city}
                style={{
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  tintColor:COLORS.Primary
                }}
              />
            </>
          }
          label="City*"
          value={city}
          onChange={value => {
            setCity(value);
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
        />
        <FormInput
          prependComponent={
            <>
              <Image
                source={images.mail}
                style={{
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  tintColor:COLORS.Primary
                }}
              />
            </>
          }
          label="Postal Code*"
          //   placeholder={user.address}
          value={postalcode}
          onChange={value => {
            setPostalcode(value);
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
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
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          marginVertical: 0,
          width: '88%',
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          alignSelf: 'center',
        }}>
        {renderForm()}
      </KeyboardAwareScrollView>
      <TextButton label={"Save Address"} 
      icon={images.update}
      loading={loading}
      buttonContainerStyle={{
        height: 60,
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        marginBottom: SIZES.padding + 10,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.Primary,
      }}
      />
    </View>
  );
}
