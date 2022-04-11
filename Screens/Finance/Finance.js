import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import TextButton from '../../Components/TextButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../Components/Header';
import axiosIns from '../../helpers/helpers';
import {
  COLORS,
  SIZES,
  catedata,
  FONTS,
  genderdata,
  images,
  Bred,
} from '../../Components/Constants';
import {Dropdown} from 'sharingan-rn-modal-dropdown';
import FormInput from '../../Components/FormInput';
import { showMessage, hideMessage, } from "react-native-flash-message";
import CustomAlert from '../../Components/CustomAlert';
export const Finance = ({navigation}) => {
  const [cat, setCat] = React.useState(1);
  const [Qty, setQty] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [animals, setAnimals] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [validation, setValidation] = React.useState(false);
  const [dataText, setDataText] = React.useState('');
  async function getfinance() {
    const {data} = await axiosIns.get('getfinancecategories/');
    return data;
  }
  const clean = () => {
    setQty(''), setPrice('');
  };
  const data = JSON.stringify({
    price: price,
    category: cat,
    quantity: Qty,
  });
  async function postfinance() {
    setLoading(true)
    if (price != "" && Qty != "") {
      await axiosIns
        .post('finance/', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(Response => {
          if (Response.status == 201) {
            setLoading(false)
            showMessage({
              message: "Finance added",
              type: "default",
              backgroundColor: COLORS.Primary,
              color:COLORS.white,
              titleStyle:{
                alignSelf:"center",
                ...FONTS.h3
              },
              animationDuration:250
            });
            clean();
          } else {
            setLoading(false)
            showMessage({
              message: "Finance Not added",
              type: "default",
              backgroundColor: COLORS.red,
              color:COLORS.white,
              titleStyle:{
                alignSelf:"center",
                ...FONTS.h3
              },
              animationDuration:250
            });
            // setLoading(false)
          }
        })
        .catch(err => {
          setLoading(false)
          showMessage({
            message: "Error",
            type: "default",
            backgroundColor: COLORS.red,
            color:COLORS.white,
            titleStyle:{
              alignSelf:"center",
              ...FONTS.h3
            },
            animationDuration:250
          })
        })
    } 
    else {
      setLoading(false)
      showMessage({
        message: "Invalid Input",
        type: "default",
        backgroundColor: COLORS.red,
        color:COLORS.white,
        titleStyle:{
          alignSelf:"center",
          ...FONTS.h3
        },
        animationDuration:250
      })
    }
  }
  React.useEffect(() => {
    getfinance().then(data => {
      setAnimals(data);
    });
  }, []);
  const onChangeB = value => {
    setCat(value);
  };
  function renderHeader() {
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
                borderRadius:40/2,

                }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Add Finance'}
      />
    );
  }
  function rederForm() {
    return (
      <View
        style={{
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        <Dropdown
          label="Category"
          borderRadius={SIZES.radius}
          data={animals}
          textInputStyle={[FONTS.body3, {letterSpacing: 2}]}
          selectedItemTextStyle={[FONTS.body3, {color: COLORS.white}]}
          selectedItemViewStyle={{
            backgroundColor: COLORS.Primary,
            margin: 5,
            borderRadius: SIZES.radius,
          }}
          // enableAvatar
          required
          disableSelectionTick
          dropdownIcon={images.down}
          dropdownIconSize={22}
          primaryColor={COLORS.Primary}
          avatarSize={28}
          value={cat}
          onChange={onChangeB}
          animationIn="zoomIn"
          animationOut="zoomOut"
          // mode="outlined"
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
            <View style={{alignSelf: 'center', justifyContent: 'center'}}>
              <Image
                source={images.tag}
                style={{width: 26, height: 26, tintColor: COLORS.Primary}}
              />
            </View>
          }
          label="Quantity*"
          returnKeyType={"next"}
          value={Qty}
          onChange={value => {
            setQty(value);
          }}
          containerStyle={{
            marginTop: SIZES.radius,
            // marginLeft:20
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
                source={images.money}
                style={{width: 26, height: 26, tintColor: COLORS.Primary}}
              />
            </View>
          }
          returnKeyType={"go"}
          keyboardType="numeric"
          label="Price*"
          value={price}
          onChange={value => {
            setPrice(value);
          }}
          containerStyle={{
            marginTop: SIZES.radius,
            // marginLeft:20
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
    <View style={{flex: 1}}>
      {/* <Loader loading={loading}/> */}
      {show && (
        <CustomAlert
          show={show}
          validation={validation}
          label={dataText}
          setShow={setShow}
        />
      )}
      {renderHeader()}
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: 40,
        }}>
        {rederForm()}
      </KeyboardAwareScrollView>
      <TextButton
        onPress={() => {
          postfinance();
        }}
        icon={images.money}
        loading={loading}
        buttonContainerStyle={{
          // flex:1,
          height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding + 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label={'Add Finance'}
      />
    </View>
  );
};
