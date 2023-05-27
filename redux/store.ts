import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import { pokemonApi } from './services/pokemon-api';

const loggerMiddleware = createLogger();

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([pokemonApi.middleware, loggerMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
