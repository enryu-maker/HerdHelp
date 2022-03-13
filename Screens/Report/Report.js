import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {images, COLORS,SIZES} from '../../Components/Constants';
import Header from '../../Components/Header';
import ReportB from './ReportB';
import axiosIns from '../../helpers/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Report(props) {
  const [report, setReport] = React.useState([]);
  const [footer, setFooter] = React.useState(false);

  async function getReports() {
    let {data} = await axiosIns.get('reports/');
    return data;
  }
  React.useEffect(() => {
    getReports().then(data => {
      setReport(data);
    });

  },[]);
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
              onPress={() => {props.navigation.openDrawer()}}>
              <Image
                source={images.menu}
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
            props.navigation.navigate("ReportOP",{
              label:listItem.name,
              api:listItem.api.toString(),
              cond:false,
              // footer:listItem.name.toString()!="Sold Animals" || "Lost Animals"? false : true
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
