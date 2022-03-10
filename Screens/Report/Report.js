import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {images, COLORS,SIZES} from '../../Components/Constants';
import Header from '../../Components/Header';
import ReportB from './ReportB';
import axiosIns from '../../helpers/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Report({navigation}) {
  const [report, setReport] = React.useState([]);
  async function getReports() {
    let {data} = await axiosIns.get('reports/');
    return data;
  }
  React.useEffect(() => {
    getReports().then(data => {
      setReport(data);
    });
  }, []);
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
              onPress={() => {
                navigation.replace('Draw');
              }}>
              <Image
                source={images.back}
                style={{width: 30, height: 30, tintColor: COLORS.darkGray2}}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Reports'}
      />
    );
  }
  function renderButtons() {
    return (
      <View
        style={{
          flex: 1
        }}>
        {
        report.map((listItem, index)  => (
          <ReportB key={listItem.id} img={listItem.image} reportText={listItem.name} 
          onPress={()=>{
            navigation.navigate("ReportOP",{
              label:listItem.name,
              api:listItem.api.toString(),
              cond:false
            })
          }}
          />
        )
        )}
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      {renderheader()}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingBottom: 40,
        }}>
      {renderButtons()}
      </KeyboardAwareScrollView>
    </View>
  );
}
