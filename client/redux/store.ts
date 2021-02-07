import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import { reducer as coursesReducer } from './coursesSlice';
import { reducer as searchReducer } from './searchSlice';

const rootReducer = combineReducers({
  courses: coursesReducer,
  search: searchReducer,
});

const hydrateReducer = (state: RootState | undefined, action: AnyAction) => {
  state = action.type === HYDRATE ? { ...state, ...action.payload } : state;
  return rootReducer(state, action);
};

// Create an unhydrated store just so we can get the types from it
const dummyStore = configureStore({ reducer: rootReducer });
export type AppDispatch = typeof dummyStore.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

// Wrapper
const makeStore: MakeStore<RootState> = () => configureStore({ reducer: hydrateReducer });
export const wrapper = createWrapper<RootState>(makeStore, {
  debug: false, // process.env.NODE_ENV === 'development'
});
