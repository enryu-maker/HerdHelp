import { View, Text,TouchableOpacity,Image,ScrollView } from 'react-native'
import React from 'react'
import Header from './Header'
import {
    SIZES,
    COLORS,
    images,
    FONTS
} from "../Components/Constants"
import Med from './Med';
export default function MedCard({ navigation,route }) {
  const [med, setMed] = React.useState([]);
  const [err, setErr] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
      if(!loading){
        let {medication} = route.params
        setMed(medication)
      }
  }, []);

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
            title={'Medication Details'}
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
     med.map(a=>{
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
         })
     }
     </ScrollView>
    </View>
  )
}