import { View, Text ,TouchableOpacity,Image,ScrollView} from 'react-native'
import React from 'react'
import Header from '../../Components/Header'
import { images,FONTS,SIZES,COLORS } from '../../Components/Constants'
import HistoryCard from './HistoryCard'
export default function History({navigation,route}) {
    const [whist,setWhist] = React.useState([])
    React.useEffect(()=>{
        let {data} =route.params
        setWhist(data)
        // console.log(data)
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
                    <HistoryCard key={index} date={a.date_from.slice(0,9)} weight={a.weight}/>
                  ))
              }
          </ScrollView>
          
        </View>
  )
}