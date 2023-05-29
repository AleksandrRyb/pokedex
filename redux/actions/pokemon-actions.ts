import { createAction } from '@reduxjs/toolkit';
import type { MultiValue } from 'react-select';

import type { NameUrlPair } from '@/types/Pokemon';
import { getRandomObject } from '@/utils/array-utils';

export const requestPokemonsList = createAction('pokemons/requestPokemonsList');

export const requestPokemonsListSuccess = createAction(
  'pokemons/requestPokemonsListSuccess',
  (data: { results: NameUrlPair[]; count: number }) => {
    return {
      payload: {
        pokemonList: data.results,
        pokemonCount: data.count,
      },
    };
  }
);

export const requestPokemonsListError = createAction(
  'pokemons/requestPokemonsListError',
  (error) => {
    return {
      payload: {
        error,
      },
    };
  }
);

export const setOffsetAction = createAction(
  'pokemons/offsetAction',
  (offset) => {
    return {
      payload: {
        offset,
      },
    };
  }
);

export const setLimitAction = createAction(
  'pokemons/setLimitAction',
  (limit) => {
    return {
      payload: {
        limit,
      },
    };
  }
);

export const setCurrentPageAction = createAction(
  'pokemons/setCurrentPageAction',
  (currentPage) => {
    return {
      payload: {
        currentPage,
      },
    };
  }
);

export const setRandomPokemonTypeAction = createAction(
  'pokemons/setRandomPokemonTypeAction',
  (
    types: MultiValue<{
      label: string;
      value: string;
    }>
  ) => {
    const type = getRandomObject(types);

    return {
      payload: {
        type,
        isGetPokemonByType: Boolean(type),
      },
    };
  }
);

export const addPokemonsToPokemonListByType = createAction(
  'pokemons/addPokemonsToPokemonListByType',
  (pokemonList: NameUrlPair[]) => {
    return {
      payload: {
        pokemonListByType: pokemonList,
      },
    };
  }
);

export const setPokemonNameAction = createAction(
  'pokemons/setPokemonNameAction',
  (name: string) => {
    return {
      payload: {
        name,
        isGetPokemonByName: Boolean(name.length),
      },
    };
  }
);
