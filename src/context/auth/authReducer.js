import {
  REGISTER_SUCCESS,
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
    case LOGIN:
    case REGISTER_SUCCESS:
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
        isAuth: true
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
