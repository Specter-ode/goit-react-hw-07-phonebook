import { createReducer, combineReducers } from '@reduxjs/toolkit';
import * as actions from './contacts-actions';

export const filterReducer = createReducer('', {
  [actions.filterChange]: (_, action) => action.payload.toLowerCase().trim(),
});

const itemsReducer = createReducer([], {
  [actions.fetchContactsSuccess]: (_, action) => action.payload,
  [actions.removeContactSuccess]: (store, action) =>
    store.filter(item => item.id !== action.payload),
  [actions.addContactSuccess]: (store, action) => {
    return [...store, action.payload];
  },
});

const loadingReducer = createReducer(false, {
  [actions.fetchContactsRequest]: () => true,
  [actions.fetchContactsSuccess]: () => false,
  [actions.fetchContactsError]: () => false,
  [actions.removeContactRequest]: () => true,
  [actions.removeContactSuccess]: () => false,
  [actions.removeContactError]: () => false,
  [actions.addContactRequest]: () => true,
  [actions.addContactSuccess]: () => false,
  [actions.addContactError]: () => false,
});

const errorReducer = createReducer(null, {
  [actions.fetchContactsRequest]: () => null,
  [actions.fetchContactsError]: (_, action) => action.payload,
  [actions.removeContactRequest]: () => null,
  [actions.removeContactError]: (_, action) => action.payload,
  [actions.addContactRequest]: () => null,
  [actions.addContactError]: (_, action) => action.payload,
});

export const contactsReducer = combineReducers({
  items: itemsReducer,
  loading: loadingReducer,
  error: errorReducer,
  filter: filterReducer,
});
