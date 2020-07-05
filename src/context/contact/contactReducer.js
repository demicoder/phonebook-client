import { ADD_CONTACT } from '../types';

const contactReducer = (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      state = { ...state, contacts: [...state.contacts, action.payload] };

      return state;
    default:
      return state;
  }
};

export default contactReducer;
