import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {COLORS, images, SIZES, FONTS} from '../../Components/Constants';
import TextButton from '../../Components/TextButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dropdown} from 'sharingan-rn-modal-dropdown';
import FormInput from '../../Components/FormInput';
import axiosIns from '../../helpers/helpers';
export default function WeightH({navigation}) {
  const [id, setId] = React.useState('');
  const [species, setSpcies] = React.useState([]);
  const [animals, setAnimals] = React.useState([]);
  const [tag, setTag] = React.useState('');
  const [err, setErr] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const updateWeight = async () => {
    if (tag != '') {
      setLoading(true);
      try {
        let {data} = await axiosIns.get(
          `getweighthistory/${id}${species}${tag}`,
        );
        if (data.length > 0 && data != undefined) {
          setTag("")
          setLoading(false)
          return data;
        } else {
          setLoading(false)
          setErr('Animal Not found');
        }
      } catch (err) {
        setLoading(false)
        setErr(err);
      }
    } else {
      setLoading(false);
      setErr('Please Enter valid Data');
    }
  };
  React.useEffect(() => {
    setId(global.id);
    setAnimals(global.species);
  }, []);
  const onChangeSpec = value => {
    setSpcies(value);
  };
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
                navigation.openDrawer();
              }}>
              <Image
                source={images.menu}
                style={{width: 30, height: 30, tintColor: COLORS.white,alignSelf:"center"}}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Weight History'}
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
          value={tag}
          keyboardType="numeric"
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
          updateWeight().then(data => {
            if(data!=undefined && data.length>0){
              navigation.navigate('History', {
                data: data,
              });
            }
            
          });
        }}
        icon={images.weight}
        loading={loading}
        buttonContainerStyle={{
          height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding + 10,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label={'Weight History'}
      />
    </View>
  );
}
