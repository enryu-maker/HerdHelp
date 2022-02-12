import { View, Text, Image, TouchableOpacity, StyleSheet,ScrollView, KeyboardAvoidingView,Platform } from 'react-native';
import React, { useState,useRef } from 'react';
import Header from '../../Components/Header';

import { COLORS, SIZES, catedata, FONTS, genderdata ,images,Breed} from '../../Components/Constants';
import FormInput from '../../Components/FormInput';
import {
  Dropdown,
} from 'sharingan-rn-modal-dropdown';
import TextButton from '../../Components/TextButton';
import DatePicker from 'react-native-datepicker';
export const AddPurchased = ({ navigation }) => {
  const [valueMS, setValueMS] = useState('');
  const [valueSS, setValueSS] = useState('');
  const [breed, setBreed] = useState("");
  const [tag, setTag]=useState('')
  const [name, setName]=useState('')
  const [weight, setWeight]=useState('')
  const [date, setDate] = useState('');
  const [vacc,setVacc]=useState('')
  const [age,setAge]=useState('')
  const AddPurchased = 2;


  const onChangeMS = (value) => {
    setValueMS(value);
  };
  const onChangeSS = (value) => {
    setValueSS(value);
  };
  const onChangeB = (value) => {
    setBreed(value);
  };

  return (
    <View style={{
      flex: 1,
    }}>
      <Header
        leftComponent={
          <View style={{
            justifyContent: 'center',
            position: 'absolute',
            marginTop: 25,
            zIndex: 1,
          }}>
            <TouchableOpacity
              style={{
                // marginTop: 20,
                marginLeft: 25,
              }}
              onPress={() => { navigation.goBack() }}>
               <Image source={images.back} style={{width:28,height:28,tintColor:COLORS.darkGray2}}/>

            </TouchableOpacity>

          </View>
        }
        title={"Add Purchased Animal"}
      />
    <View style={{flex:1}}
    >
      <ScrollView
        contentContainerStyle={{paddingBottom:120}}
        >
     
      <KeyboardAvoidingView behavior="height"
      // keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
    >
       

      
      <FormInput
        prependComponent={
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
          <Image source={images.tag} style={{width:26,height:26,tintColor:COLORS.darkGray2}}/>
            
          </View>
        }
        value={tag}
        // keyboardType="numeric"
        onChange={(value)=>{setTag(value)}}
        placeholder={"Tag Number"}
        inputStyle={{ marginLeft: 10 }}
        keytype={"next"}
      />
      <FormInput
        prependComponent={
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
        <Image source={images.name} style={{width:26,height:26,tintColor:COLORS.darkGray2}}/>

          </View>
        }
        value={name}
        onChange={(value)=>{setName(value)}}
        placeholder={"Enter Name"}
        inputStyle={{ marginLeft: 10 }}
        keytype={"next"}
      />
      <FormInput
            prependComponent={
              <View style={{ alignSelf: 'center', justifyContent: 'center',marginLeft:0 }}>
        <Image source={images.scale} style={{width:28,height:28,tintColor:COLORS.darkGray2}}/>

              </View>
            }
            value={weight}
            onChange={(value)=>{setWeight(value)}}
            placeholder={"Weight"}
            inputStyle={{ marginLeft: 10 }} 
            keytype={"go"}
            />
            <FormInput
            prependComponent={
              <View style={{ alignSelf: 'center', justifyContent: 'center',marginLeft:0 }}>
        <Image source={images.age} style={{width:28,height:28,tintColor:COLORS.darkGray2}}/>

              </View>
            }
            value={age}
            onChange={(value)=>{setAge(value)}}
            placeholder={"Age"}
            inputStyle={{ marginLeft: 10 }} 
            keytype={"go"}
            />
      <View style={styles.container}>
        <Dropdown
          label="Category"
          borderRadius={SIZES.radius}
          data={catedata}
          textInputStyle={FONTS.body2, { letterSpacing: 2 }}
          selectedItemTextStyle={FONTS.body3, { color: COLORS.white }}
          selectedItemViewStyle={{ backgroundColor: COLORS.Primary, margin: 5, borderRadius: SIZES.radius }}
          enableAvatar
          required
          disableSelectionTick
          primaryColor={COLORS.Primary}
          avatarSize={28}
          value={valueMS}
          onChange={onChangeMS}
          animationIn="bounceIn"
          animationOut="bounceOut"
          // paperTheme={"dark"}
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            margin: 20,
            width: 160,
          }}
          itemContainerStyle={{ backgroundColor: COLORS.lightGray2, margin: 5, borderRadius: SIZES.radius }}
        />
        <Dropdown
          label="Gender"
          avatarSize={30}
          required
          disableSelectionTick
          borderRadius={SIZES.radius}
          data={genderdata}
          textInputStyle={FONTS.h4, { color: COLORS.Primary }}
          selectedItemTextStyle={FONTS.body2, { color: COLORS.white }}
          selectedItemViewStyle={{ backgroundColor: COLORS.Primary, margin: 5, borderRadius: SIZES.radius }}
          enableAvatar
          primaryColor={COLORS.Primary}
          value={valueSS}
          animationIn="bounceIn"
          animationOut="bounceOut"
          onChange={onChangeSS}
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            margin: 20,
            width: 160
          }}
          itemContainerStyle={{ backgroundColor: COLORS.lightGray2, margin: 5, borderRadius: SIZES.radius }}
        />
      </View>
      <View style={[styles.container,{marginLeft:0}]}>
        <Dropdown
          label="Breed"
          borderRadius={SIZES.radius}
          data={Breed}
          textInputStyle={FONTS.body2, { letterSpacing: 2 }}
          selectedItemTextStyle={FONTS.body3, { color: COLORS.white }}
          selectedItemViewStyle={{ backgroundColor: COLORS.Primary, margin: 5, borderRadius: SIZES.radius }}
          enableAvatar
          required
          disableSelectionTick
          primaryColor={COLORS.Primary}
          avatarSize={28}
          value={breed}
          onChange={onChangeB}
          animationIn="bounceIn"
          animationOut="bounceOut"
          // paperTheme={"dark"}
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            margin: 20,
            width: 160,
          }}
          itemContainerStyle={{ backgroundColor: COLORS.lightGray2, margin: 5, borderRadius: SIZES.radius }}
        />
        {
          breed == 1? (
            <FormInput
        prependComponent={
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
        <Image source={images.dog} style={{width:26,height:26,tintColor:COLORS.darkGray2}}/>
          
          </View>
        }
        value={vacc}
        onChange={(value)=>{setVacc(value)}}
        placeholder={"Breed"}
        keytype={"next"}
        inputStyle={{ marginLeft: 10 }} 
        containerStyle={{borderRadius: SIZES.padding,
          // height:70,
          width: 160,}}
          />
          ):(<View></View>)
        }
      </View>
         <View style={[styles.container,{marginLeft:10}]}>
        <FormInput
        prependComponent={
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
        <Image source={images.vacc} style={{width:26,height:26,tintColor:COLORS.darkGray2}}/>
          
          </View>
        }
        value={vacc}
        onChange={(value)=>{setVacc(value)}}
        placeholder={"Medicine"}
        keytype={"next"}
        inputStyle={{ marginLeft: 10 }} 
        containerStyle={{borderRadius: SIZES.padding,
          // margin: 20,
          width: 180}}
          />
        <DatePicker
          style={[styles.datePickerStyle,{width: 180,marginTop:22}]}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="Medication Date"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon
          useNativeDriver
          duration={450}
          customStyles={{
            dateText:{ 
             fontFamily:Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
            //  fontSize:22,
             color:COLORS.black,
             justifyContent:'center',
             alignSelf:'center',
             marginLeft:20
          },
            dateInput: {
              height:60,
              borderWidth:0,
              alignSelf:'center',
            },
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 20
            },
            placeholderText:{
              fontFamily:Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
            //  fontSize:22,
             color:COLORS.black,
              // justifyContent:"flex-start",
              alignSelf:"flex-start",
             marginLeft:60
            }
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
        </View>
        <FormInput
            prependComponent={
              <View style={{ alignSelf: 'center', justifyContent: 'center',marginLeft:0 }}>
        <Image source={images.money} style={{width:28,height:28,tintColor:COLORS.darkGray2}}/>

              </View>
            }
            value={weight}
            onChange={(value)=>{setWeight(value)}}
            placeholder={"Price"}
            inputStyle={{ marginLeft: 10 }} 
            keytype={"go"}
            />
        
       <TextButton
      onPress={()=>{alert([tag,name,mother,father,valueMS,valueSS,weight,breed])}}
      buttonContainerStyle={{
        height: 55,
        alignItems: 'center',
        borderRadius: SIZES.radius,
      top:25
    }
    }
      label={"Submit"}/>
      
      </KeyboardAvoidingView>
      </ScrollView>
      
    
    
    </View>
    
        
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '88%',
    // flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginRight: 28,
    justifyContent:"space-evenly"
  },
  datePickerStyle: {
    height:55,
    width: "88%",
    backgroundColor:COLORS.lightGray2,
    alignSelf:'center',
    borderRadius:SIZES.radius,
    justifyContent:'center',
    color:COLORS.black
    
  },
});
export default AddPurchased;
