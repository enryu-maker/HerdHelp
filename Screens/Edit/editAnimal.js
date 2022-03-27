import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
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
  import CustomAlert from '../../Components/CustomAlert';

  
  const EditAnimal = ({navigation, route}) => {
    React.useEffect(() => {
        setId(global.id);
        setAnimals(global.species);
        setUnit(global.unit)
      }, []);
    const [bred, setBred] = useState(route.params.animal?.bred);
    const [valueMS, setValueMS] = useState(route.params.animal?.species);
    const [valueBS, setValueBS] = useState(route.params.animal?.gender);
    const [age, setAge] = useState(route.params.animal?.age);
    const [Breed, setBreed] = useState(route.params.animal?.breed);
    const [tag, setTag] = useState(route.params.animal?.support_tag);
    const [price, setPrice] = useState(route.params.animal?.price);
    const [mother, setMother] = useState(route.params.animal?.mother_supporttag);
    const [father, setFather] = useState(route.params.animal?.father_supporttag);
    const [weight, setWeight] = useState(global.unit? route.params.animal?.weight : route.params.animal?.weight_kg);
    const [name, setName] = useState(route.params.animal?.name);
    const [dob, setDob] = useState('');
    const [dobt, setDobt] = useState(route.params.animal?.birth_date);
    const [vaccinated, setVaccinated] = useState(route.params.animal?.vaccinated);
    const [vaccinateddate, setVaccinateddate] = useState('');
    const [vaccinateddatet, setVaccinateddatet] = useState(route.params.animal?.vaccination_date);
    const [bought, setBought] = useState(route.params.animal?.bought);
    const [loading, setLoading] = React.useState(false);
    const [animals, setAnimals] = React.useState([]);
    const [id, setId] = React.useState('');
    const [registration, setRegistration] = React.useState(route.params.animal?.registration);
    const [show, setShow] = React.useState(false);
    const [validation, setValidation] = React.useState(false);
    const [dataText, setDataText] = React.useState('');
    const [EmailError, setEmailError] = React.useState('');
    const [unit, setUnit] = React.useState(false);
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
      return tag != '' &&  valueMS!= '' && valueBS != '';
    }
    const clear = () => {
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
      registration: '',
      gender: valueBS,
      species: valueMS,
      birth_date: dobt,
      mother_supporttag:mother!=""?mother:"",
      mother_tagnumber:mother!=""?`${id}${valueMS}${mother}`:"" ,
      father_supporttag:father!=""?father:"",
      father_tagnumber:father!=""? `${id}${valueMS}${father}`:"" ,
      breed: Breed,
      weight: unit==true?weight: Math.round(weight/0.45359237),
      weight_kg:unit==false?weight: Math.round(weight*0.45359237),
      bred: bred,
      age: age,
      vaccinated: vaccinated,
      vaccination_date: vaccinateddatet,
      price: price,
      bought: bought,
    });
    async function postAnimal() {
      setLoading(true);
      if(isEnableSignIn())
      {await axiosIns
        .patch(`animals/${route.params.animal?.tag_number}`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          if (response.status == 200) {
            clear();
            setLoading(false);
            setValidation(true);
            setShow(true);
            setDataText('Animal Updated');
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
          title={'Edit Animal'}
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
          {/* <FormInput
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
          /> */}
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
            required
            disableSelectionTick
            primaryColor={COLORS.Primary}
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
            disableSelectionTick
            primaryColor={COLORS.Primary}
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
            // enableAvatar
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
  export default EditAnimal;
  