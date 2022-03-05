import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {COLORS, SIZES, FONTS, images} from '../../Components/Constants';
import userData from '../../Components/Constants';
import {Caption, Drawer, Title} from 'react-native-paper';
import LineDivider from '../../Components/LineDivider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosIns from '../../helpers/helpers';
export default function Drawercontent(props) {
  
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        style={{borderBottomWidth: 0, borderBottomColor: 'none'}}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={[styles.row, {flexDirection: 'row'}]}>
              <Image
                source={images.login}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 80 / 2,
                }}
              />
              <View />
              {/* <View style={{marginLeft: 20}}>
                <Title style={styles.title}>{user[0].fullname}</Title>
                <Caption style={[styles.caption, {color: COLORS.gray}]}>
                {user[0].farm_name}
                </Caption>
                <Caption style={styles.caption}>{`@ ${user[0].username}`}</Caption>
              </View> */}
            </View>
          </View>
        </View>
        <LineDivider
          lineStyle={{alignSelf: 'center', width: '95%', marginTop: 10}}
        />
        <Drawer.Section style={[styles.drawerSection]}>
          <DrawerItem
            icon={({color, size}) => (
              <Image source={images.home} style={[{height: 25, width: 25}]} />
            )}
            label="Home"
            labelStyle={[FONTS.body3, {letterSpacing: 2}]}
            onPress={() => {
              props.navigation.navigate('Draw');
              props.navigation.closeDrawer()
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image source={images.med} style={[{height: 25, width: 25}]} />
            )}
            label="Setting"
            labelStyle={[FONTS.body3, {letterSpacing: 2}]}
            onPress={() => {
              props.navigation.navigate('Setting');
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <LineDivider lineStyle={{alignSelf: 'center', width: '95%'}} />
        <DrawerItem
          icon={({color, size}) => (
            <Image
              source={images.logout}
              style={[{height: 25, width: 25, tintColor: COLORS.red}]}
            />
          )}
          label="Logout"
          labelStyle={[
            FONTS.body3,
            {letterSpacing: 2, color: COLORS.red, fontWeight: 'bold'},
          ]}
          onPress={() => {
            AsyncStorage.clear();
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
    paddingLeft: 25,
  },
  title: {
    fontSize: 20,
    marginTop: 3,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  caption: {
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: 1,
  },
  row: {
    marginTop: 6,
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
    marginTop: 10,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    // borderTopColor: COLORS.lightGray1,
    // borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
