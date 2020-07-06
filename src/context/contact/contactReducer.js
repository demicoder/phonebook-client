import {
  ADD_CONTACT,
  SET_EDIT_CONTACT,
  CLEAR_CURRENT,
  DELETE_CONTACT,
  EDIT_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER
} from '../types';

const contactReducer = (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      state = { ...state, contacts: [...state.contacts, action.payload] };
      return state;
    case SET_EDIT_CONTACT:
      state = {
        ...state,
        current: state.contacts.find((contact) => contact.id === action.payload)
      };
      return state;
    case CLEAR_CURRENT:
      state = { ...state, current: null };
      return state;
    case DELETE_CONTACT:
      state = {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        )
      };
      return state;
    case EDIT_CONTACT:
      state = {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id !== action.payload.id ? contact : action.payload
        )
      };
      return state;
    case FILTER_CONTACT:
      state = {
        ...state,
        filtered: state.contacts.filter(
          (contact) =>
            contact.name.toLowerCase().includes(action.payload.toLowerCase()) ||
            contact.phone.includes(action.payload)
        )
      };
      return state;
    case CLEAR_FILTER:
      state = {
        ...state,
        filtered: null
      };
      return state;
    default:
      return state;
  }
};
export default contactReducer;
