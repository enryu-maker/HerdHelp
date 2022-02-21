import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { FONTS, SIZES, COLORS, icons, dummyData } from './Constants';
class ActivityIndicatorExample extends Component {
    _isMounted = false;
   state = { animating: true }
   closeActivityIndicator = () => setTimeout(() => this.setState({
   animating: false }), 20000)
   componentDidMount (){
    this._isMounted = true;
    this.closeActivityIndicator()
   }
//    = () => 
   render() {
      const animating = this.state.animating
      return (
         <View style = {styles.container}>
            <ActivityIndicator
               animating = {animating}
               color = {COLORS.white}
               size = "large"
               style = {styles.activityIndicator}/>
         </View>
      )
   }
}
export default ActivityIndicatorExample
const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   marginTop: 70
   },
   activityIndicator: {
    //   flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 80
   }
})