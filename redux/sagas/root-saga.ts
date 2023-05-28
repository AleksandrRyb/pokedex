import { all } from 'redux-saga/effects';

import { getPokemonsRequestSaga } from './pokemons/get-pokemons-saga';

export function* rootSaga() {
  try {
    yield all([getPokemonsRequestSaga()]);
  } catch (error) {
    console.log(`Redux related error: ${error}`);
  }
}
