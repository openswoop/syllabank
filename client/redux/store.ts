import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { reducer as coursesReducer } from './coursesSlice';

const reducer = combineReducers({
  courses: coursesReducer,
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const makeStore = (preloadedState: RootState) =>
  configureStore({
    preloadedState,
    reducer,
  });

// Create an unhydrated store just so we can get the types from it
const dummyStore = configureStore({ reducer });
export type AppDispatch = typeof dummyStore.dispatch;
export type RootState = ReturnType<typeof dummyStore.getState>;
