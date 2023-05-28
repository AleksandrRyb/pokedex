import { createAction } from '@reduxjs/toolkit';

import type { NameUrlPair } from '@/types/Pokemon';

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
