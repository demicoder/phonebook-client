import {
  ADD_CONTACT,
  GET_CONTACTS,
  SET_EDIT_CONTACT,
  CLEAR_CURRENT,
  DELETE_CONTACT,
  EDIT_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  CLEAR_CONTACTS
} from '../types';

const contactReducer = (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      state = {
        ...state,
        loading: false,
        contacts: [action.payload, ...state.contacts]
      };
      return state;
    case GET_CONTACTS:
      state = { ...state, loading: false, contacts: action.payload };
      return state;
    case SET_EDIT_CONTACT:
      state = {
        ...state,
        current: state.contacts.find((contact) => contact.id === action.payload)
      };
      return state;
    case EDIT_CONTACT:
      state = {
        ...state,
        loading: false,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };

      return state;
    case CLEAR_CURRENT:
      state = {
        ...state,
        current: null
      };
      return state;

    case DELETE_CONTACT:
      state = {
        ...state,
        loading: false,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
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
    case CLEAR_CONTACTS:
      state = { ...state, contacts: null };
      return state;
    default:
      return state;
  }
};
export default contactReducer;
