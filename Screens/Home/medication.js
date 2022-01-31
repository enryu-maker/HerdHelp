import { View, Text, TouchableOpacity,Image,StyleSheet } from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import FormInput from '../../Components/FormInput';
import TextButton from '../../Components/TextButton';
import { images,COLORS,SIZES,FONTS } from '../../Components/Constants';
import DatePicker from 'react-native-datepicker';

export default function medication({ navigation }) {
  const [tag, setTag]=React.useState('')
  const [treat, setTreat]=React.useState('')
  const [Dis, setDis]=React.useState('')
  const [med, setMed]=React.useState('')
  const [dos, setDos]=React.useState('')
  const [withdraw, setWithdraw]=React.useState('')
  const [date, setDate] = React.useState('');

  return (
    <View >
      <Header
        leftComponent={
          <View style={{
            justifyContent: 'center',
            position:'absolute',
            marginTop:25,
            zIndex: 1,

          }}>
            <TouchableOpacity
              style={{
                // marginTop: 20,
                marginLeft: 25,
              }}
              onPress={() => { navigation.openDrawer() }}>
               <Image source={images.back} style={{width:28,height:28,tintColor:COLORS.darkGray2}}/>

            </TouchableOpacity>

          </View>
        }
        title={"Add Medication"}
      />
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
          <Image source={images.disease} style={{width:28,height:28,tintColor:COLORS.darkGray2}}/>
            
          </View>
        }
        value={Dis}
        // keyboardType="numeric"
        onChange={(value)=>{setDis(value)}}
        placeholder={"Disease"}
        inputStyle={{ marginLeft: 10 }}
        keytype={"next"}
      />
      <FormInput
        prependComponent={
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
          <Image source={images.medicines} style={{width:28,height:28,tintColor:COLORS.darkGray2}}/>
            
          </View>
        }
        value={med}
        // keyboardType="numeric"
        onChange={(value)=>{setMed(value)}}
        placeholder={"Medicine"}
        inputStyle={{ marginLeft: 10 }}
        keytype={"next"}
      />
      <FormInput
        prependComponent={
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
          <Image source={images.dropper} style={{width:28,height:28,tintColor:COLORS.darkGray2}}/>
            
          </View>
        }
        value={dos}
        // keyboardType="numeric"
        onChange={(value)=>{setDos(value)}}
        placeholder={"Dosage"}
        inputStyle={{ marginLeft: 10 }}
        keytype={"next"}
      />
      <FormInput
        prependComponent={
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
          <Image source={images.withdraw} style={{width:28,height:28,tintColor:COLORS.darkGray2}}/>
            
          </View>
        }
        value={withdraw}
        // keyboardType="numeric"
        onChange={(value)=>{setWithdraw(value)}}
        placeholder={"Withdraw"}
        inputStyle={{ marginLeft: 10 }}
        keytype={"next"}
      />
      <DatePicker
          style={styles.datePickerStyle}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="Next Dose"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon
          duration={450}
          customStyles={{
            dateText:{ 
             fontFamily:Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
            //  fontSize:16,
             color:COLORS.black,
             marginLeft:65,
            //  justifyContent:'center',
             alignSelf:"flex-start",
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
        <TextButton
      onPress={()=>{alert([tag,med,dos,withdraw,date,Dis])}}
      buttonContainerStyle={{
        height: 55,
        alignItems: 'center',
        // marginTop: SIZES.padding,
        borderRadius: SIZES.radius,
      top:50}}
      label={"Add Medication"}/>
      
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
    color:COLORS.black,
    marginTop:20
    
  },
});
