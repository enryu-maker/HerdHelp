import {View, Text, Modal, Image, TouchableOpacity} from 'react-native';
import {COLORS, SIZES, FONTS, images, Bred} from '../../Components/Constants';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import React from 'react';

export default function PickerType({
    show, 
    setshow,
    setPic,
    setPicdata
}) {
  function openLibrary() {
    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.assets) {
        imageAssetsArray = response.assets[0].uri;
        setPic(imageAssetsArray);
        setPicdata(response.assets[0].base64);
      }
    });
  }
  function openCamera() {
    let options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
    
          },
      includeBase64: true,
    };
    launchCamera(options, response => {
      if (response.assets) {
        imageAssetsArray = response.assets[0].uri;
        setPic(imageAssetsArray);
        setPicdata(response.assets[0].base64);
      }
    });
  }
  return (
    <Modal
      transparent={true}
      animationType={"slide"}
      visible={show}
      onRequestClose={() => {
        setshow(false);
      }}>
      <View
        style={{
          flex:1,
          backgroundColor: '#00000040',
          justifyContent: 'flex-end',
          alignSelf: 'center',
          alignItems: 'center',
        }}
        onStartShouldSetResponder={
            () => setshow(false)
          }
        >
        <View
          style={{
            height: 100,
            width: '100%',
            backgroundColor: COLORS.white,
            alignSelf: 'center',
            borderTopLeftRadius: SIZES.radius,
            borderTopRightRadius: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setshow(false);
              openCamera()
            }}>
            <Image
              source={images.cam}
              style={{
                height: 45,
                width: 45,
                justifyContent: 'center',
                alignSelf: 'center',
                tintColor:COLORS.Primary
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => {
            setshow(false);
            openLibrary()
          }}>
            <Image
              source={images.picture}
              style={{
                height: 45,
                width: 45,
                justifyContent: 'center',
                alignSelf: 'center',
                tintColor:COLORS.Primary
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
