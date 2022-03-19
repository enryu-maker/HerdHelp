import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {images, SIZES, FONTS, COLORS} from '../../Components/Constants';
import {Dropdown} from 'sharingan-rn-modal-dropdown';
import FormInput from '../../Components/FormInput';
import TextButton from '../../Components/TextButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axiosIns from '../../helpers/helpers';
import Card from './ParentDesign';
export default function Parents({navigation}) {
  const [species, setSpecies] = React.useState([]);
  const [tag, setTag] = React.useState('');
  const [id, setId] = React.useState('');
  const [err, setErr] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [animal, setAnimal] = React.useState([]);
  const [babies, setBabies] = React.useState([]);

  React.useEffect(() => {
    setId(global.id);
    setSpecies(global.species);
  }, []);
  const onChangeSpec = value => {
    setAnimal(value);
  };
  async function findChildren() {
    if (tag != '') {
      setLoading(true);
      try {
        let {data} = await axiosIns.get(
          `reports/getchildren/${id}${animal}${tag}`,
        );
        if (data.length > 0 && data != undefined) {
          setBabies(data)
          setTag('');
          setLoading(false);
          return data;
        } else {
          setLoading(false);
          setErr('Parent Not found');
        }
      } catch (e) {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setErr('Please Enter valid Data');
    }
  }
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
                backgroundColor: COLORS.Primary,
                height: 40,
                width: 40,
                justifyContent: 'center',
                borderRadius: SIZES.base,
              }}
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Image
                source={images.menu}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: COLORS.white,
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Parents'}
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
        <Text style={{color: COLORS.red, alignSelf: 'center', ...FONTS.body3}}>
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
      </View>
    );
  }
  function renderAnimal(data) {
    return data.map(a => (
      <Card key={a.id} Tagnumber={a.tag_number} Gender={a.gender} image={a.image} Name={a.name}/>
    ));
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderheader()}
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,

        }}>
        {renderForm()}
      </KeyboardAwareScrollView>
      <View style={{
        backgroundColor:COLORS.Primary,
        marginTop:-60,
        height:40,
        width:160,
        alignSelf:"center",
        justifyContent:"center",
        borderRadius:SIZES.base,
        position:"relative"
      }}>
      <Text style={{color: COLORS.white, alignSelf: 'center', ...FONTS.h2}}>
          List of Babies
        </Text></View>
      {
        babies != undefined ?
      (
      
      <ScrollView>{renderAnimal(babies)}</ScrollView> 
      ):
      (<View></View>)
      }
      <TextButton
        onPress={() => {
          findChildren()
        }}
        icon={images.parents}
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
        label={'Search Babies'}
      />
    </View>
  );
}
