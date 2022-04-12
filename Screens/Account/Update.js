import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator
} from 'react-native';
import {COLORS, SIZES, FONTS, images, Bred} from '../../Components/Constants';
import { baseURL } from '../../helpers/helpers';
import {showMessage} from 'react-native-flash-message';
import React from 'react';
import {Access} from '../../App';
export default function Update({showu, setshowu, profile}) {
  const [loading, setLoading] = React.useState(false);
  const access = React.useContext(Access);
  function updateProfile() {
    setLoading(true);
    const formData = new FormData();
    formData.append('profile_picture', profile);
    fetch(baseURL + `updateprofile/${global.id}`, {
      method: 'PATCh',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${access}`,
      },
      body: formData,
    })
      .then(response => {
        if (response.status == 200) {
          setLoading(false);
          showMessage({
            message: 'Profile picture',
            type: 'default',
            backgroundColor: COLORS.Primary,
            color: COLORS.white,
            titleStyle: {
              alignSelf: 'center',
              ...FONTS.h3,
            },
            animationDuration: 250,
            icon: 'success',
            style: {
              justifyContent: 'center',
            },
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        showMessage({
          message: `${err.response.data.msg}`,
          type: 'default',
          backgroundColor: COLORS.red,
          color: COLORS.white,
          titleStyle: {
            alignSelf: 'center',
            ...FONTS.h3,
          },
          animationDuration: 250,
          icon: 'danger',
          style: {
            justifyContent: 'center',
          },
        });
      });
  }
  return (
    <Modal
      transparent={true}
      animationType={'slide'}
      visible={showu}
      onRequestClose={() => {
        setshowu(false);
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000040',
          justifyContent: 'flex-end',
          alignSelf: 'center',
          alignItems: 'center',
        }}
        onStartShouldSetResponder={() => setshowu(false)}>
            <ActivityIndicator animating={loading} size={"large"} color={COLORS.Primary} style={{
                justifyContent:"center",
                alignSelf:"center",
                marginBottom:SIZES.height/2
            }}/>
        <View
          style={{
            height: 110,
            width: '100%',
            backgroundColor: COLORS.white,
            alignSelf: 'center',
            borderTopLeftRadius: SIZES.radius + 10,
            borderTopRightRadius: SIZES.radius + 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setshowu(false);
            }}>
            <Image
              source={images.cancel}
              style={{
                height: 45,
                width: 45,
                justifyContent: 'center',
                alignSelf: 'center',
                tintColor: COLORS.red,
              }}
            />
            <Text
              style={{
                ...FONTS.h4,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
                updateProfile()
                setshowu(false)

                // console.log(profile)
              //   openLibrary();
            }}>
            <Image
              source={images.correct}
              style={{
                height: 45,
                width: 45,
                justifyContent: 'center',
                alignSelf: 'center',
                tintColor: COLORS.Primary,
              }}
            />
            <Text
              style={{
                ...FONTS.h4,
              }}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
