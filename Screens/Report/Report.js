import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { images,COLORS } from '../../Components/Constants';
import Header from '../../Components/Header';
import ReportB from './ReportB';
export default function Report({navigation}) {
  function renderheader() {
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
              onPress={() =>  {navigation.replace("Main")} }>
              <Image source={images.back} style={{width:30,height:30,tintColor:COLORS.darkGray2}}/>

            </TouchableOpacity>
          </View>
        }
        title={'Reports'}
      />
    );
  }
  function renderButtons(){
    return(
      <ReportB
      img={images.weight}
      reportText={"Weight History"}
      />
    )
  }
  return (
    <View style={{flex:1}}>
      {renderheader()}
      {renderButtons()}
    </View>
  )
}