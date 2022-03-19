import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {images, SIZES, FONTS, COLORS} from '../../Components/Constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dropdown} from 'sharingan-rn-modal-dropdown';
import TextButton from '../../Components/TextButton';
export default function ReportFilter({
  show,
  setShow,
  setSpec,
  setVacc,
  setMed,
  vacc,
  med,
}) {
  const [species, setSpecies] = React.useState(null);
  const [animal, setAnimal] = React.useState([]);
  const updateStatus = value => {
    setSpecies(value);
    setSpec(value);
  };
  React.useEffect(() => {
    setAnimal(global.species);
  }, []);
  function renderHeader() {
    return (
      <Header
        rightComponent={
          <View
            style={{
              justifyContent: 'center',
              position: 'absolute',
              marginTop: 25,
              // padding:10,
              zIndex: 1,
            }}>
            <TouchableOpacity
              style={{
                marginLeft: 25,
              }}
              onPressIn={() => {
                setShow(false);
              }}>
              <Image
                source={images.cancel}
                style={{width: 35, height: 35, tintColor: COLORS.red}}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Filter'}
      />
    );
  }
  function filterOption() {
    return (
      <View
        style={{
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        <Dropdown
          label="Cateogry"
          borderRadius={SIZES.radius}
          data={animal}
          dropdownIcon={images.down}
          dropdownIconSize={22}
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
          onChange={updateStatus}
          animationIn="zoomIn"
          animationOut="zoomOut"
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{
            backgroundColor: COLORS.white,
            margin: 5,
          }}
        />

        <TextButton
          label={'Vaccinated'}
          icon={images.correct}
          buttonContainerStyle={{
            marginTop: 15,
            backgroundColor: vacc ? COLORS.Primary : COLORS.gray,
          }}
          onPress={() => {
            setVacc(true);
          }}
        />
        <TextButton
          label={'Not Vaccinated'}
          icon={images.cancel}
          iconStyle={{
            tintColor: COLORS.red,
          }}
          onPress={() => {
            setVacc(false);
          }}
          buttonContainerStyle={{
            marginTop: 10,
            backgroundColor: vacc == false ? COLORS.Primary : COLORS.gray,
          }}
        />
        <TextButton
          label={'Medicated'}
          icon={images.correct}
          iconStyle={{
            tintColor: COLORS.white,
          }}
          onPress={() => {
            setMed(true);
          }}
          buttonContainerStyle={{
            marginTop: 10,
            backgroundColor: med ? COLORS.Primary : COLORS.gray,
          }}
        />
        <TextButton
          label={'Not Medicated'}
          icon={images.cancel}
          iconStyle={{
            tintColor: COLORS.red,
          }}
          onPress={() => {
            setMed(false);
          }}
          buttonContainerStyle={{
            marginTop: 10,
            backgroundColor: med == false ? COLORS.Primary : COLORS.gray,

            // width:150
          }}
        />
      </View>
    );
  }
  return (
    <Modal
      transparent={true}
      animationType={'slide'}
      visible={show}
      onRequestClose={() => {
        setShow(false);
      }}>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#00000010',
          justifyContent: 'flex-end',
          alignSelf: 'center',
        }}
        // onStartShouldSetResponder={() => {
        //   setShow(false);
        // }}
      >
        <View
          style={{
            height: '85%',
            width: '100%',
            backgroundColor: COLORS.white,
            alignSelf: 'center',
            borderTopLeftRadius: SIZES.radius + 20,
            borderTopRightRadius: SIZES.radius + 20,
          }}>
          {renderHeader()}
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              marginTop: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              paddingBottom: 10,
            }}>
            {filterOption()}
          </KeyboardAwareScrollView>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignSelf: 'center',
              justifyContent: 'flex-start',
              position: 'relative',
            }}>
            <TextButton
              onPress={() => {
                setShow(false);
              }}
              icon={images.correct}
              buttonContainerStyle={{
                height: 60,
                width: 150,
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding,
                marginBottom: SIZES.padding + 10,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.Primary,
              }}
              label={'Apply'}
            />
            <TextButton
              onPress={() => {
                setMed('');
                setSpec('');
                setVacc('');
              }}
              icon={images.cancel}
              buttonContainerStyle={{
                height: 60,
                width: 150,
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding,
                marginBottom: SIZES.padding + 10,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.Primary,
              }}
              label={'Clear'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
