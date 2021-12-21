import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_BY_CREATOR, FETCH_STAND, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, stands: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        stands: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
    case FETCH_BY_CREATOR:
      return { ...state, stands: action.payload.data };
    case FETCH_STAND:
      return { ...state, stand: action.payload.stand };
    case LIKE:
      return { ...state, stands: state.stands.map((stand) => (stand._id === action.payload._id ? action.payload : stand)) };
    case COMMENT:
      return {
        ...state,
        stands: state.stands.map((stand) => {
          if (stand._id == +action.payload._id) {
            return action.payload;
          }
          return stand;
        }),
      };
    case CREATE:
      return { ...state, stands: [...state.stands, action.payload] };
    case UPDATE:
      return { ...state, stands: state.stands.map((stand) => (stand._id === action.payload._id ? action.payload : stand)) };
    case DELETE:
      return { ...state, stands: state.stands.filter((stand) => stand._id !== action.payload) };
    default:
      return state;
  }
};

