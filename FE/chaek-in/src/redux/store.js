import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';
import userReducer from './reducer';
import createSecureStore from 'redux-persist-expo-securestore';

const secureStorage = createSecureStore();

const config = {
  key: 'root',
  storage: secureStorage,
};

const rootReducer = persistCombineReducers(config, userReducer);

export const Store = createStore(rootReducer, applyMiddleware(thunk));

export const Persistor = persistStore(Store);
