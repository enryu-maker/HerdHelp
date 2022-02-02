import { View, Text, Image, TouchableOpacity, StyleSheet,ScrollView, KeyboardAvoidingView } from 'react-native';
import React, { useState,useRef } from 'react';
import Header from '../../Components/Header';

import { COLORS, SIZES, catedata, FONTS, genderdata ,images} from '../../Components/Constants';
import FormInput from '../../Components/FormInput';
import {
  Dropdown,
} from 'sharingan-rn-modal-dropdown';
import TextButton from '../../Components/TextButton';
import DatePicker from 'react-native-datepicker';
export const AddBreed = ({ navigation }) => {
  const [valueMS, setValueMS] = useState('');
  const [valueSS, setValueSS] = useState('');
  const [tag, setTag]=useState('')
  const [name, setName]=useState('')
  const [mother, setMother]=useState('')
  const [father, setFather]=useState('')
  const [weight, setWeight]=useState('')
  const [date, setDate] = useState('');
  const [vacc,setVacc]=useState('')
  const [vaccdate, setVaccdate] = useState('');
  const AddBreed = 1;

  

  const onChangeMS = (value) => {
    setValueMS(value);
  };
  const onChangeSS = (value) => {
    setValueSS(value);
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
        title={"Add Birthed Animal"}
      />
    <View style={{flex:1}}>
      <ScrollView
        // style={{flex:1}}
        contentContainerStyle={{paddingBottom:120}}
        showsVerticalScrollIndicator={false}
        
        >
      <KeyboardAvoidingView behavior="position">

      
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
      <DatePicker
          style={styles.datePickerStyle}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="Birth Date"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon
          duration={450}
          customStyles={{
            dateText:{ 
             fontFamily:Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
            //  fontSize:22,
             color:COLORS.black,
             justifyContent:'center',
             alignSelf:"flex-start",
             marginLeft:65
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
        <View style={[styles.container,{marginLeft:40}]}>
        <FormInput
        prependComponent={
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
        <Image source={images.vacc} style={{width:26,height:26,tintColor:COLORS.darkGray2}}/>
          
          </View>
        }
        value={vacc}
        onChange={(value)=>{setVacc(value)}}
        placeholder={"Vaccine"}
        keytype={"next"}
        inputStyle={{ marginLeft: 10 }} 
        containerStyle={{borderRadius: SIZES.padding,
          // margin: 20,
          width: 160}}
          />
        <DatePicker
          style={[styles.datePickerStyle,{width: 160,marginTop:22}]}
          date={vaccdate} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="Vaccine Date"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon
          duration={450}
          customStyles={{
            dateText:{ 
             fontFamily:Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
            //  fontSize:22,
             color:COLORS.black,
             justifyContent:'center',
             alignSelf:'center',
             marginLeft:25
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
            setVaccdate(date);
          }}
        />
        </View>
      <FormInput
        prependComponent={
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
        <Image source={images.mom} style={{width:26,height:26,tintColor:COLORS.darkGray2}}/>

          </View>
        }
        value={mother}
        onChange={(value)=>{setMother(value)}}
        placeholder={"Enter Mother Name"}
        keytype={"next"}
        inputStyle={{ marginLeft: 10 }} />
      <FormInput
        prependComponent={
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
        <Image source={images.mom} style={{width:26,height:26,tintColor:COLORS.darkGray2}}/>

          </View>
        }
        value={father}
        onChange={(value)=>{setFather(value)}}
        placeholder={"Enter Father Name"}
        keytype={"next"}
        inputStyle={{ marginLeft: 10 }} />
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
            <View style={{flexDirection:'row',justifyContent:"space-evenly"}}>
        <FormInput
            value={weight}
            onChange={(value)=>{setWeight(value)}}
            placeholder={"30"}
            // inputStyle={{ marginLeft: 10 }} 
            keytype={"go"}
            containerStyle={{
              width:80,
            }}
            />
          <FormInput
            value={weight}
            onChange={(value)=>{setWeight(value)}}
            placeholder={"60"}
            // inputStyle={{ marginLeft: 10 }} 
            keytype={"go"}
            containerStyle={{
              width:80
            }}
            />
            <FormInput
            value={weight}
            onChange={(value)=>{setWeight(value)}}
            placeholder={"90"}
            // inputStyle={{ marginLeft: 10 }} 
            keytype={"go"}
            containerStyle={{
              width:80
            }}
            />
        </View>
       <TextButton
      onPress={()=>{alert([tag,name,mother,father,valueMS,valueSS,weight])}}
      buttonContainerStyle={{
        height: 55,
        alignItems: 'center',
        // marginTop: SIZES.padding,
        borderRadius: SIZES.radius,
      top:50}}
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
    marginRight: 30
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
export default AddBreed;
