import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {COLORS, SIZES, FONTS, images} from '../../Components/Constants';
import {Caption, Drawer, Title} from 'react-native-paper';
import LineDivider from '../../Components/LineDivider';
export default function Drawercontent(props) {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{}}>
              <Image
                source={images.login}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 80 / 2,
                //   alignSelf: 'center',
                }}
              />
            <View/>
            <View>
            <Title style={styles.title}>Akif khan</Title>
            <Caption style={styles.caption}>@Akif</Caption>
            </View>
        </View>
        </View>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <LineDivider lineStyle={{alignSelf: 'center', width: '95%'}} />
        <DrawerItem
          icon={({color, size}) => (
            <Image source={images.logout} style={[{height: 25, width: 25}]} />
          )}
          label="Logout"
          labelStyle={[FONTS.body3, {letterSpacing: 2}]}
          onPress={() => {
            props.navigation.replace('Login');
          }}
        />
      </Drawer.Section>
    </View>
  );
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
