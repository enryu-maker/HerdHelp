import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {images, FONTS, SIZES, COLORS} from '../../Components/Constants';
import Header from '../../Components/Header';
import SubscriptionCard from '../Subscription/SubscriptionCard';
import axios from 'axios';
import { baseURL } from '../../helpers/helpers';
export default function Subscription({navigation}) {
  const [subs, setSubs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  async function loadSubs() {
    setLoading(true);
    let {data} = await axios.get(baseURL + '/subscriptions/');
    return data;
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
                backgroundColor: COLORS.Primary,
                height: 40,
                width: 40,
                justifyContent: 'center',
                borderRadius: SIZES.base,
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: COLORS.white,
                  alignSelf: 'center',
                }}
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
      <ScrollView showsHorizontalScrollIndicator
       style={{
        flex:1,
      }}>
        {loading ? (
          <ActivityIndicator size={'large'} color={COLORS.Primary} style={{
            justifyContent:"center",alignSelf:"center"
          }} />
        ) : (
          subs.map(a => (
            <SubscriptionCard
              key={a.id}
              label={a.label}
              price={a.price}
              count={a.count}
              onPress={() => {
                navigation.navigate('Details', {
                  data: a,
                  cond:false
                });
              }}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
