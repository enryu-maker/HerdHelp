import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import FormInput from '../../Components/FormInput';
import { COLORS, FONTS, images, SIZES ,dummydata,CollapseExpand } from "../../Components/Constants"
import FilterModal from './filterModel';
import Card from '../../Components/Card';
import TextButton from '../../Components/TextButton';
import axiosIns from '../../helpers/helpers';
export const Home = ({ navigation }) => {
  const [showFilterModal, setShowFilterModal] = React.useState(false)
  const [Purchased,setPurchased]=React.useState([])
  const [Breed,setBreed]=React.useState([])
  const [animals,setAnimals] = React.useState([])
  const [searched, setSearched] = React.useState("")
  const [loading,setLoading] = React.useState(false)
  const [selectedTab, setSelectedTab] = React.useState("Breed")
  function filterList(list) {
    return list.filter(
      (listItem) =>
        listItem.tag_number
          .toString()
          .toLowerCase()
          .includes(searched.toLowerCase()) ||
        listItem.name.toLowerCase().includes(searched.toLowerCase())||
        listItem.category.toLowerCase().includes(searched.toLowerCase())
    );
  }
  // function allAnimals(){
  //   let animal = Breed.concat(Purchased)
  //   setAnimals(animal)
  // }
  async function fetchBred(){
    setLoading(true)
    let {data} = await axiosIns.get("/birthedanimals/")
    // console.log(data)
    return data
  }
  async function fetchPurchased(){
    let {data} = await axiosIns.get("/purchasedanimals/")
    return data 
  }
  React.useEffect(()=>{
    if (!loading){
      fetchPurchased().then(data=>{setPurchased(data)})
      fetchBred().then(data=>{setBreed(data),setAnimals(data)})
    }
  })
  function renderHeader(){
    return(
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
        titleStyle={{
          marginLeft:60
        }}
        rightComponent={
          <View style={{
            justifyContent: 'center',
          }}>
            <TouchableOpacity
            style={{
              marginRight: 25,
              
            }}
            onPress={()=>navigation.navigate("MyAccount")}
            >
              <Image source={images.login}style={{width:40,height:40,tintColor:COLORS.darkGray2,marginTop:10}} />
            </TouchableOpacity>
            </View>
        }
      />
      
    )
  }
  function Search(){
    return(
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
        placeholder={"Search..."}
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
    )
  }
  function renderTabButtons() {
    return (
        <View
            style={{
                flexDirection: 'row',
                height: 50,
                marginTop: SIZES.radius,
                paddingHorizontal: SIZES.padding,
                marginBottom:20,
                borderBottomEndRadius:SIZES.radius,
                borderBottomStartRadius:SIZES.radius
            }}
        >
            <TextButton
                buttonContainerStyle={{
                    flex: 1,
                    borderRadius: SIZES.radius,
                    backgroundColor: (selectedTab == 'Breed') ? COLORS.Primary : COLORS.transparentPrimary2
                }}
                label="Breed"
                labelStyle={{
                    color: (selectedTab == 'Breed') ? COLORS.white : COLORS.Primary
                }}
                onPress={() => {
                    setSelectedTab("Breed")
                    setBreed(animals)
                }}
            />

            <TextButton
                buttonContainerStyle={{
                    flex: 1,
                    marginLeft: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: (selectedTab == 'Purchased') ? COLORS.Primary : COLORS.transparentPrimary2
                }}
                label="Purchased"
                labelStyle={{
                    color: (selectedTab == 'Purchased') ? COLORS.white : COLORS.Primary
                }}
                onPress={() => {
                    setSelectedTab("Purchased")
                    setBreed(Purchased)
                }}
            />
        </View>
    )
}
  return (
    <View 
    style={{flex:1,backgroundColor: COLORS.white}}>
      {showFilterModal &&
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      }
      {renderHeader()}
      {Search()}
      {renderTabButtons()}
      <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}>
      {filterList(Breed).map((listItem, index) => (
       <Card key={index} 
      Name={listItem.name} 
      Tagnumber={listItem.tag_number} 
      Gender={listItem.gender}
      Species={listItem.category}
      Weight={listItem.weight}
      // image={listItem.image}
      onPress={()=>{navigation.navigate("Info",{
        value:listItem,
      })}}/>
      ))}
      </ScrollView>
    </View>
  );
}
