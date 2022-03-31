import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import FormInput from '../../Components/FormInput';
import {images, COLORS, SIZES, FONTS} from '../../Components/Constants';
import TextButton from '../../Components/TextButton';
import axios from 'axios';
import Loader from '../../Components/Loader';
import LoaderOp from '../../Components/LoaderOp';
import { baseURL } from '../../helpers/helpers';
import utils from '../../utils/Utils';
axios.defaults.baseURL =
  'https://api-herdhelp-nerdtech-q984k.ondigitalocean.app/';
export const Signup = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);
  const [EmailError, setEmailError] = React.useState('');
  const [EmailErr, setEmailErr] = React.useState('');
  const [PassErr, setPassErr] = React.useState('');
  const [UserErr, setUserErr] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [validation, setValidation] = React.useState(false);
  const [dataText, setDataText] = React.useState('');
  const Data = {
    'username': username,
    'password': password,
    'email': email,
  };

  function isEnableSignIn() {
    return email != '' && password != '' && username != '';
  }
  async function signup() {
    if (isEnableSignIn) {
      setLoading(true);
      await axios
        .post(
          baseURL + 'register/',
          {
            username: username,
            password: password,
            email: email,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          if (response.status === 201) {
            setLoading(false);
            setValidation(true);
            setShow(true);
            setDataText('User created');
            setEmailError('User created');
            setInterval(() => {
              setShow(false);
            }, 3000);
            navigation.navigate('Login');
          } else {
            setLoading(false);
            setValidation(false);
            setShow(true);
            setDataText('User Registered');
          }
        })
        .catch(error => {
          if (error.response) {
            setLoading(false);
            setShow(true);
            setValidation(false);
            setDataText('User Registered');
            setEmailError('Invalid Input');
          }
        });
    } else {
      setValidation(false);
      setShow(true);
      setLoading(false);
      setDataText('User Registered');
      setEmailError('Invalid Input');
    }
  }
  return (
    <ScrollView
      style={{
        flex: 1,
        // marginTop:'8%',
        backgroundColor: COLORS.white,
      }}>
      {show && (
        <LoaderOp showing={show} validation={validation} dataText={dataText} />
      )}
      <Loader loading={loading} />
      <Header
        img={images.herdhelp}
        imgstyle={{
          marginTop: 80,
        }}
        containerStyle={{
          margin: '10%',
          //   marginTop:'20%'
        }}
      />
      <Text
        style={{
          ...FONTS.h2,
          alignSelf: 'center',
          marginTop: '8%',
        }}>
        Getting Started
      </Text>
      <Text
        style={{
          ...FONTS.body3,
          alignSelf: 'center',
        }}>
        Create an account to continue!
      </Text>
      <View
        style={{
          flex: 1,
          marginTop: SIZES.height > 800 ? SIZES.padding * 2 : SIZES.radius,
        }}>
        <Text
          style={{
            color: validation ? COLORS.Primary : COLORS.red,
            alignSelf: 'center',
            ...FONTS.body3,
          }}>
          {EmailError}
        </Text>
        {/* Input */}
        <FormInput
          label={'Email'}
          value={email}
          onChange={text => {
            utils.validateEmail(text,setEmailErr)
            setEmail(text);
          }}
          errorMsg={EmailErr}
          placeholder={'Enter Email'}
          keyboardType="email-address"
          autoCompleteType="email"
          // errorMsg={EmailError}
          appendComponent={
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Image
                source={
                  email == ''? images.correct : email != '' && EmailErr == ''? images.correct : images.cancel
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
        <FormInput
          label={'Username'}
          value={username}
          onChange={text => {
            utils.validateUser(text,setUserErr)
            setUsername(text);
          }}
          errorMsg={UserErr}
          placeholder={'Enter Username'}
          keyboardType="default"
          appendComponent={
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Image
                source={
                  username == ''? images.correct : username != '' && UserErr == ''? images.correct : images.cancel

                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    username == ''
                      ? COLORS.gray
                      : username != '' && UserErr == ''
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />
        <FormInput
          label={'Password'}
          value={password}
          secureTextEntry={!showPass}
          autoCompleteType="password"
          onChange={value => {
            utils.validatePassword(value,setPassErr)
            setPassword(value);
          }}
          errorMsg={PassErr}
          placeholder={'Enter Password'}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setShowPass(!showPass)}>
              <Image
                source={showPass ? images.eye_close : images.eye}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: showPass ? COLORS.Primary : COLORS.gray,
                }}
              />
            </TouchableOpacity>
          }
        />
        <TextButton
          border={false}
          icon={images.sign}
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignIn()
              ? COLORS.Primary
              : COLORS.transparentPrimary2,
          }}
          loading={loading}
          onPress={() => {
            navigation.navigate('Sub', {
              userdata: Data,
            });
            // console.log(Data)
            // signup();
          }}
          disabled={!isEnableSignIn()}
          label={'Signup'}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text style={{color: COLORS.darkGray, ...FONTS.body3}}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={{color: COLORS.Primary, ...FONTS.h3}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
