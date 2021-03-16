import {
  SIGNIN_LOAD,
  SIGNIN_FETCH,
  SIGNIN_ERROR,
  SIGNOUT,
  SIGNOUT_ERROR,
  AUTH_CHECK,
} from '../types';

const initialState = {
  token: null,
  isAuth: false,
  signinLoading: false,
  error: {},
};

const AuthReducer = (state = initialState, action) => {
  const {type, payload, authState} = action;
  switch (type) {
    case SIGNIN_LOAD:
      return {
        ...state,
        signinLoading: true,
      };
    case SIGNIN_FETCH:
      return {
        ...state,
        signinLoading: false,
        token: payload,
        isAuth: true,
      };
    case SIGNIN_ERROR:
      return {
        ...state,
        signinLoading: false,
        error: payload,
      };
    case SIGNOUT:
      return {
        ...state,
        isAuth: authState,
        token: payload,
      };
    case SIGNOUT_ERROR:
      return {
        ...state,
        error: payload,
      };
    case AUTH_CHECK:
      return {
        ...state,
        isAuth: payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
