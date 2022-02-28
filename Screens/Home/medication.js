import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import FormInput from '../../Components/FormInput';
import TextButton from '../../Components/TextButton';
import {images, COLORS, SIZES, FONTS} from '../../Components/Constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormDateInput from '../../Components/FormDateInput';
import axiosIns from '../../helpers/helpers';
import {Dropdown} from 'sharingan-rn-modal-dropdown';
import Loader from '../../Components/Loader';
export const Medication = ({ navigation,route }) =>{
  const [tag, setTag] = React.useState('');
  const [treat, setTreat] = React.useState('');
  const [treatt, setTreatt] = React.useState('');
  const [Dis, setDis] = React.useState('');
  const [med, setMed] = React.useState('');
  const [dos, setDos] = React.useState('');
  const [withdraw, setWithdraw] = React.useState('');
  const [date, setDate] = React.useState('');
  const [datet, setDatet] = React.useState('');
  const [animals, setAnimals] = React.useState([]);
  const [species, setSpcies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [err,setErr] = React.useState("")
  const [id, setId] = React.useState("");

  const onChangeSpec = value => {
    setSpcies(value);
  };

  
  function addMedical(){
    setLoading(true)
    axiosIns.post("medication/",{
        "tag_number": `${id}${species}${tag}`,
        "medication_name": med,
        "medication_date": treatt,
        "dosage": dos,
        "disease": Dis,
        "withdrawal": withdraw,
        "withdrawal_date": datet
    },{
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (response.status == 201) {
        setLoading(false)
        alert('Medication added sucessfully');
      }
      else{
        setLoading(false)
        setErr(`Animal Not Found`)
      }
    })
        .catch(err => {setErr("Something went wrong"),
        setLoading(false)
      });
  }
  React.useEffect(() => {
  
      // let {sep}=route.params
      // let {id}=route.params
      setId(global.id)
      setAnimals(global.species)
    
    // console.log(animals)
  },[]);
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
          disableSelectionTick
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
            // console.log(value)
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
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
        <Loader loading={loading}/>
      {renderheader()}
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
          // alert(`${id}${species}${tag}`)
          // setSupportTag(`${species}${tag}`)
          addMedical();
        }}
        icon={images.med}
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
