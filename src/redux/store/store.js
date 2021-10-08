import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from "redux-persist";
//import {combineReducers} from "redux"
import authSlice from '../slices/authSlice/authSlice';
import userSlice from '../slices/userSlice/userSlice';
import healthWorkerSlice from '../slices/healthWorkerSlice/healthWorkSlice';

//import { persistStore } from 'redux-persist';

//all reducers
const reducers = combineReducers({
  authSlice,
  userSlice,
  healthWorkerSlice

})

//persistentStore
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['userSlice', 'healthWorkerSlice', 'authSlice'],
  //whitelist: ['authSlice', 'healthWorkerSlice', 'authSlice']
};

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})
//export const persistedStore =  persistStore(configureStore);