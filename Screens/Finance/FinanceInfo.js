import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import axiosIns from '../../helpers/helpers';
import Header from '../../Components/Header';
import TextButton from '../../Components/TextButton';
import FinanceCard from './FinanceCard';
import {COLORS, SIZES, images} from '../../Components/Constants';
import Loader from '../../Components/Loader';
export default function FinanceInfo({navigation}) {
  const [finance, setFinance] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  async function loadFinance() {
    setLoading(true)
    let {data} = await axiosIns.get('finance/');
    return data;
  }
  React.useEffect(() => {
      loadFinance().then(data => setFinance(data),setLoading(false));
    
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
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{width: 30, height: 30, tintColor: COLORS.darkGray2}}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Finance Details'}
      />
    );
  }
  return (
    <View style={{flex: 1}}>
      <Loader loading={loading}/>
      {renderHeader()}
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        {finance.map((listItem, index) => (
          <FinanceCard
            key={index}
            category={listItem.category}
            price={listItem.price}
            quantity={listItem.quantity}
            date={listItem.added_date}
          />
        ))}
      </ScrollView>
      <TextButton
        onPress={() => {
          navigation.replace('Finance');
        }}
        icon={images.money}
        buttonContainerStyle={{
          //   flex:1,
          height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding + 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label={'Add Finance'}
      />
    </View>
  );
}
