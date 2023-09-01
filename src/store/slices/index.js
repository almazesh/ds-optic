import { productQuery } from '../query/productQuery';
import { combineReducers } from '@reduxjs/toolkit';
import { storesQuery } from '../query/storesQuery';
import { usersQuery } from '../query/usersQuery';
import sidebarSlice from './sidebarSlice';
import importSlice from './importSlice';
import modalSlice from './modalSlice';
import userSlice from './userSlice';

export const rootReducer = combineReducers({
  user: userSlice,
  modal: modalSlice,
  import: importSlice,
  sidebar: sidebarSlice,

  // query reducers

  [storesQuery.reducerPath]: storesQuery.reducer,
  [usersQuery.reducerPath]: usersQuery.reducer,
  [productQuery.reducerPath]: productQuery.reducer,
})