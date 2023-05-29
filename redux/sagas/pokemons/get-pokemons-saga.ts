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

function getPokemonsByType(type: string): Promise<AxiosResponse> {
  return axios.get(`${POKEMON_API_BASE_URL}/type/${type}`);
}

function getPokemonReducer(state: RootState) {
  return state.pokemonReducer;
}

function* getPokemonsSaga(paginationData: any): Generator<any, void, any> {
  try {
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

function* getPokemonsByTypeSaga(
  paginationData: any
): Generator<any, void, any> {
  try {
    const { filters } = yield select(getPokemonReducer);

    const result = yield call(getPokemonsByType, filters.pokemonType);
    const pokemonList = result.data.pokemon.map((item) => item.pokemon);

    const data = { results: pokemonList, count: pokemonList.length };
    console.log('🚀 ~ file: get-pokemons-saga.ts:45 ~ result:', data);

    yield put(pokemonActions.requestPokemonsListSuccess(data));
  } catch (error) {
    yield put(pokemonActions.requestPokemonsListError(error));
  }
}

export function* getPokemonsRequestSaga(): Generator<any, void, any> {
  while (true) {
    yield take(pokemonActions.requestPokemonsList);

    const { paginationData, isGetPokemonByType, isGetPokemonByName } =
      yield select(getPokemonReducer);

    if (isGetPokemonByName) {
      // TODO: add logic
    }

    if (isGetPokemonByType) {
      yield call(getPokemonsByTypeSaga, paginationData);

      // eslint-disable-next-line no-continue
      continue;
    }

    yield call(getPokemonsSaga, paginationData);
  }
}