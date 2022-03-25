import { View, Text,TouchableOpacity,Image,ScrollView,ActivityIndicator } from 'react-native'
import React from 'react'
import Header from './Header'
import {
    SIZES,
    COLORS,
    images,
    FONTS
} from "../Components/Constants"
import Med from './Med';
import axiosIns from '../helpers/helpers';
export default function MedCard({ navigation,route }) {
  const [med, setMed] = React.useState([]);
  const [err, setErr] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [animal,setAnimal] = React.useState([])
  async function getMedication(tag) {
    setLoading(true)
    let {data} = await axiosIns.get(`getmedication/${tag}`);
    setLoading(false)
    return data;
  }
  React.useEffect(() => {
    let {animal} = route.params
    getMedication(animal.tag_number).then((data)=>{
    setMed(data)
    });
    setAnimal(animal)
  }, []);
    function renderHeader() {
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
                backgroundColor:COLORS.Primary,
                height:40,
                width:40,
                justifyContent:"center",
                borderRadius:SIZES.base,
                }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
              />
            </TouchableOpacity>
          </View>
            }
            title={'Medication Details'}
            titleStyle={{
              marginLeft:120,
              alignSelf:"center"
            }}
            rightComponent={
              <TouchableOpacity
          style={{
            justifyContent:"center"
            }}
          onPress={()=>{
            navigation.navigate('medication',{
              tag:animal.support_tag.toString(),
              species:animal.species.toString(),
              cond:false
            })
          }}
          >
          <Text
          style={{
            padding:SIZES.padding,
            color:COLORS.Primary,
            ...FONTS.h2
          }}
          >+Med</Text>
          </TouchableOpacity>
            }
          />
        );
      }
  return (
    <View style={{flex: 1}}>
     {renderHeader()}
     <Text style={{...FONTS.h3,color:COLORS.red,alignSelf:"center"}}>{err}</Text>
     <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
     {   
     loading?(<ActivityIndicator size="large" color={COLORS.Primary}/>):
     (med.map(a=>{
         return(
            <Med 
            key={a.id}
            medication_date={a.medication_date}
            medication_name={a.medication_name}
            disease={a.disease}
            dosage={a.dosage}
            withdrawal={a.withdrawal}
            withdrawal_date={a.withdrawal_date}
            />
         )
         }))
     }
     </ScrollView>
    </View>
  )
}