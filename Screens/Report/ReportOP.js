import { View, Text ,TouchableOpacity,Image,ScrollView,Platform} from 'react-native'
import React from 'react'
import Header from '../../Components/Header';
import Card from '../../Components/Card';
import {
  COLORS,
  FONTS,
  images,
  SIZES,
} from '../../Components/Constants';
import axiosIns from '../../helpers/helpers';
import ReportFilter from './ReportFilter';
export default function ReportOP({navigation,route}) {
  const [label,setLabel]=React.useState("")
  const [loading,setLoading]=React.useState(false)
  const [Data,setData]=React.useState([])
  const [con,setCon] = React.useState(false)
  const [show, setShow] = React.useState(false);
  const [sep, setSpec] = React.useState('')
  const [vacc, setVacc] = React.useState('')
  const [med, setMed] = React.useState('')
  const [footer,setFooter] =React.useState(false)

  function filterList(list) {
    return list.filter(
      (listItem) =>
          listItem.species
          .toString()
          .includes(sep.toString()) &&
          (listItem.vaccinated
          .toString()
          .includes(vacc.toString()) &&
          listItem.medicated
          .toString()
          .includes(med.toString()))
    );
  }
  // console.log(Data)
async function getData(api){
    let {data} =  await axiosIns.get(api)
    return data
 }
//  console.log(api)
  React.useEffect(()=>{
    
    let {label} = route.params
    let {api} =route.params
    let {cond} =route.params
    // let {footer} =route.params
    // setFooter(footer)
    setCon(cond)
      setLabel(label)
    getData(api).then(data=>{
        setData(data)
    })
    
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
        titleStyle={{
          marginLeft:65
        }}
        rightComponent={
          <View
            style={{
              justifyContent: 'center',
              // position: 'absolute',
              // marginTop: 25,
              zIndex: 1,
            }}>
            <TouchableOpacity
              style={{
                // marginLeft: 25,
              }}
              onPressIn={() => {
                setShow(true);
              }}>
              <Image
                source={images.filter}
                style={{width: 25, height: 25, tintColor: COLORS.darkGray2,margin:20}}
              />
            </TouchableOpacity>
          </View>
        }
      />
    );
  }
  function renderFooter(){
    return(
      <View style={{
        // justifyContent:"flex-end",
        height:80,
        borderTopLeftRadius:SIZES.radius+10,
        borderTopRightRadius:SIZES.radius+10,
        backgroundColor:COLORS.Primary,
        flexDirection:"row",
        justifyContent:"center"
      }}>
        <Text style={
          
         Platform.OS=="ios"?{
          ...FONTS.h1,
          color:COLORS.white,
          alignSelf:"center"
        }:{
          ...FONTS.h2,
          color:COLORS.white,
          alignSelf:"center"

        }
      }>Amount:</Text>
      <Text style={
         Platform.OS=="ios"?{
          ...FONTS.h1,
          color:COLORS.white,
          alignSelf:"center"
        }:{
          ...FONTS.h2,
          color:COLORS.white,
          alignSelf:"center"


        }
      }>  $240</Text>
      </View>
    )
  }
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {renderHeader()} 
      {
        show &&
      <ReportFilter show={show} setShow={setShow} setSpec={setSpec} setMed={setMed} setVacc={setVacc}/>
      }
      
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          {filterList(Data).map((listItem, index) => (
            <Card
              key={index}
              cond={con}
              Name={listItem.name}
              Tagnumber={listItem.support_tag}
              Gender={listItem.gender}
              Species={listItem.category}
              Weight={listItem.weight}
              image={listItem.image}
              onPress={() => {
                navigation.navigate('Info', {
                  value: listItem,
                  cond:con
                });
              }}
            />
          ))}
        </ScrollView>
        {
          footer?renderFooter():<View></View>
        }
        
    </View>
  )
}