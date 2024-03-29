import {View, TouchableOpacity, Image, Text,} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {COLORS, FONTS, images, SIZES} from '../../Components/Constants';
import FormDateInput from '../../Components/FormDateInput';
import FormInput from '../../Components/FormInput';
import TextButton from '../../Components/TextButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axiosIns from '../../helpers/helpers';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import { showMessage, hideMessage, } from "react-native-flash-message";
import { useDispatch, useSelector } from 'react-redux';
import {getAlerts} from '../../Store/actions'
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';

export default function Alerts({navigation,route}) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tag, setTag] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [Edate, setEdate] = React.useState(null);
  const [Edatet, setEdatet] = React.useState(null);
  const [datet, setDatet] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const [timet, setTimet] = React.useState(null);
  const [animals, setAnimals] = React.useState("");
  const [id,setId] = React.useState(null)
  const [loading, setLoading] = React.useState(false);
  const species = useSelector(state => state.Reducers.cat)
  const tagl = useSelector(state => state.Reducers.tags)


  const clear=()=>{
    setTitle("")
    setContent("")
    setTag("")
  }
  function finder(list, value) {
    var dataValue;
    list?.map(a => {
      if (value == a.label) {
        dataValue = a.data;
      }
    });
    return dataValue;
  }
  const actualContent ="content:" + content + "\ntag :" + JSON.stringify(tag?`${id}${animals}${tag}`:"")
  const addCalander=async()=>{
    const eventConfig = {
      title:title,
      startDate:moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      endDate:moment(Edate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      allDay:true,
      notes:actualContent,
    };
    await AddCalendarEvent.presentEventCreatingDialog(eventConfig)
    .then((response) => {
      if(response.action=="SAVED"){
        postAlert()
      }
    })
    .catch((error) => {
      showMessage({
        message:error,
        type: "default",
        backgroundColor: COLORS.red,
        color:COLORS.white,
        titleStyle:{
          alignSelf:"center",
          ...FONTS.h3
        },
        animationDuration:250,
        icon:"danger",
          style:{
            justifyContent:"center"
          }
      });
    });
  }
    const data =JSON.stringify(
      {
        "title": title,
        "content": content,
        "tag_number":tag?`${id}${animals}${tag}`:"",
        "support_tag":tag,
        "alert_date": datet,
        "alert_time": timet,
      },
    )
    const dispatch = useDispatch()
    function postAlert(){
      setLoading(true)
      try
      {axiosIns.post('alerts/',data, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(response => {
      if(response.status==201)
      {
      setLoading(false)
        clear();
        dispatch(getAlerts())
        showMessage({
          message: "Alerts added",
          type: "default",
          backgroundColor: COLORS.Primary,
          color:COLORS.white,
          titleStyle:{
            alignSelf:"center",
            ...FONTS.h3
          },
          animationDuration:250,
          icon:"success",
            style:{
              justifyContent:"center"
            }
          
        });
      }
      
    }).catch(err =>{
      setLoading(false)
      showMessage({
        message:`${err.response.data.msg}`,
        type: "default",
        backgroundColor: COLORS.red,
        color:COLORS.white,
        titleStyle:{
          alignSelf:"center",
          ...FONTS.h3
        },
        animationDuration:250,
        icon:"danger",
            style:{
              justifyContent:"center"
            }
      });
      })}
      catch{
        showMessage({
          message:`Something went wrong`,
          type: "default",
          backgroundColor: COLORS.red,
          color:COLORS.white,
          titleStyle:{
            alignSelf:"center",
            ...FONTS.h3
          },
          animationDuration:250,
          icon:"danger",
            style:{
              justifyContent:"center"
            }
        });
      }
    }
    React.useEffect(()=>{
        setId(global.id)
    },[])
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
                navigation.openDrawer();
              }}>
              <Image
                source={images.menu}
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
          dropdownIcon={images.down}
          dropdownIconSize={22}
          primaryColor={COLORS.Primary}
          value={animals}
          animationIn="bounceInLeft"
          animationOut="bounceOutLeft"
          onChange={(value)=>{
            setAnimals(value)
          }}
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{backgroundColor: COLORS.white, margin: 5}}
        />
        <Dropdown
          label="Tags"
          dropdownIcon={images.down}
          dropdownIconSize={22}
          borderRadius={SIZES.radius}
          data={finder(tagl,animals)}
          textInputStyle={(FONTS.body2, {letterSpacing: 2})}
          selectedItemTextStyle={(FONTS.body3, {color: COLORS.white})}
          selectedItemViewStyle={{
            backgroundColor: COLORS.Primary,
            margin: 5,
            borderRadius: SIZES.radius,
          }}
          animationIn="bounceInLeft"
          animationOut="bounceOutLeft"
          disableSelectionTick
          primaryColor={COLORS.Primary}
          avatarSize={28}
          value={tag}
          onChange={(value) => {
            setTag(value);
          }}
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
                source={images.aler}
                style={{width: 26, height: 26, tintColor: COLORS.Primary}}
              />
            </View>
          }
          label="Issue?*"
          returnKeyType={"next"}
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
          returnKeyType={"next"}
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
          label="Start of Alert*"
          // placeholder="YYYY/MM/DD"
          value={date}
          mode={"datetime"}
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
        <FormDateInput
          label="End of Alert*"
          value={Edate}
          mode={"datetime"}
          setDate={setEdate}
          formatDate={setEdatet}
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
      border={false}
        onPress={() => {
          // alert(id)
          // postAlert();
          addCalander()

        }}
        icon={images.bell}
        loading={loading}
        buttonContainerStyle={{
          // flex:1,
          // height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderTopLeftRadius: SIZES.radius,
          borderTopRightRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label={'Add Alert'}
      />
    </View>
  );
}
