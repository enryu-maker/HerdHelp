import AsyncStorage from "@react-native-async-storage/async-storage";

export const Init = () => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('token');
    let id = await AsyncStorage.getItem('id');

    if (token !== null && id!==null) {
      console.log('token fetched');
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
      console.log('token stored');
    }
    dispatch({
      type: 'LOGIN',
      payload: token,
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