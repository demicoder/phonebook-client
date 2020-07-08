const { ADD_ALERT, REMOVE_ALERT } = require('../types');

const alertReducer = (state, action) => {
  switch (action.type) {
    case ADD_ALERT:
      state = [...state, action.payload];
      return state;
    case REMOVE_ALERT:
      state = state.filter((alertItem) => alertItem.id !== action.payload);
      return state;
    default:
      return state;
  }
};

export default alertReducer;
