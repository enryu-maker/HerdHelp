import { View, Text ,TouchableOpacity,Image, ScrollView} from 'react-native';
import React from 'react';
import Header from './Header';
import SquareCard from './SquareCard';
import ImageCard from './ImageCard';
import { COLORS, SIZES,images,FONTS } from './Constants';
import Vertical from './Vertical';
export const Info=({ navigation, route })=>{
  const [animal, setAnimal] = React.useState([]);
  React.useEffect(() => {
    setAnimal(route.params.value)
}, [])
  return (
    <ScrollView style={{
        flex:1
        }}>
      
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
                marginLeft: 25,
              }}
              onPress={() => { navigation.goBack() }}>
              <Image source={images.back} style={{width:28,height:28,tintColor:COLORS.darkGray2}}/>

            </TouchableOpacity>

          </View>
      }
      title={"More Info"}
    />
    <View style={{backgroundColor:COLORS.lightGray2,
        height:150,
        margin:SIZES.base2,
        borderRadius:SIZES.radius,
        flexDirection:'row',
        justifyContent:'space-evenly',
        width:'88%',
        alignSelf:'center',paddingVertical:25}}>
          <Image source={animal.image} style={{
              width:100,
              height:100,
              justifyContent:'center'
          }}/>
        </View>
        <View style={{flexDirection:'row',width:"88%",alignSelf:'center',marginTop:10,justifyContent:"space-between",height:320}}>
        <View style={{flexDirection:'column',alignSelf:'center',justifyContent:'space-evenly'}}>
        <SquareCard Img={animal.Gender} type={animal.GenderType} style={{margin:"0%",marginTop:0}}/>
        <Vertical purchased={animal.purchased} birth={animal.bornimg} purchase={animal.cash} style={{margin:"0%",marginTop:20}}/>
        </View>
        <ImageCard Name={animal.Name} Tag={animal.Tag_number} Weight={animal.weight} purchased={animal.purchased} birth={animal.bornimg} purchase={animal.cash} species={animal.Species}/>
        </View>
        <View style={{backgroundColor:COLORS.lightGray2,
        height:200,
        margin:SIZES.base2,
        borderRadius:SIZES.radius,
        flexDirection:'row',
        justifyContent:'space-evenly',
        width:'88%',
        alignSelf:'center',marginTop:20,paddingBottom:20}}>
          <Text style={[FONTS.h2,{padding:8}] }>
          Medication
        </Text>
        </View>
    </ScrollView>
  );
}
