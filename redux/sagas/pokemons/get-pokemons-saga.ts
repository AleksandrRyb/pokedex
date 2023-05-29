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

export function getPokemonReducer(state: RootState) {
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

function getPaginatedItems(limit: any, currentPage: any, items: any): any {
  const startIndex = currentPage * limit;
  const endIndex = startIndex + limit;

  return items.slice(startIndex, endIndex);
}

function* returnNeededPokemonByTypeSaga(
  paginationData: any
): Generator<any, void, any> {
  try {
    const { pokemonListByType } = yield select(getPokemonReducer);

    if (pokemonListByType.length) {
      const data = {
        results: getPaginatedItems(
          paginationData.limit,
          paginationData.currentPage,
          pokemonListByType
        ),

        count: pokemonListByType.length,
      };

      yield put(pokemonActions.requestPokemonsListSuccess(data));
    }
  } catch (error) {
    yield put(pokemonActions.requestPokemonsListError(error));
  }
}

function* getPokemonByNameSaga(): any {
  try {
    const { filters } = yield select(getPokemonReducer);

    const data = {
      results: [
        {
          url: `${POKEMON_API_BASE_URL}/pokemon/${filters.pokemonName.toLowerCase()}`,
          name: filters.name,
        },
      ],
      count: 1,
    };

    yield put(pokemonActions.requestPokemonsListSuccess(data));
  } catch (error) {
    yield put(pokemonActions.requestPokemonsListError(error));
  }
}

export function* requestPokemonsRequestSaga(): Generator<any, void, any> {
  while (true) {
    yield take(pokemonActions.requestPokemonsList);

    const { paginationData, isGetPokemonByType, isGetPokemonByName } =
      yield select(getPokemonReducer);

    if (isGetPokemonByName) {
      yield call(getPokemonByNameSaga);

      continue;
    }

    if (isGetPokemonByType) {
      yield call(returnNeededPokemonByTypeSaga, paginationData);

      continue;
    }

    yield call(getPokemonsSaga, paginationData);
  }
}
