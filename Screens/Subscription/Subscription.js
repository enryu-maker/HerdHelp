import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from 'react-native';
import React from 'react';
import {images, FONTS, SIZES, COLORS} from '../../Components/Constants';
import Header from '../../Components/Header';
import TextButton from '../../Components/TextButton';
import SubscriptionCard from './SubscriptionCard';
import { ActivityIndicator } from 'react-native-paper';
import axiosIns from '../../helpers/helpers';
export default function Subscription({navigation,route}) {
  const [subs, setSubs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  async function loadSubs() {
    setLoading(true);
    if (route.params.cond){
      let {data} = await axiosIns.get('subscriptions/');
      return(data)
    }
    else{
      let {data} = await axiosIns.get('subscriptions/user/');
      return(data.data)
    }
  }
  React.useEffect(() => {
    loadSubs().then(data => {
      setSubs(data);
      setLoading(false);
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
                navigation.openDrawer();
              }}>
              <Image
                source={images.menu}
                style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Subscription'}
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderheader()}
      <Text style={{
        color:COLORS.red,
        padding:10,
        alignSelf:"center",
        ...FONTS.h3
      }}>{route.params.msg}</Text>
     
        {loading ? (
          <ActivityIndicator size={'large'} color={COLORS.Primary} style={{
            height:SIZES.height/2
          }} />
        ) : (
          <FlatList
        data={subs}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          item.price != 0?
            <SubscriptionCard
              key={item.id}
              label={item.label}
              price={item.price}
              count={item.count}
              active={item.active}
              onPress={() => {
                navigation.navigate('Details', {
                  data: item,
                  cond:item.active
                });
              }}
            />:null
          )}
        />
        )}
    </View>
  );
}
