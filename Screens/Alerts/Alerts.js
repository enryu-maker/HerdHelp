import {View, TouchableOpacity, Image, Text} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {COLORS, FONTS, images, SIZES} from '../../Components/Constants';
import FormDateInput from '../../Components/FormDateInput';
import FormInput from '../../Components/FormInput';
import TextButton from '../../Components/TextButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormTimeInput from '../../Components/FormTimeInput';
import axiosIns from '../../helpers/helpers';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import CustomAlert from '../../Components/CustomAlert';
export default function Alerts({navigation,route}) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tag, setTag] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [datet, setDatet] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const [timet, setTimet] = React.useState(null);
  const [err, setErr] = React.useState("");
  const [species, setSpcies] = React.useState([]);
  const [animals, setAnimals] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [validation, setValidation] = React.useState(false);
  const [dataText, setDataText] = React.useState('');
  const [id,setId] = React.useState(null)
  const [loading, setLoading] = React.useState(false);
  const onChangeSpec = value => {
    setAnimals(value);
  };
  const clear=()=>{
    setTitle("")
    setContent("")
    setTag("")
  }
    const data =JSON.stringify(
      {
        "title": title,
        "content": content,
        "tag_number":tag?`${id}${animals}${tag}`:"",
        "alert_date": datet,
        "alert_time": timet,
      },
    )
    function postAlert(){
      setLoading(true)
      axiosIns.post('alerts/',data, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(response => {
      if(response.status==201)
      {
      setLoading(false)
        clear();
        setShow(true)
        setValidation(true)
        setDataText("Alerts Added")
      }
      
    }).catch(err => 
      setLoading(false),
      setShow(true),
      setValidation(false),
      setDataText("Not Added")
      )
    }
    React.useEffect(()=>{
        setId(global.id)
        setSpcies(global.species)
    })
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
        title={'Add Alerts'}
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
        <Text style={{color: COLORS.red, ...FONTS.h3, alignSelf: 'center'}}>
          {err}
        </Text>
        <Dropdown
          label="Species"
          borderRadius={SIZES.radius}
          data={species}
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
          disableSelectionTick
          primaryColor={COLORS.Primary}
          value={species}
          animationIn="zoomIn"
          animationOut="zoomOut"
          onChange={onChangeSpec}
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
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
          label="Tag"
          value={tag}
          onChange={value => {
            setTag(value);
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
                source={images.aler}
                style={{width: 26, height: 26, tintColor: COLORS.Primary}}
              />
            </View>
          }
          label="Issue?*"
          value={title}
          onChange={value => {
            setTitle(value);
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
                source={images.mark}
                style={{width: 26, height: 26, tintColor: COLORS.Primary}}
              />
            </View>
          }
          label="What need to be Done?*"
          value={content}
          onChange={value => {
            setContent(value);
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />
        <FormDateInput
          label="Date of Alert*"
          placeholder="YYYY/MM/DD"
          value={date}
          setDate={setDate}
          formatDate={setDatet}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
            width: '88%',
            alignSelf: 'center',
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />
        <FormTimeInput
          label="Time of Alert*"
          placeholder="HH:MM"
          value={time}
          setDate={setTime}
          formatDate={setTimet}
          containerStyle={{
            marginTop: SIZES.radius,
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
    <View style={{flex: 1}}>
      {renderHeader()}
      {
        show&&
      <CustomAlert show={show} validation={validation} label={dataText} setShow={setShow}/>
      }
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
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
          // alert(id)
          postAlert();
        }}
        icon={images.bell}
        loading={loading}
        buttonContainerStyle={{
          // flex:1,
          height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label={'Add Alert'}
      />
    </View>
  );
}
