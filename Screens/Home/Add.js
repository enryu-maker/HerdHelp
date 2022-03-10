import { View, Text ,TouchableOpacity,Image,ScrollView} from 'react-native'
import React from 'react'
import Header from '../../Components/Header';
import Card from '../../Components/Card';
import ActivityIndicatorExample from '../../Components/Loading';
import {
  COLORS,
  FONTS,
  images,
  SIZES,
} from '../../Components/Constants';
export default function Add({navigation,route}) {
  const [label,setLabel]=React.useState("")
  const [loading,setLoading]=React.useState(false)
  const [cond,setCond]=React.useState(false)

  const [data,setData]=React.useState([])

  React.useEffect(()=>{
    
    let {label} = route.params
    let {data} =route.params
    let {cond} =route.params
    setCond(cond)
    if (!loading){
      setLabel(label)
      setData(data)
    }
    

  },[])
  function renderHeader() {
    return (
      <Header
        leftComponent={
          <View
            style={{
              justifyContent: 'center',
              position: 'absolute',
              marginTop: 25,
              zIndex: 1,
            }}>
            <TouchableOpacity
              style={{
                marginLeft: 25,
              }}
              onPressIn={() => {
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{width: 30, height: 30, tintColor: COLORS.darkGray2}}
              />
            </TouchableOpacity>
          </View>
        }
        title={label}
      />
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {renderHeader()} 
      
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          {data.map((listItem, index) => (
            <Card
              key={index}
              cond={cond}
              Name={listItem.name}
              Tagnumber={listItem.support_tag}
              Gender={listItem.gender}
              Species={listItem.category}
              Weight={listItem.weight}
              image={listItem.image}
              onPress={() => {
                navigation.navigate('Info', {
                  value: listItem,
                  cond:cond
                });
              }}
            />
          ))}
        </ScrollView>
    </View>
  )
}