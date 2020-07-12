import {
  START_AUTH,
  REGISTER,
  REGISTER_ERROR,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_ERROR,
  CLEAR_ERRORS,
  LOGIN,
  LOGOUT,
  LOGOUT_ERROR
} from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case START_AUTH:
      state = { ...state, startAuth: true };
      return state;
    case LOGIN:
    case REGISTER:
      localStorage.setItem('jwt', action.payload.jwt);

      state = {
        ...state,
        token: action.payload.jwt,
        user: {
          id: action.payload.user.id,
          email: action.payload.user.email,
          name: action.payload.user.name
        },
        loading: false,
        isAuth: true,
        startAuth: false
      };
      return state;
    case LOGOUT:
    case LOGOUT_ERROR:
    case AUTH_ERROR:
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      if (!LOGOUT_ERROR) localStorage.removeItem('jwt');
      state = {
        ...state,
        token: null,
        error: action.payload,
        user: null,
        startAuth: false,
        loading: false,
        isAuth: false
      };
      return state;
    case CLEAR_ERRORS:
      state = { ...state, error: null };
      return state;

    case USER_LOADED:
      state = {
        ...state,
        user: {
          id: action.payload.user.id,
          email: action.payload.user.email,
          name: action.payload.user.name
        },
        isAuth: true,
        loading: false
      };
      return state;
    default:
      return state;
  }
};

export default authReducer;
