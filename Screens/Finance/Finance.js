import { View, Text,TouchableOpacity ,Image} from 'react-native'
import React from 'react'
import TextButton from '../../Components/TextButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../../Components/Header';
import axiosIns from '../../helpers/helpers';
import {
    COLORS,
    SIZES,
    catedata,
    FONTS,
    genderdata,
    images,
    Bred
  } from '../../Components/Constants';
import { Dropdown } from 'sharingan-rn-modal-dropdown'
import FormInput from '../../Components/FormInput';
export const Finance = ({navigation})=>{
    const [cat,setCat] = React.useState("")
    const [Qty,setQty] = React.useState("")
    const [price,setPrice] = React.useState("")
    const [loading,setLoading] = React.useState(false)
    const [animals,setAnimals] = React.useState([])
    async function postfinance(){
      setLoading(true)
      await axiosIns.post("finance/")
      return data
    }
    React.useEffect(()=>{
      if (!loading){
        // fetchanimal().then(data=>{setAnimals(data)})
      }
      // console.log (animals) 

    })
    const onChangeB = (value) => {
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
                  <Image
                    source={images.back}
                    style={{width: 30, height: 30, tintColor: COLORS.darkGray2}}
                  />
                </TouchableOpacity>
              </View>
            }
            title={'Finance'}
          />
        );
      }
      function rederForm(){
          return(
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
            data={Bred}
            textInputStyle={FONTS.body2, { letterSpacing: 2 }}
            selectedItemTextStyle={FONTS.body3, { color: COLORS.white }}
            selectedItemViewStyle={{ backgroundColor: COLORS.Primary, margin: 5, borderRadius: SIZES.radius }}
            enableAvatar
            required
            disableSelectionTick
            primaryColor={COLORS.Primary}
            avatarSize={28}
            value={cat}
            onChange={onChangeB}
            animationIn="zoomIn"
            animationOut="zoomOut"
            mode="outlined"
            mainContainerStyle={{
              borderRadius: SIZES.padding,
              width: "88%",
              alignSelf:"center",
              marginTop: SIZES.height > 800 ? SIZES.base : 10,
            }}
            itemContainerStyle={{ backgroundColor: COLORS.white, margin: 5, borderRadius: SIZES.radius }}
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
          label="Quantity"
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
          label="Price"
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
          )
      }
  return (
    <View style={{flex:1}}>
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
          alert([tag, weight]);
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
        label={"Add Finance"}
        />
    </View>
  )
}