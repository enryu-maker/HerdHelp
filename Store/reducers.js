const initialState = {
  authToken: null,
  unit: null,
  userData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state, //copy all previous states
        authToken: action.payload,
      };
    case 'UNIT':
      return {
        ...state, //copy all previous states
        unit: action.payload,
      };
    case 'LOGOUT':
      return {
        authToken: null,
      };
    case 'USER':
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};
