import {
  SIGNIN_FETCH,
  SIGNIN_LOAD,
  SIGNIN_ERROR,
  SIGNOUT,
  SIGNOUT_ERROR,
  AUTH_CHECK,
} from '../types';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import toastMessage from '../../utils/toastMessage';

export const signIn = (data) => async (dispatch) => {
  dispatch({type: SIGNIN_LOAD});
  try {
    const result = await Axios.post(
      'https://www.reachnbuy.com/test/api/v1/user/auth/login',
      data,
    );
    dispatch({type: SIGNIN_FETCH, payload: result.data.accessToken});

    // Set asyncStorage with the token
    await AsyncStorage.setItem('@accessToken', result.data.accessToken);
  } catch (error) {
    dispatch({type: SIGNIN_ERROR, payload: error.response.data.error});
    toastMessage('Invalid login or password');
  }
};

export const signOut = () => async (dispatch) => {
  console.log("logging out")
  try {
    const value = await AsyncStorage.removeItem('@accessToken');
    if (value === null) {
      dispatch({type: SIGNOUT, payload: null, authState: false});
    }
  } catch (error) {
    dispatch({type: SIGNOUT_ERROR, payload: error});
  }
};

export const setAuthCheckValue = (value) => (dispatch) => {
  dispatch({type: AUTH_CHECK, payload: value});
};
