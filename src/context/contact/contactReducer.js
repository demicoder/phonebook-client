import { ADD_CONTACT, SET_EDIT_CONTACT } from '../types';

const contactReducer = (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      state = { ...state, contacts: [...state.contacts, action.payload] };
      return state;
    case SET_EDIT_CONTACT:
      state = {
        ...state,
        currentEdit: state.contacts.find(
          (contact) => contact.id === action.payload
        )
      };
      console.log(state);

      return state;
    default:
      return state;
  }
};

export default contactReducer;
