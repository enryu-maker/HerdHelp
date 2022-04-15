const initialState = {
  authToken: null,
  unit: null,
  userData: {},
  status: [],
  cat: [],
  tags:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state, 
        authToken: action.payload,
      };
    case 'UNIT':
      return {
        ...state, 
        unit: action.payload,
      };
    case 'LOGOUT':
      return {
        authToken: null,
      };
    case 'STATUS':
      return {
        ...state,
        status: action.payload,
      };
      case 'TAGS':
      return {
        ...state,
        tags: action.payload,
      };
    case 'USER':
      return {
        ...state,
        userData: action.payload,
      };
    case 'CATEGORY':
      return {
        ...state,
        cat: action.payload,
      };
    default:
      return state;
  }
};
