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
import {Dropdown} from 'sharingan-rn-modal-dropdown';
import axiosIns from '../../helpers/helpers';
import {
  COLORS,
  SIZES,
  catedata,
  FONTS,
  genderdata,
  images,
  Bred,
  Bought,
} from '../../Components/Constants';
import FormInput from '../../Components/FormInput';
import TextButton from '../../Components/TextButton';
import FormDateInput from '../../Components/FormDateInput';
import Loader from '../../Components/Loader';
import LoaderOp from '../../Components/LoaderOp';
import CustomAlert from '../../Components/CustomAlert';

const Addanimals = ({navigation, route}) => {
  const [bred, setBred] = useState(false);
  const [valueMS, setValueMS] = useState('');
  const [valueBS, setValueBS] = useState('');
  const [age, setAge] = useState(0);
  const [Breed, setBreed] = useState('');
  const [tag, setTag] = useState('');
  const [price, setPrice] = useState(0);
  const [mother, setMother] = useState('');
  const [father, setFather] = useState('');
  const [weight, setWeight] = useState(0);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [dobt, setDobt] = useState(null);
  const [vaccinated, setVaccinated] = useState(false);
  const [vaccinateddate, setVaccinateddate] = useState('');
  const [vaccinateddatet, setVaccinateddatet] = useState(null);
  const [bought, setBought] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [animals, setAnimals] = React.useState([]);
  const [id, setId] = React.useState('');
  const [registration, setRegistration] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [validation, setValidation] = React.useState(false);
  const [dataText, setDataText] = React.useState('');
  const [EmailError, setEmailError] = React.useState('');

  const onChangeMS = value => {
    setValueMS(value);
  };
  const onChangeVacc = value => {
    setVaccinated(value);
  };
  const onChangeBS = value => {
    setValueBS(value);
  };
  const onChangeB = value => {
    setBred(value);
  };
  const onChangebought = value => {
    setBought(value);
  };
  function isEnableSignIn() {
    return tag != '' && name != '' && valueMS!='' && valueBS!=''&& bought!='';
  }
  const clear = () => {
    // setSpcies([])
    setWeight('');
    setTag('');
    setRegistration('');
    setAge('');
    setBreed('');
    setMother('');
    setFather('');
    setPrice('');
    setName('');
  };
  const data = JSON.stringify({
    name: name,
    tag_number: ` ${id}${valueMS}${tag}`,
    registration: '',
    support_tag: tag,
    gender: valueBS,
    species: valueMS,
    birth_date: dobt,
    mother_supporttag:mother!=""?mother:"",
    mother_tagnumber:mother!=""?`${id}${valueMS}${mother}`:"" ,
    father_supporttag:father!=""?father:"",
    father_tagnumber:father!=""? `${id}${valueMS}${father}`:"" ,
    breed: Breed,
    weight: weight,
    bred: bred,
    age: age,
    vaccinated: vaccinated,
    vaccination_date: vaccinateddatet,
    price: price,
    bought: bought,
    status: 'Alive',
  });
  async function postAnimal() {
    setLoading(true);
    if(isEnableSignIn())
    {await axiosIns
      .post('animals/', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.status == 201) {
          clear();
          setLoading(false);
          setValidation(true);
          setShow(true);
          setDataText('Animal added');
        }
      })
      .catch(
        err => {console.log('api Erorr: ', err)
        setLoading(false)
        setValidation(false)
        setShow(false)}
      );}
    else{
      setEmailError("Required Fields cannot be empty")
      setLoading(false)
    }
  }
  React.useEffect(() => {
    setId(global.id);
    setAnimals(global.species);
  }, []);
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
          <Text
          style={{
            ...FONTS.body3,
            alignSelf: 'center',
            color:COLORS.red,
            padding:5
          }}>
          {EmailError}
        </Text>
        <FormInput
          prependComponent={
            <View style={{alignSelf: 'center', justifyContent: 'center'}}>
              <Image
                source={images.tag}
                style={{width: 26, height: 26, tintColor: COLORS.Primary}}
              />
            </View>
          }
          label="Tag Number*"
          // keyboardType="numeric"
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
                source={images.name}
                style={{width: 26, height: 26, tintColor: COLORS.Primary}}
              />
            </View>
          }
          label="Name*"
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
          // enableAvatar
          required
          // showLoader={1000}
          // mode="outlined"
          disableSelectionTick
          primaryColor={COLORS.Primary}
          // avatarSize={28}
          value={valueMS}
          onChange={onChangeMS}
          animationIn="zoomIn"
          animationOut="zoomOut"
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{backgroundColor: COLORS.white, margin: 5}}
        />
        <Dropdown
          label="Gender"
          dropdownIcon={images.down}
          dropdownIconSize={22}
          borderRadius={SIZES.radius}
          data={genderdata}
          textInputStyle={(FONTS.body2, {letterSpacing: 2})}
          selectedItemTextStyle={
            (FONTS.body3,
            {color: COLORS.white, letterSpacing: 2, alignSelf: 'center'})
          }
          selectedItemViewStyle={{
            backgroundColor: COLORS.Primary,
            marginTop: 5,
            borderRadius: SIZES.radius,
            height: 40,
          }}
          enableAvatar
          required
          // mode="outlined"
          disableSelectionTick
          primaryColor={COLORS.Primary}
          // avatarSize={28}
          value={valueBS}
          onChange={onChangeBS}
          animationIn="zoomIn"
          animationOut="zoomOut"
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{backgroundColor: COLORS.white, margin: 5}}
        />
        <Dropdown
          label="Purchased?"
          dropdownIcon={images.down}
          dropdownIconSize={22}
          borderRadius={SIZES.radius}
          data={Bought}
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
          enableAvatar
          required
          // showLoader
          // mode="outlined"
          disableSelectionTick
          primaryColor={COLORS.Primary}
          // avatarSize={28}
          value={bought}
          onChange={onChangebought}
          animationIn="zoomIn"
          animationOut="zoomOut"
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{backgroundColor: COLORS.white, margin: 5}}
        />
        {bought != true ? (
          <View>
            <FormDateInput
              label="Date of Birth"
              placeholder="YYYY-MM-DD"
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
          keyboardType="numeric"
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
              keyboardType="numeric"
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
              keyboardType="numeric"
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
            <Dropdown
          label="Vaccinated"
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
          // required
          disableSelectionTick
          animationIn="zoomIn"
          animationOut="zoomOut"
          primaryColor={COLORS.Primary}
          avatarSize={28}
          value={vaccinated}
          onChange={onChangeVacc}
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
        {vaccinated ? (
          <FormDateInput
            label="Date of Vaccination"
            placeholder="YYYY-MM-DD"
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
        ) : (
          <View></View>
        )}
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
                source={images.name}
                style={{width: 28, height: 28, tintColor: COLORS.Primary}}
              />
            </View>
          }
          label="Registration"
          value={registration}
          onChange={value => {
            setRegistration(value);
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

        ) : (
          <View>
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
          keyboardType="numeric"
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
          keyboardType="numeric"
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
        {valueBS != 'Male' ? (
          <Dropdown
            label="Bred"
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
            // required
            disableSelectionTick
            primaryColor={COLORS.Primary}
            avatarSize={28}
            value={bred}
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
        ) : (
          <View></View>
        )}
        <Dropdown
          label="Vaccinated"
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
          // required
          disableSelectionTick
          animationIn="zoomIn"
          animationOut="zoomOut"
          primaryColor={COLORS.Primary}
          avatarSize={28}
          value={vaccinated}
          onChange={onChangeVacc}
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
        {vaccinated ? (
          <FormDateInput
            label="Date of Vaccination"
            placeholder="YYYY-MM-DD"
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
        ) : (
          <View></View>
        )}
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
                source={images.name}
                style={{width: 28, height: 28, tintColor: COLORS.Primary}}
              />
            </View>
          }
          label="Registration"
          value={registration}
          onChange={value => {
            setRegistration(value);
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
      {show && (
        <CustomAlert
          show={show}
          validation={validation}
          setShow={setShow}
          label={dataText}
        />
      )}

      {renderHeader()}

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: 40,
        }}>
        {renderForm()}
      </KeyboardAwareScrollView>

      <TextButton
        onPress={() => {
          postAnimal();
        }}
        icon={images.add}
        buttonContainerStyle={{
          height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding + 10,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label={'Add Animals'}
        loading={loading}
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
