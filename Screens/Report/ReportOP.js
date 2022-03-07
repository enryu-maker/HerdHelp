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
import axiosIns from '../../helpers/helpers';
export default function ReportOP({navigation,route}) {
  const [label,setLabel]=React.useState("")
  const [loading,setLoading]=React.useState(false)
  const [Data,setData]=React.useState([])
  const [api,setApi] = React.useState("")
async function getData(api){
    let {data} =  await axiosIns.get(api)
    console.log(data)
    return data
 }
//  console.log(api)
  React.useEffect(()=>{
    
    let {label} = route.params
    let {api} =route.params
      setLabel(label)
    getData(api).then(data=>{
        setData(data)
    })
    
  },[])
//   console.log(typrOf api)

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
          {Data.map((listItem, index) => (
            <Card
              key={index}
              Name={listItem.name}
              Tagnumber={listItem.support_tag}
              Gender={listItem.gender}
              Species={listItem.category}
              Weight={listItem.weight}
              image={listItem.image}
              onPress={() => {
                navigation.navigate('Info', {
                  value: listItem,
                });
              }}
            />
          ))}
        </ScrollView>
    </View>
  )
}