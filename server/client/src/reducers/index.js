import { combineReducers } from 'redux';

import auth from './auth'
import stands from './stands';
import userExp from './userExp';

export const reducers = combineReducers({ stands, auth, userExp });
