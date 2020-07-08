import { REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('jwt', action.payload.token);

      state = {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
        isAuth: true
      };

      return state;
    case REGISTER_FAIL:
      localStorage.removeItem('jwt');
      state = {
        ...state,
        token: null,
        user: null,
        loading: false,
        isAuth: false,
        error: "Couldn't create user, try again"
      };
      return state;
    default:
      return state;
  }
};

export default authReducer;
