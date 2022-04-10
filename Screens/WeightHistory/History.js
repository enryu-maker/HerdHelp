import { View, Text ,TouchableOpacity,Image,ScrollView} from 'react-native'
import React from 'react'
import Header from '../../Components/Header'
import { images,FONTS,SIZES,COLORS } from '../../Components/Constants'
import HistoryCard from './HistoryCard'
import { compareAsc, format } from 'date-fns'
export default function History({navigation,route}) {
    const [whist,setWhist] = React.useState([])
    const [unit,setUnit] = React.useState(global.unit)

    React.useEffect(()=>{
        let {data} =route.params
        setWhist(data)
        setUnit(global.unit)
        // console.log(whist[0].date_from)
    },[])
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
                backgroundColor:COLORS.Primary,
                height:40,
                width:40,
                justifyContent:"center",
                borderRadius:40/2,
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
            title={"History"}
          />
        );
      }
      return (
        <View style={{flex:1,backgroundColor:COLORS.white}}>
          {renderheader()}
          <ScrollView showsHorizontalScrollIndicator={false}>
              {
                  whist.map((a,index)=>(
                    unit?
                    (<HistoryCard key={index} date={a.date_from.slice(0,10)} weight={a.weight}/>):
                    (<HistoryCard key={index} date={a.date_from.slice(0,10)} weight={a.weight_kg}/>)

                  ))
              }
          </ScrollView>
          
        </View>
  )
}