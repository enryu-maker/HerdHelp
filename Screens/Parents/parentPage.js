import {View, TouchableOpacity, Image, Text} from 'react-native';
import React from 'react';
import {COLORS, SIZES, FONTS, images,formatter} from '../../Components/Constants';
import Header from '../../Components/Header';

export default function parentPage({navigation}) {
  const [selected, setSelected] = React.useState('Herd');
  const [Herd,setHerd] = React.useState([])
  const [Sold,setSold] = React.useState([])
  function renderheader() {
    return (
      <Header
        leftComponent={
          <View
            style={{
              justifyContent: 'center',
              position: 'absolute',
              marginTop: 20,
              zIndex: 1,
            }}>
            <TouchableOpacity
              style={{
                marginLeft: 25,
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
        title={'Childrens'}
      />
    );
  }
  function renderButtons() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          height: 100,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor:
              selected == 'Herd' ? COLORS.Primary : COLORS.transparentPrimary2,
            height: selected == 'Herd' ? 55 : 75,
            width: selected == 'Herd' ? 120 : 75,
            justifyContent: 'center',
            borderRadius: selected == 'Herd'?12:75/2,
            alignSelf: 'center',
          }}
          onPress={() => {
            setSelected('Herd');
          }}>
          <Text
            style={{
              ...FONTS.h3,
              color: selected == 'Herd' ? COLORS.white : COLORS.black,
              alignSelf: 'center',
            }}>
            Herd
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor:
              selected == 'Sold' ? COLORS.Primary : COLORS.transparentPrimary2,
              height: selected == 'Sold' ? 55 : 75,
              width: selected == 'Sold' ? 120 : 75,
              justifyContent: 'center',
              borderRadius: selected == 'Sold'?12:75/2,
            alignSelf: 'center',
          }}
          onPress={() => {
            setSelected('Sold');
          }}>
          <Text
            style={{
              ...FONTS.h3,
              color: selected == 'Sold' ? COLORS.white : COLORS.black,
              alignSelf: 'center',
            }}>
            Sold
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  function renderFooter(price){
    return(
      <View style={{
        justifyContent:"flex-end",
        height:55,
        borderRadius:SIZES.radius,
        // borderTopRightRadius:SIZES.radius,
        backgroundColor:COLORS.Primary,
        flexDirection:"row",
        justifyContent:"center",
        width:"88%",
        alignSelf:"center",
        marginBottom:30,
      }}>
        <Text style={
          
         Platform.OS=="ios"?{
          ...FONTS.h3,
          color:COLORS.white,
          alignSelf:"center"
        }:{
          ...FONTS.h4,
          color:COLORS.white,
          alignSelf:"center"

        }
      }>{`Total Amount: `}</Text>
      <Text style={
         Platform.OS=="ios"?{
          ...FONTS.h3,
          color:COLORS.white,
          alignSelf:"center"
        }:{
          ...FONTS.h4,
          color:COLORS.white,
          alignSelf:"center"
        }
      }>{formatter.format(price)}
        </Text>
      </View>
    )
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderheader()}
      {renderButtons()}
      {
          selected=="Sold"?renderFooter(1200):null
      }
    </View>
  );
}

{/* <View style={{
      }}>
      <Card 
      key={index} 
      Tagnumber={a.support_tag} 
      Gender={a.gender} 
      image={a.image} 
      Name={a.name} 
      Weight={a.weight} 
      onPress={()=>{
        navigation.navigate('Info',{
          value:a,
          cond:false
        })
      }}/>
      </View> */}