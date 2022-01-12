import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
import { reducers } from "./reducers";
 
const persistConfig = {
  key: 'root', 
  storage,

}
// const store = createStore(reducers, compose(applyMiddleware(thunk)));

 
const persistedReducer = persistReducer(persistConfig, reducers)
 
let store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
let persistor = persistStore(store)

export default { store, persistor }
