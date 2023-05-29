import { all } from 'redux-saga/effects';

import { getPokemonsByTypeSaga } from './pokemons/get-pokemons-by-type-saga';
import { requestPokemonsRequestSaga } from './pokemons/get-pokemons-saga';

export function* rootSaga() {
  try {
    yield all([requestPokemonsRequestSaga(), getPokemonsByTypeSaga()]);
  } catch (error) {
    console.log(`Redux related error: ${error}`);
  }
}
