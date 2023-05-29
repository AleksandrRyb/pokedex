import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { call, put, select, take } from 'redux-saga/effects';

import { POKEMON_API_BASE_URL } from '@/constants/services-constants';
import * as pokemonActions from '@/redux/actions/pokemon-actions';

import { getPokemonReducer } from './get-pokemons-saga';

function getPokemonsByType(type: string): Promise<AxiosResponse> {
  return axios.get(`${POKEMON_API_BASE_URL}/type/${type}`);
}

export function* getPokemonsByTypeSaga(): Generator<any, void, any> {
  while (true) {
    try {
      yield take(pokemonActions.setRandomPokemonTypeAction);

      const { filters } = yield select(getPokemonReducer);

      if (!filters.pokemonType) {
        yield put(pokemonActions.requestPokemonsList());
      } else {
        const result = yield call(getPokemonsByType, filters.pokemonType);

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
