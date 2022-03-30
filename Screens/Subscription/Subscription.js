import { View, Text,TouchableOpacity,Image,ScrollView } from 'react-native'
import React from 'react'
import { images,FONTS,SIZES, COLORS } from '../../Components/Constants';
import Header from '../../Components/Header'
import TextButton from '../../Components/TextButton';
import SubscriptionCard from './SubscriptionCard';
export default function Subscription({navigation}) {
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
                borderRadius: SIZES.base,
              }}
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Image
                source={images.menu}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: COLORS.white,
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Subscription'}
        
      />
    );
  }
  return (
    <View style={{
      flex:1,
      backgroundColor:COLORS.white
    }}>
      {renderheader()}
      <ScrollView 
      showsHorizontalScrollIndicator
      >
      <SubscriptionCard
      label={"Tier 1"}
      price={9.99}
      count={"50"}
      onPress={()=>{
        navigation.navigate("Details",{
          label:"Tier 1"
        })
      }}
      />
      <SubscriptionCard
      label={"Tier 2"}
      price={19.99}
      count={"100"}
      onPress={()=>{
        navigation.navigate("Details",{
          label:"Tier 2"
        })
      }}
      />
      <SubscriptionCard
      label={"Tier 3"}
      price={29.99}
      count={"200"}
      onPress={()=>{
        navigation.navigate("Details",{
          label:"Tier 3"
        })
      }}
      />
      <SubscriptionCard
      label={"Tier 4"}
      price={49.99}
      count={"500"}
      active={true}
      onPress={()=>{
        navigation.navigate("Details",{
          label:"Tier 4"
        })
      }}
      />
      <SubscriptionCard
      label={"Tier 5"}
      price={99.99}
      count={"500+"}
      onPress={()=>{
        navigation.navigate("Details",{
          label:"Tier 5"
        })
      }}
      />
      </ScrollView>
    </View>
  )
}