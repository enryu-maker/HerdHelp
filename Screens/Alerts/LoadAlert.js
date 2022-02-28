import {View, Text,TouchableOpacity,Image,ScrollView} from 'react-native';
import React from 'react';
import {
    COLORS,
    images,
    SIZES,
    FONTS
  } from '../../Components/Constants';
import axiosIns from '../../helpers/helpers';
import Header from '../../Components/Header';
import AlertCard from './AlertCard';
import ActivityIndicatorExample from '../../Components/Loading';
import TextButton from '../../Components/TextButton';
export default function LoadAlert({ navigation , route}) {
  const [alert, setAlerts] = React.useState([]);
  const [species, setSpcies] = React.useState([]);
  const [id,setId] = React.useState(null)
  const [loading, setLoading] = React.useState(false);

  async function loadFinance() {
    let {data} = await axiosIns.get('alerts/');
    setLoading(true);
    return data;
  }
  React.useEffect(() => {
    // if (!loading) {
      // setInterval(()=>{
        // let {id} = route.params
        setId(global.id)
        // let {sep} = route.params
        setSpcies(global.species)
        loadFinance().then(data => {setAlerts(data)});
      // },6000)
    // }
    // console.log(alert)
  },[]);
  
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
            title={'Alerts'}
          />
        );
      }
      
    return (
        <View style={{flex: 1}}>
      {renderHeader()}
      {loading? (
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        {alert.map((listItem, index) => (
          <AlertCard
            key={index}
            title={listItem.title}
            content={listItem.content}
            tag={listItem.tag_number}
            date={listItem.alert_date}
            time={listItem.alert_time}
            id={listItem.id}
          />
        ))}
      </ScrollView>
      ) : (
        
        <ActivityIndicatorExample />
      )}

      <TextButton
        onPress={() => {
          navigation.replace('Alerts',{
            sep:species,
            id:id
          });
        }}
        icon={images.bell}
        buttonContainerStyle={{
          //   flex:1,
          height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding + 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label={'Add Alert'}
      />
    </View>
  );
}
