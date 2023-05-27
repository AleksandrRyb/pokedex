/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';

import * as pokemonActions from '../actions/pokemon-actions';

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

export const pokemonReducer = createReducer(initialState, (builder) => {
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
});
