import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { call, put, select, take } from 'redux-saga/effects';

import { POKEMON_API_BASE_URL } from '@/constants/services-constants';
import * as pokemonActions from '@/redux/actions/pokemon-actions';
import { getRandomObject } from '@/utils/array-utils';

import { getPokemonReducer } from './get-pokemons-saga';

function getPokemonsByType(
  types: { label: string; value: string }[]
): Promise<AxiosResponse> {
  const type = getRandomObject(types);

  return axios.get(`${POKEMON_API_BASE_URL}/type/${type?.value}`);
}

export function* getPokemonsByTypeSaga(): Generator<any, void, any> {
  while (true) {
    try {
      yield take([
        pokemonActions.setRandomPokemonTypeAction,
        pokemonActions.clearPokemonListByType,
      ]);

      const { filters } = yield select(getPokemonReducer);

      if (!filters.pokemonTypes.length) {
        yield put(pokemonActions.requestPokemonsList());
      } else {
        const result = yield call(getPokemonsByType, filters.pokemonTypes);

        const pokemonList = result.data.pokemon.map(
          (item: any) => item.pokemon
        );

        yield put(pokemonActions.addPokemonsToPokemonListByType(pokemonList));
        yield put(pokemonActions.requestPokemonsList());
      }
    } catch (error) {
      yield put(pokemonActions.requestPokemonsListError(error));
    }
  }
}
