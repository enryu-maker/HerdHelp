import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import FormInput from '../../Components/FormInput';
import TextButton from '../../Components/TextButton';
import {images, COLORS, SIZES, FONTS, Bred} from '../../Components/Constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormDateInput from '../../Components/FormDateInput';
import axiosIns from '../../helpers/helpers';
import {Dropdown} from 'sharingan-rn-modal-dropdown';
import Loader from '../../Components/Loader';
import LoaderOp from '../../Components/LoaderOp';
import CustomAlert from '../../Components/CustomAlert';

export const Medication = ({navigation, route}) => {
  const [tag, setTag] = React.useState('');
  const [treat, setTreat] = React.useState('');
  const [treatt, setTreatt] = React.useState('');
  const [Dis, setDis] = React.useState('');
  const [med, setMed] = React.useState('');
  const [dos, setDos] = React.useState('');
  const [withdraw, setWithdraw] = React.useState(false);
  const [date, setDate] = React.useState('');
  const [datet, setDatet] = React.useState('');
  const [animals, setAnimals] = React.useState([]);
  const [species, setSpcies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState('');
  const [id, setId] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [validation, setValidation] = React.useState(false);
  const [dataText, setDataText] = React.useState('');
  const [dataT,setDataT] = React.useState("");
  const [dataS,setDataS] = React.useState("");

  const [cond,setCond] = React.useState(false);

  const onChangeSpec = value => {
    setSpcies(value);
  };
  const clear = () => {
    setMed("");
    setWithdraw("");
    setDis("");
    setTag("");
    setDos("");
  };
  function addMedical() {
    setLoading(true),
    axiosIns
      .post(
        'medication/',
        {
          tag_number:!cond?`${global.id}${dataS}${dataT}` : `${global.id}${species}${tag}`,
          medication_name: med,
          medication_date: treatt,
          dosage: dos,
          disease: Dis,
          withdrawal: withdraw,
          withdrawal_date: datet!=""? datet:null,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        if (response.status == 201) {
          setLoading(false),
          setValidation(true),
          setShow(true),
          setDataText(`Medication added`),
          setErr(`Medication added`)
          clear()
        } else {
          setLoading(false),
          setValidation(false),
          setShow(true),
          setDataText('Not Found'),
          setErr(`Animal Not Found`)
        }
      })
      .catch(err => {
        setErr('Something went wrong'), 
        setLoading(false);
        setShow(true);
        setDataText('Invalid Input');
        setErr(`Invalid Input`);
      });
  }
  React.useEffect(() => {
    setId(global.id);
    setAnimals(global.species);
    let {cond} = route.params
    setCond(cond)
    if (!cond){
      let {tag} = route.params
      setDataT(tag)
      let{species} = route.params
      setDataS(species)
    }
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
        <Text style={{color:validation? COLORS.Primary : COLORS.red, alignSelf: 'center', ...FONTS.body3}}>
          {err}
        </Text>
        {
          cond?
          <><Dropdown
          label="Species"
          dropdownIcon={images.down}
          dropdownIconSize={22}
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
          disableSelectionTick
          animationIn="zoomIn"
          animationOut="zoomOut"
          primaryColor={COLORS.Primary}
          value={species}
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
          label="Tag Number"
          value={tag}
          onChange={value => {
            setTag(value);
          }}
          keyboardType="numeric"
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        /></>:<View></View>
        }
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
        <FormDateInput
          label="Medication Date"
          placeholder="YYYY-MM-DD"
          value={treat}
          setDate={setTreat}
          formatDate={setTreatt}
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
        <Dropdown
          label="Withdrawal"
          dropdownIcon={images.down}
          dropdownIconSize={22}
          borderRadius={SIZES.radius}
          data={Bred}
          textInputStyle={(FONTS.body2, {letterSpacing: 2})}
          selectedItemTextStyle={(FONTS.body3, {color: COLORS.white})}
          selectedItemViewStyle={{
            backgroundColor: COLORS.Primary,
            margin: 5,
            borderRadius: SIZES.radius,
          }}
          enableAvatar
          animationIn="zoomIn"
          animationOut="zoomOut"
          disableSelectionTick
          primaryColor={COLORS.Primary}
          avatarSize={28}
          value={withdraw}
          onChange={value => {
            setWithdraw(value);
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

        {withdraw ? (
          <FormDateInput
            label="Withdrawal Date"
            placeholder="YYYY-MM-DD"
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
        ) : (
          <View></View>
        )}
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
      {/* <Loader loading={loading}/> */}
      {
        show&&
      <CustomAlert show={show} setShow={setShow} validation={validation} label={dataText}/>
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
          // `${global.id}${dataS}${dataT}`
          // setSupportTag(`${species}${tag}`)
          addMedical();
        }}
        icon={images.med}
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
        label={'Add Medication'}
      />
    </View>
  );
};
