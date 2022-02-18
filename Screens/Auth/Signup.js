import { View, Text, TextInput, ScrollView, TouchableOpacity ,Image} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import FormInput from '../../Components/FormInput';
import {images,COLORS,SIZES, FONTS} from '../../Components/Constants'
import TextButton from '../../Components/TextButton';
import axios from "axios";
axios.defaults.baseURL = 'http://herdhelp.herokuapp.com';


export  const Signup=({navigation})=>{
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [username, setUsername] = React.useState("")
    const [showPass, setShowPass] = React.useState(false)
    function isEnableSignIn() {
        return email != "" && password != "" && username != ""
    }
    function signup  (){
        if (isEnableSignIn) {
            axios.post('/register/',
                {
                    "username": username,
                    "password": password,
                    "email": email,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        // setEmailError(response.data.message)
                        alert("User sucessfully created")
                        //this.props.navigation.replace('Login')
                    }
                    else {
                        setEmailError("else")
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response.data);
                        setEmailError("cathc")
                    }
                })
        }
        else {
            setEmailError("lastelse")
        }
    }
  return (
    <ScrollView style={{
        marginTop:'8%'
    }}>
        {/* Header */}
      <Header
      img={images.logo}
      containerStyle={{
          margin:'10%',
        //   marginTop:'20%'
      }}/>
      <Text style={{
          ...FONTS.h2,
          alignSelf:'center',
          marginTop:'8%'
      }}>
          Getting Started 
      </Text>
      <Text style={{
          ...FONTS.body3,
          alignSelf:'center',
      }}>
          Create an account to continue!
      </Text>
      <View style={{
          flex: 1,
          marginTop: SIZES.height > 800 ? SIZES.padding * 2 : SIZES.radius
      }}>
    {/* Input */}
      <FormInput
      label={'Email'}
    value={email}
    onChange={(text)=>{setEmail(text)}}
    placeholder={'Enter Email'}
    keyboardType="email-address"
    autoCompleteType="email"
    appendComponent={
        <View
            style={{
                justifyContent: 'center'
            }}
        >
            <Image
                source={(email == "") || (email != "" ) ? images.correct : images.cancel}
                style={{
                    height: 20,
                    width: 20,
                    tintColor: (email == "") ? COLORS.gray : (email != "") ? COLORS.green : COLORS.red
                }}
            />
        </View>
    }
    />
    <FormInput
    label={"Username"}
    value={username}
    onChange={(text)=>{setUsername(text)}}
    placeholder={'Enter Username'}
    keyboardType="default"
    appendComponent={
        <View
            style={{
                justifyContent: 'center'
            }}
        >
            <Image
                source={(username == "") || (username != "" ) ? images.correct : images.cancel}
                style={{
                    height: 20,
                    width: 20,
                    tintColor: (username == "") ? COLORS.gray : (username != "") ? COLORS.green : COLORS.red
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
    onChange={(value)=>{setPassword(value)}}
    placeholder={'Enter Password'}
    appendComponent={
        <TouchableOpacity
            style={{
                width: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
            }}
            onPress={() => setShowPass(!showPass)}
        >
            <Image
                source={showPass ? images.eye_close : images.eye}
                style={{
                    height: 20,
                    width: 20,
                    tintColor: showPass? COLORS.Primary : COLORS.gray
                }}
            />
        </TouchableOpacity>
    }
    />
    <TextButton
    buttonContainerStyle={{
        height: 55,
        alignItems: 'center',
        marginTop: SIZES.padding,
        borderRadius: SIZES.radius,
        backgroundColor: isEnableSignIn() ? COLORS.Primary : COLORS.transparentPrimary2,
    }}
    onPress={()=>{signup()}}
      label={'Signup'}/>
      <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        justifyContent: 'center'
                    }}
                >
                    <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>Already have an account? </Text>
                    <TouchableOpacity
                    onPress={()=>{navigation.navigate("Login")}}>
                        <Text style={{color: COLORS.Primary,
                            ...FONTS.h3}}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
      </View>
      
      
    </ScrollView>
  );
}
