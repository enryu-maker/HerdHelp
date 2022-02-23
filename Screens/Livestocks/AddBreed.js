import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Header from '../../Components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import axiosIns from '../../helpers/helpers';
import {
  COLORS,
  SIZES,
  catedata,
  FONTS,
  genderdata,
  images,
  Bred,Bought
} from '../../Components/Constants';
import FormInput from '../../Components/FormInput';
import datacat from '../../Components/Constants';
import TextButton from '../../Components/TextButton';
import FormDateInput from '../../Components/FormDateInput';
// import axios from 'axios';
// import ActivityIndicatorExample from '../../Components/Loading';
const Addanimals = ({navigation}) => {
  const [bred, setBred] = useState(false);
  const [valueMS, setValueMS] = useState("");
  const [valueBS, setValueBS] = useState("");
  const [age, setAge] = useState(0);
  const [Breed, setBreed] = useState("");
  const [tag, setTag] = useState("");
  const [price, setPrice] = useState(0);
  const [mother, setMother] = useState("");
  const [father, setFather] = useState("");
  const [weight, setWeight] = useState(0);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [dobt, setDobt] = useState("");
  const [vaccinated,setVaccinated] =useState(false)
  const [vaccinateddate,setVaccinateddate] =useState("")
  const [vaccinateddatet,setVaccinateddatet] =useState("")
  const [bought,setBought] =useState(false)
  const [loading,setLoading] = React.useState(false)
  const [send,setSend] = React.useState(false)
  const [animals,setAnimals] = React.useState([])

  const onChangeMS = (value) => {
    // console.log(value)
    setValueMS(value);
  };
  const onChangeVacc = (value) => {
    setVaccinated(value);
    // console.log(value)

  };
  const onChangeBS = (value) => {
    setValueBS(value);
  };
  const onChangeB = (value) => {
    setBred(value);
  };
  const onChangebought = (value) => {
    setBought(value);
  };
  async function fetchanimal(){
    let { data } = await axiosIns.get("getcategories/")
    setLoading(true)
    return data
  }
  const data = 
  JSON.stringify(
    {
      "name":name ,
      "tag_number": tag,
      "gender": valueBS,
      "species": valueMS,
      "birth_date": dobt,
      "mother_tagnumber": mother,
      "father_tagnumber":father,
      "breed": Breed,
      "weight": weight,
      "bred": bred,
      "age": age,
      "vaccinated": vaccinated,
      "vaccination_date": vaccinateddatet,
      "price": price,
      "bought": bought
  }
  )
    
   function postAnimal(){
    axiosIns.post('animals/',data, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
          console.log(response.status)
            alert("Animal added sucessfully")
        }).catch(err => console.log("api Erorr: ", err.response))
    // return res
  }
  React.useEffect(()=>{
    if (!loading){
      fetchanimal().then(data=>{setAnimals(data)})
    }
    // console.log(animals)
  })
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
        title={'Add Animals'}
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
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
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
          label="Name"
          value={name}
          onChange={value => {
            setName(value);
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />
    <Dropdown
          label="Species"
          borderRadius={SIZES.radius}
          data={animals}
          textInputStyle={FONTS.body2, { letterSpacing: 2 }}
          selectedItemTextStyle={FONTS.body3, { color: COLORS.white ,letterSpacing: 2,alignSelf:"center"}}
          selectedItemViewStyle={{ backgroundColor: COLORS.Primary, margin: 5, borderRadius: SIZES.radius }}
          // enableAvatar
          required
          // showLoader={1000}
          // mode="outlined"
          disableSelectionTick
          primaryColor={COLORS.Primary}
          // avatarSize={28}
          value={valueMS}
          onChange={onChangeMS}
          // animationIn="zoomIn"
          // animationOut="zoomOut"
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: "88%",
            alignSelf:"center",
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{ backgroundColor: COLORS.white, margin: 5 }}
        />
        <Dropdown
          label="Gender"
          borderRadius={SIZES.radius}
          data={genderdata}
          textInputStyle={FONTS.body2, { letterSpacing: 2 }}
          selectedItemTextStyle={FONTS.body3, { color: COLORS.white ,letterSpacing: 2,alignSelf:"center"}}
          selectedItemViewStyle={{ backgroundColor: COLORS.Primary, marginTop: 5, borderRadius: SIZES.radius,height:40 }}
          enableAvatar
          required
          // mode="outlined"
          disableSelectionTick
          primaryColor={COLORS.Primary}
          // avatarSize={28}
          value={valueBS}
          onChange={onChangeBS}
          // animationIn="zoomIn"
          // animationOut="zoomOut"
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: "88%",
            alignSelf:"center",
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{ backgroundColor: COLORS.white, margin: 5, }}
        />
        <FormDateInput
          label="Date of Birth"
          placeholder="YYYY/MM/DD"
          value={dob}
          setDate={setDob}
          formatDate={setDobt}
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
        <FormInput
          prependComponent={
            <View style={{alignSelf: 'center', justifyContent: 'center'}}>
              <Image
                source={images.tag}
                style={{width: 26, height: 26, tintColor: COLORS.Primary}}
              />
            </View>
          }
          label="Mother Tag Number"
          value={mother}
          onChange={value => {
            setMother(value);
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
                source={images.tag}
                style={{width: 26, height: 26, tintColor: COLORS.Primary}}
              />
            </View>
          }
          label="Father Tag Number"
          value={father}
          onChange={value => {
            setFather(value);
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
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                marginLeft: 0,
              }}>
              <Image
                source={images.dog}
                style={{width: 28, height: 28, tintColor: COLORS.Primary}}
              />
            </View>
          }
          label="Breed"
          value={Breed}
          onChange={value => {
            setBreed(value);
          }}
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
        <Dropdown
          label="Bred"
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
          value={bred}
          onChange={onChangeB}
          // animationIn="bounceIn"
          // animationOut="bounceOut"
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
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                marginLeft: 0,
              }}>
              <Image
                source={images.age}
                style={{width: 28, height: 28, tintColor: COLORS.Primary}}
              />
            </View>
          }
          label="Age"
          value={age}
          onChange={value => {
            setAge(value);
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />
         <Dropdown
          label="Vaccinated"
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
          value={vaccinated}
          onChange={onChangeVacc}
          // animationIn="zoomIn"
          // animationOut="zoomOut"
          mode="outlined"
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: "88%",
            alignSelf:"center",
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{ backgroundColor: COLORS.white, margin: 5, borderRadius: SIZES.radius }}
        />
        <FormDateInput
          label="Date of Vaccination"
          placeholder="YYYY/MM/DD"
          value={vaccinateddate}
          setDate={setVaccinateddate}
          formatDate={setVaccinateddatet}
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
        <FormInput
          prependComponent={
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                marginLeft: 0,
              }}>
              <Image
                source={images.money}
                style={{width: 28, height: 28, tintColor: COLORS.Primary}}
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
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />
        <Dropdown
          label="Purchased?"
          borderRadius={SIZES.radius}
          data={Bought}
          textInputStyle={FONTS.body2, { letterSpacing: 2 }}
          selectedItemTextStyle={FONTS.body3, { color: COLORS.white ,letterSpacing: 2,alignSelf:"center"}}
          selectedItemViewStyle={{ backgroundColor: COLORS.Primary, margin: 5, borderRadius: SIZES.radius }}
          enableAvatar
          required
          // showLoader
          // mode="outlined"
          disableSelectionTick
          primaryColor={COLORS.Primary}
          // avatarSize={28}
          value={bought}
          onChange={onChangebought}
          // animationIn="zoomIn"
          // animationOut="zoomOut"
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: "88%",
            alignSelf:"center",
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{ backgroundColor: COLORS.white, margin: 5 }}
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
          // let d =JSON.stringify(dob).slice(0,11)+`"`
          // console.log(data)
          // send==false?<ActivityIndicatorExample/>: 
          postAnimal()
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
        label={'Add Animals'}
        // label2={true}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '88%',
    // flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginRight: 30,
  },
  datePickerStyle: {
    height: 55,
    width: '88%',
    backgroundColor: COLORS.lightGray2,
    alignSelf: 'center',
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    color: COLORS.black,
  },
});
export default Addanimals;
