import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import FormInput from '../../Components/FormInput';
import { COLORS, FONTS, images, SIZES ,dummydata,CollapseExpand } from "../../Components/Constants"
import FilterModal from './filterModel';
import Card from '../../Components/Card';
export const Home = ({ navigation }) => {
  const [showFilterModal, setShowFilterModal] = React.useState(false)
  const [searched, setSearched] = React.useState("")
  function filterList(list) {
    return list.filter(
      (listItem) =>
        listItem.Tag_number
          .toString()
          .toLowerCase()
          .includes(searched.toLowerCase()) ||
        listItem.Name.toLowerCase().includes(searched.toLowerCase()),
    );
  }
  return (
    <View 
    style={{flex:1,backgroundColor:COLORS.layout,}}>
      {showFilterModal &&
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      }
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
              onPressIn={() => { navigation.openDrawer() }}>
               <Image source={images.menu} style={{width:35,height:35,tintColor:COLORS.darkGray2}}/>
            </TouchableOpacity>

          </View>
        }
        title={"Home"}
      />
      <FormInput
        prependComponent={
          <Image
            source={images.search}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.darkGray2,
              alignSelf: 'center'
            }}
          />
        }
        placeholder={"Search"}
        value={searched}
        containerStyle={{
          paddingBottom:10
        }}
        onChange={(value) => { setSearched(value) }}
        inputStyle={{
          marginLeft: '10%'

        }}
        appendComponent={
          <TouchableOpacity style={{
            alignSelf: 'center'
          }}
            onPress={() => setShowFilterModal(true)}>
            <Image
              source={images.filter}
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.darkGray2,
                alignSelf: 'center'
              }}
            />
          </TouchableOpacity>

        }
      />
      <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}>
      {filterList(dummydata).map((listItem, index) => (
       <Card key={index} 
      Name={listItem.Name} 
      Tagnumber={listItem.Tag_number} 
      Gender={listItem.Gender}
      Species={listItem.Species}
      Weight={listItem.weight}
      image={listItem.image}
      onPress={()=>{navigation.navigate("Info",{
        value:listItem,
      })}}/>
      ))}
      </ScrollView>
    </View>
  );
}
