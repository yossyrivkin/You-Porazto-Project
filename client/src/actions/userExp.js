import { SWITCH_MODE } from '../constants/actionTypes';

export const switchDarkMode = (mode) => (dispatch) => {
  let newMode = mode === 'light' ? 'dark' : 'light';
  dispatch({ type: SWITCH_MODE, payload: newMode});
};
