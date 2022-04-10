import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {images, COLORS, SIZES} from '../../Components/Constants';
import Header from '../../Components/Header';
import ReportB from './ReportB';
import axiosIns from '../../helpers/helpers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function Report(props) {
  const [report, setReport] = React.useState([]);
  const [footer, setFooter] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function getReports() {
    setLoading(true);
    let {data} = await axiosIns.get('reports/');
    setLoading(false);
    return data;
  }
  // async function getfields() {
  //   global.fields = await axiosIns.get('getfields/');
  // }
  React.useEffect(() => {
    getReports().then(data => {
      setReport(data);
    });
    // getfields()
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
                borderRadius:40/2,
              }}
              onPress={() => {
                props.navigation.openDrawer();
              }}>
              <Image
                source={images.menu}
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
        title={'Reports'}
      />
    );
  }
  function renderButtons() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        {loading ? (
          <ActivityIndicator
            animating={loading}
            color={COLORS.Primary}
            size="large"
            style={{marginTop: SIZES.height * 0.35}}
          />
        ) : (
          report.map((listItem, index) => (
            <ReportB
              key={listItem.id}
              img={listItem.image}
              reportText={listItem.name}
              onPress={() => {
                props.navigation.navigate('ReportOP', {
                  label: listItem.name,
                  api: listItem.api.toString(),
                  cond: false,
                  footer:
                    listItem.name == 'Lost Animals' ||
                    listItem.name == 'Sold Animals' ||
                    listItem.name == 'Purchased Animals'
                      ? true
                      : false,
                });
              }}
            />
          ))
        )}
      </View>
    );
  }
  return (
    <View style={{flex: 1,backgroundColor:COLORS.white}}>
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
