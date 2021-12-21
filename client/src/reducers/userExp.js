import { SWITCH_MODE } from '../constants/actionTypes';

export default (state = { mode: 'light' }, action) => {
  switch (action.type) {
    case 'SWITCH_MODE':
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

