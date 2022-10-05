import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistCombineReducers, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import userReducer from './reducer';
import createSecureStore from 'redux-persist-expo-securestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const secureStore = createSecureStore();

const securePersistconfig = {
  key: 'main',
  storage: secureStore,
};

// const mainPersistConfig = {
//   key: 'main',
//   storage: AsyncStorage,
// };

const rootReducer = combineReducers({
  main: persistReducer(securePersistconfig, userReducer),
  // secure: persistReducer(securePersistconfig, userReducer),
});

export const Store = createStore(rootReducer, undefined, applyMiddleware(thunk));

export const Persistor = persistStore(Store);
