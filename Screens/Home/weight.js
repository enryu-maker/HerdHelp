import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import FormInput from '../../Components/FormInput';
import TextButton from '../../Components/TextButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axiosIns from '../../helpers/helpers';
import {COLORS, images, SIZES, FONTS} from '../../Components/Constants';
import {Dropdown} from 'sharingan-rn-modal-dropdown';
import CustomAlert from '../../Components/CustomAlert';

export const Weight =({ navigation,route})=> {
  const [tag, setTag] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [weight, setWeight] = React.useState(0);
  const [err, setErr] = React.useState("");
  const [species, setSpcies] = React.useState([]);
  const [supportTag,setSupportTag] = React.useState("")
  const [animals, setAnimals] = React.useState([]);
  const [id, setId] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [validation, setValidation] = React.useState(false);
  const [dataText,setDataText] = React.useState("")
  React.useEffect(() => {
      setId(global.id)
      setAnimals(global.species)
  },[]);
  const onChangeSpec = value => {
    setSpcies(value);
  };
  const clear=()=>{
    setSpcies([])
    setWeight("")
    setTag("")
  }
  async function updateWeight(){
    if (tag!="",weight!=0){
      setLoading(true)
      try{
        await axiosIns.patch(`animals/${id}${species}${tag}`,{
          'weight':weight
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((Response)=>{
          if (Response.status==200){
            setLoading(false)
            setValidation(true);
            setShow(true)
            setDataText("Weight Updated")
            clear()
          }
          else{
          setLoading(false)
          setValidation(false);
          setShow(true)
          setErr(`Animal with tag ${tag} not found here`)
          setDataText("Animal Not Found")
          }
        })
      }catch(err){
        setLoading(false)
        setValidation(false);
        setErr(`Animal with tag ${tag} not found there`)
        setShow(true)
        setDataText("Not Found")
      }
    }
    else{
      setLoading(false)
      setErr("Please Enter valid Data")
      setValidation(true);
      setShow(true)
      setDataText("Not Found")
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
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
              />
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
        <Dropdown
          label="Species"
          borderRadius={SIZES.radius}
          data={animals}
          textInputStyle={(FONTS.body2, {letterSpacing: 2})}
          selectedItemTextStyle={
            (FONTS.body3,
            {color: COLORS.white, letterSpacing: 2, alignSelf: 'center'})
          }
          selectedItemViewStyle={{
            backgroundColor: COLORS.Primary,
            margin: 5,
            borderRadius: SIZES.radius,
          }}
          animationIn="zoomIn"
          animationOut="zoomOut"
          disableSelectionTick
          primaryColor={COLORS.Primary}
          value={species}
          onChange={onChangeSpec}
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
            // marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{backgroundColor: COLORS.white, margin: 5}}
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
          label="Tag Number"
          keyboardType="numeric"
          value={tag}
          onChange={value => {
            setTag(value);
          }}
          containerStyle={{
            marginTop: SIZES.height > 800 ? SIZES.base : 10,

          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
            // marginTop: SIZES.height > 800 ? SIZES.base : 10,

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
          keyboardType="numeric"
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
        {show &&
        // &&
        <CustomAlert show={show} setShow={setShow} validation={validation} label={dataText}/>
        } 
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
        loading={loading}
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
