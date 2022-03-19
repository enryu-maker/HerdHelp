import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import FormInput from '../../Components/FormInput';
import CustomSwitch from '../../Components/CustomSwitch';
import {images, COLORS, SIZES, FONTS} from '../../Components/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextButton from '../../Components/TextButton';
import axios from 'axios';
import Loader from '../../Components/Loader';
axios.defaults.baseURL =
  'https://api-herdhelp-nerdtech-q984k.ondigitalocean.app/';
const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);
  const [saveMe, setSaveMe] = React.useState(false);
  const [EmailError, setEmailError] = React.useState('');
  const [access, setAccess] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  function isEnableSignIn() {
    return email != '' && password != '';
  }
  const storeData = async (token, refresh, id) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('refresh', refresh);
      await AsyncStorage.setItem('id', id);
      await AsyncStorage.setItem('route', "true");

    } catch (e) {
      // console.log(e);
    }
  };
  const fetchprofile = async (token) => {
    try {
      const {data} = await axios.get('profile/', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (e) {
      // console.log('Something Went Wrong');
      setLoading(false);
    }
  };
  function login() {
    if (isEnableSignIn()) {
      setLoading(true);
      axios
        .post(
          'login/',
          {
            email: email,
            password: password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          if (response.status === 200) {
            storeData(
              response.data.access,
              response.data.refresh,
              response.data.userid.toString(),
            ).then(() => {
              navigation.replace('Draw'),
              setLoading(false)
            });
            
          } else {
            setEmailError('User Not Registered');
            setLoading(false);
          }
        })
        .catch(error => {
          if (error.response) {
            setEmailError('Something Went Wrong');
            setLoading(false);
          }
        });
    } else {
      setEmailError('Invalid Input');
      setLoading(false);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        // marginTop: '8%',
        backgroundColor: COLORS.white,
        // flex:1
      }}>
      <Loader loading={loading} />
      <Header
        img={images.herdhelp}
        imgstyle={{
          marginTop: 80,
        }}
        containerStyle={
          {
            // margin: '10%',
            // marginTop: 120,
          }
        }
      />
      <ScrollView>
        <Text
          style={{
            ...FONTS.h2,
            alignSelf: 'center',
            marginTop: '15%',
          }}>
          Let's Sign You In
        </Text>
        <Text
          style={{
            ...FONTS.body3,
            alignSelf: 'center',
          }}>
          Login account to continue!
        </Text>
        <View
          style={{
            flex: 1,
            marginTop: SIZES.height > 800 ? SIZES.padding * 2 : SIZES.radius,
          }}>
          <FormInput
            label={'Email'}
            value={email}
            onChange={text => {
              setEmail(text);
            }}
            placeholder={'Enter Email'}
            keyboardType="email-address"
            autoCompleteType="email"
            keytype="next"
            appendComponent={
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Image
                  source={
                    email == '' || email != '' ? images.correct : images.cancel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      email == ''
                        ? COLORS.gray
                        : email != ''
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
              setPassword(value);
            }}
            placeholder={'Enter Password'}
            keytype="go"
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
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.radius,
              width: '88%',
              alignSelf: 'center',
              // marginLeft: '7%',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CustomSwitch
                label="Save Me"
                value={saveMe}
                onChange={value => setSaveMe(value)}
              />
            </View>
            <TextButton
              label="Forgot Password?"
              buttonContainerStyle={{
                backgroundColor: null,
                width: 250,
                // marginRight:120
              }}
              labelStyle={{
                color: COLORS.Primary,
                ...FONTS.h4,
                marginRight: 50,
              }}
              onPress={() => navigation.navigate('ForgotPassword')}
            />
          </View>
          <TextButton
            icon={images.log}
            buttonContainerStyle={{
              height: 55,
              alignItems: 'center',
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: isEnableSignIn()
                ? COLORS.Primary
                : COLORS.transparentPrimary2,
            }}
            onPress={() => {
              login();
            }}
            label={'Login'}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.radius,
              justifyContent: 'center',
            }}>
            <Text style={{color: COLORS.darkGray, ...FONTS.body3}}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              <Text style={{color: COLORS.Primary, ...FONTS.h3}}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Login;
