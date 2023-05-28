import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { call, put, select, take } from 'redux-saga/effects';

import { POKEMON_API_BASE_URL } from '@/constants/services-constants';
import * as pokemonActions from '@/redux/actions/pokemon-actions';

import type { RootState } from '../../store';

function getPokemons(limit: number, offset: number): Promise<AxiosResponse> {
  return axios.get(
    `${POKEMON_API_BASE_URL}/pokemon/?limit=${limit}&offset=${offset}`
  );
}

function getPokemonReducer(state: RootState) {
  return state.pokemonReducer;
}

export function* getPokemonsRequestSaga(): Generator<any, void, any> {
  while (true) {
    try {
      yield take(pokemonActions.requestPokemonsList);

      const { paginationData, isGetPokemonByType, isGetPokemonByName } =
        yield select(getPokemonReducer);

      if (isGetPokemonByName) {
        // TODO: write logic for request pokemons by name
      }

      if (isGetPokemonByType) {
        // TODO: write logic for request pokemons by type
      }

      console.log(paginationData);

      const result = yield call(
        getPokemons,
        paginationData.limit,
        paginationData.offset
      );

      yield put(pokemonActions.requestPokemonsListSuccess(result.data));
    } catch (error) {
      yield put(pokemonActions.requestPokemonsListError(error));
    }
  }
}
