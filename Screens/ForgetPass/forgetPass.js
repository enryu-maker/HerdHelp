import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {images, COLORS, SIZES, FONTS} from '../../Components/Constants';
import Header from '../../Components/Header';
import utils from '../../utils/Utils';
import FormInput from '../../Components/FormInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextButton from '../../Components/TextButton';
import axios from 'axios';
import {baseURL} from '../../helpers/helpers';
export default function forgetPass({navigation}) {
  const [email, setEmail] = React.useState('');
  const [token, setToken] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [EmailErr, setEmailErr] = React.useState('');
  const [tokenErr, settokenErr] = React.useState('');

  function isEnableSignIn() {
    return email != '';
  }
  async function getToken() {
    setLoading(true);
    await axios
      .post(
        baseURL + '/reset-password',
        {
          email: email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        if (response.status == 201) {
          setLoading(false);
          setShow(true);
          setEmailErr(`OTP sent to ${email}`);

        } else {
          setLoading(false);
          setEmailErr('Email Not Registered');
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
  async function checkToken() {
    let {data} = await axios.get(
      baseURL + `/reset-password/token-validation?token=${token}`,
    );
    console.log(data);
  }

  function renderHeader() {
    return (
      <Header
        leftComponent={
          <View
            style={{
              justifyContent: 'center',
              marginLeft: -15,
            }}>
            <TouchableOpacity
              style={{
                // marginLeft: 25,
                backgroundColor: COLORS.Primary,
                height: 40,
                width: 40,
                justifyContent: 'center',
                borderRadius: 40 / 2,
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.white,
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
        }
        img={images.herdhelp}
        imgstyle={{
          marginTop: 100,
          marginLeft: -20,
        }}
        containerStyle={{
          margin: '10%',
        }}
      />
    );
  }
  function renderForm() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
        }}>
        <Text
          style={{
            ...FONTS.h2,
            alignSelf: 'center',
            marginTop: '2%',
          }}>
          Forgot Password?
        </Text>
        <Text
          style={{
            ...FONTS.body3,
            alignSelf: 'center',
          }}>
          Enter your Registered Email to continue!
        </Text>
        <View
          style={{
            flex: 1,
            marginTop: SIZES.height > 800 ? SIZES.padding * 1.2 : SIZES.radius,
          }}>
          <FormInput
            label={'Email'}
            value={email}
            onChange={text => {
              utils.validateEmail(text, setEmailErr);
              setEmail(text);
            }}
            returnKeyType={'next'}
            errorMsg={EmailErr}
            placeholder={'Enter Registered Email'}
            keyboardType="email-address"
            autoCompleteType="email"
            appendComponent={
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Image
                  source={
                    email == ''
                      ? images.correct
                      : email != '' && EmailErr == ''
                      ? images.correct
                      : images.cancel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      email == ''
                        ? COLORS.gray
                        : email != '' && EmailErr == ''
                        ? COLORS.green
                        : COLORS.red,
                  }}
                />
              </View>
            }
          />
          {email != '' ? (
            <TouchableOpacity
              style={{
                padding: 10,
              }}
              onPress={() => getToken()}>
              <Text
                style={{
                  ...FONTS.h3,
                  alignSelf: 'center',
                  color: COLORS.Primary,
                }}>
                Generate OTP
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
  function hiddenContent() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: SIZES.height > 800 ? SIZES.padding * 1.2 : SIZES.radius,
        }}>
        <FormInput
          label={'Token'}
          value={token}
          onChange={text => {
            setToken(text);
          }}
          returnKeyType={'next'}
          placeholder={'Enter Token'}
          autoCompleteType="email"
          appendComponent={
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Image
                source={
                  token == ''
                    ? images.correct
                    : token != '' && tokenErr == ''
                    ? images.correct
                    : images.cancel
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    token == ''
                      ? COLORS.gray
                      : token != '' && tokenErr == ''
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />
        {token != '' ? (
          <TouchableOpacity
            style={{
              padding: 10,
            }}
            onPress={() => checkToken()}>
            <Text
              style={{
                ...FONTS.h3,
                alignSelf: 'center',
                color: COLORS.Primary,
              }}>
              Verify Token
            </Text>
          </TouchableOpacity>
        ) : null}
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
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: SIZES.radius,
          // paddingHorizontal: SIZES.padding,
        }}>
        {renderForm()}
        {show ? hiddenContent() : null}
      </KeyboardAwareScrollView>
      <TextButton
        border={false}
        icon={images.update}
        buttonContainerStyle={{
          height: 55,
          alignItems: 'center',
          borderRadius: SIZES.radius,
          marginBottom: 40,
          backgroundColor:
            token != '' ? COLORS.Primary : COLORS.transparentPrimary2,
        }}
        loading={loading}
        onPress={() => {
          getToken();
          // checkToken()
        }}
        // disabled={!isEnableSignIn()}
        label={'GetToken'}
      />
    </View>
  );
}
