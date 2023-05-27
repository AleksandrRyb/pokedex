import { createAction } from '@reduxjs/toolkit';

import type { NameUrlPair } from '@/types/Pokemon';

export const requestPokemonsList = createAction('pokemons/requestPokemonsList');
export const requestPokemonsListSuccess = createAction(
  'pokemons/requestPokemonsListSuccess',
  (list: NameUrlPair[]) => {
    return {
      payload: {
        list,
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
