import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import pokemonReducer from './reducers/pokemon-reducer';
import { rootSaga } from './sagas/root-saga';
import { pokemonApi } from './services/pokemon-api';

const loggerMiddleware = createLogger();

const sagaMiddleware = createSagaMiddleware();

const middlewares = [pokemonApi.middleware, sagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(loggerMiddleware);
}

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    pokemonReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
