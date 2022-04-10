import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
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
        style={{borderBottomWidth: 0.8, borderBottomColor: COLORS.Primary}}>
        <TouchableWithoutFeedback
          style={styles.drawerContent}
          // onPress={()=>{props.navigation.navigate('MyAccount')}}
        >
          <View style={styles.userInfoSection}>
            <View style={[styles.row, {flexDirection: 'row'}]}>
              <Image
      source={{uri:`https://ui-avatars.com/api/?name=${global.User[0].username}`}}

                resizeMode="cover"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 80 / 2,
                }}
              />
              <View />
              {global.User && (
                <View style={{marginLeft: 20}}>
                  <View style={{
                    flexDirection:"row"
                  }}>
                  <Title style={styles.title}>{global.User[0]?.fullname}</Title>
                  {
                    global.isActive?<Image source={images.star} 
                    style={{
                      width:25,
                      height:26,
                      margin:6
                    }}/>:null
                  }
                  </View>
                  <Caption style={[styles.caption, {color: COLORS.white}]}>
                    {global.User[0]?.farm_name}
                  </Caption>
                  <Caption
                    style={
                      styles.caption
                    }>{`@ ${global.User[0]?.username}`}</Caption>
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
        <LineDivider
          lineStyle={{
            alignSelf: 'center',
            width: '100%',
            marginTop: 10,
            backgroundColor: COLORS.white,
          }}
        />
        <Drawer.Section style={[styles.drawerSection]}>
          <DrawerItem
            icon={({color, size}) => (
              <Image source={images.home} style={[{height: 25, width: 25, tintColor:COLORS.white}]} />
            )}
            label="Home"
            labelStyle={[FONTS.body3, {letterSpacing: 2, color: COLORS.white}]}
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('Draw');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image source={images.file} style={[{height: 25, width: 25, tintColor:COLORS.white}]} />
            )}
            label="Report"
            labelStyle={[FONTS.body3, {letterSpacing: 2, color: COLORS.white}]}
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('Report');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image source={images.subs} style={[{height: 25, width: 25, tintColor:COLORS.white}]} />
            )}
            label="Subscription"
            labelStyle={[FONTS.body3, {letterSpacing: 2, color: COLORS.white}]}
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('Subscription', {
                msg: '',
                cond: false,
              });
            }}
          />
        </Drawer.Section>
        <Drawer.Section style={[styles.drawerSection, {marginTop: 5}]}>
          <DrawerItem
            icon={({color, size}) => (
              <Image source={images.weight} style={[{height: 25, width: 25, tintColor:COLORS.white}]} />
            )}
            label="Weight History"
            labelStyle={[FONTS.body3, {letterSpacing: 2, color: COLORS.white}]}
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('WeightH');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={images.parents}
                style={[{height: 25, width: 25, tintColor:COLORS.white}]} />
              
            )}
            label="Parents"
            labelStyle={[FONTS.body3, {letterSpacing: 2, color: COLORS.white}]}
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('Parents');
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Image source={images.setting} style={[{height: 25, width: 25, tintColor:COLORS.white}]} />
          )}
          label="Setting"
          labelStyle={[FONTS.body3, {letterSpacing: 2, color: COLORS.white}]}
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate('Setting');
          }}
        />
        <DrawerItem
          icon={({color, size}) => (
            <Image
              source={images.logout}
              style={[{height: 25, width: 25, tintColor:COLORS.red}]} />
          )}
          label="Logout"
          labelStyle={[
            FONTS.body3,
            {letterSpacing: 2, color: COLORS.red, fontWeight: 'bold'},
          ]}
          onPress={() => {
            AsyncStorage.clear();
            props.navigation.replace('Auth');
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
    color: COLORS.white,
  },
  caption: {
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: 1,
    color: COLORS.white,
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
    borderBottomWidth: 0.8,
    borderBottomColor: COLORS.white,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopWidth: 0.8,
    borderTopColor: COLORS.white,
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
