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
        console;
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
        console;
        setPic(imageAssetsArray);
        setPicdata(response.assets[0].base64);
      }
    });
  }
  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={show}
      onRequestClose={() => {
        setshow(false);
      }}>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#00000040',
          justifyContent: 'flex-end',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 120,
            width: '100%',
            backgroundColor: COLORS.white,
            alignSelf: 'center',
            borderRadius: SIZES.radius,
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
                height: 50,
                width: 50,
                justifyContent: 'center',
                alignSelf: 'center',
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
                height: 50,
                width: 50,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
