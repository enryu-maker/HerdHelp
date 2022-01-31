import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import { images, COLORS, SIZES, FONTS } from "../../Components/Constants"
import SquareCard from "../../Components/SquareCard"
 const Add = ({ navigation }) => {
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
        title={"Add Livestock"}
      />
      <ScrollView style={{
        // flexDirection:'column',
      }}>
      <SquareCard
      Img={images.bread}
      type={"Birthed"}
      onPress={()=>{navigation.navigate("Breed")}}
      />
      <SquareCard
      Img={images.purchased}
      type={"Purchased"}
      onPress={()=>{navigation.navigate("Buy")}}
      />
      </ScrollView>
    </View>
  );
}
export default Add;

