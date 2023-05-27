/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';

import type { NameUrlPair } from '../../types/Pokemon';
import * as pokemonActions from '../actions/pokemon-actions';

type PokemonReducer = {
  isPokemonListLoading: boolean;
  error: ReturnType<typeof Error> | null;
  list: NameUrlPair[] | [];

  isPaginateByLocalData: boolean;

  isGetPokemonByName: boolean;
  isGetPokemonByType: boolean;

  filters: {
    pokemonName: string;
    pokemonType: string | null;
  };

  paginationData: {
    offset: number;
    limit: number;
    currentPage: number;
  };
};

const initialState = {
  isPokemonListLoading: false,
  error: null,
  list: [],

  isPaginateByLocalData: false,

  isGetPokemonByName: false,
  isGetPokemonByType: false,

  filters: {
    pokemonName: '',
    pokemonType: null,
  },

  paginationData: {
    offset: 0,
    limit: 10,
    currentPage: 0,
  },
};

export const pokemonReducer = createReducer<PokemonReducer>(
  initialState,
  (builder) => {
    builder
      .addCase(pokemonActions.requestPokemonsList, (state) => {
        state.isPokemonListLoading = true;
      })
      .addCase(pokemonActions.requestPokemonsListSuccess, (state, action) => {
        state.isPokemonListLoading = false;
        state.list = action.payload.list;
      })
      .addCase(pokemonActions.requestPokemonsListError, (state, action) => {
        state.isPokemonListLoading = false;
        state.error = action.payload.error;
      });
  }
);
