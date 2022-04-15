import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosIns from "../helpers/helpers";

export const Init = () => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('token');
    let id = await AsyncStorage.getItem('id');
    if (token !== null && id!==null) {
      dispatch({
        type: 'LOGIN',
        payload: token,
      })
    }
  }
}

export const Login = (token,id) => {
  return async dispatch => {
    if (token && id) {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('id', id);
    await AsyncStorage.setItem('unit', "true");
    }
    dispatch({
      type: 'LOGIN',
      payload: token,
      payload:id
    })
  }
}
export const WeightUnit = (cond) => {
    return async dispatch => {
      if (cond) {
        await AsyncStorage.setItem('unit', cond);
      }
      dispatch({
        type: 'UNIT',
        payload: cond,
      })
    }
  }
  export const UserData = () => {
    return async dispatch => {
      let {data} = await axiosIns.get('profile/');
      dispatch({
        type: 'USER',
        payload:data[0]
      })
    }
  }
  export const getStatus = () => {
    return async dispatch => {
      let {data} = await axiosIns.get('getstatuses/');
      dispatch({
        type: 'STATUS',
        payload:data
      })
    }
  }
  export const getTags = () => {
    return async dispatch => {
      let {data} = await axiosIns.get('animaltags/');
      dispatch({
        type: 'TAGS',
        payload:data
      })
    }
  }
  export const getSpecies = () => {
    return async dispatch => {
      let {data} = await axiosIns.get('getcategories/');
      dispatch({
        type: 'CATEGORY',
        payload:data
      })
    }
  }

export const Logout = () => {
  return async dispatch => {
    await AsyncStorage.clear();
    dispatch({
      type: 'LOGOUT'
    })
  }
}