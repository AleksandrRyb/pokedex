/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';

import type { NameUrlPair } from '../../types/Pokemon';
import * as pokemonActions from '../actions/pokemon-actions';

type PokemonReducer = {
  isPokemonListLoading: boolean;
  error: ReturnType<typeof Error> | null;
  pokemonList: NameUrlPair[] | [];
  pokemonListByType: NameUrlPair[] | [];
  pokemonCount: number;

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
  pokemonList: [],
  pokemonListByType: [],
  pokemonCount: 0,

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

const pokemonReducer = createReducer<PokemonReducer>(
  initialState,
  (builder) => {
    builder
      .addCase(pokemonActions.requestPokemonsList, (state) => {
        state.isPokemonListLoading = true;
      })

      .addCase(pokemonActions.requestPokemonsListSuccess, (state, action) => {
        state.isPokemonListLoading = false;
        state.pokemonList = action.payload.pokemonList;
        state.pokemonCount = action.payload.pokemonCount;
      })

      .addCase(pokemonActions.requestPokemonsListError, (state, action) => {
        state.isPokemonListLoading = false;
        state.error = action.payload.error;
      })

      .addCase(pokemonActions.setCurrentPageAction, (state, action) => {
        state.paginationData.currentPage = action.payload.currentPage;
      })

      .addCase(pokemonActions.setOffsetAction, (state, action) => {
        state.paginationData.offset = action.payload.offset;
      })

      .addCase(pokemonActions.setLimitAction, (state, action) => {
        state.paginationData.limit = action.payload.limit;
      })

      .addCase(pokemonActions.setRandomPokemonTypeAction, (state, action) => {
        state.filters.pokemonType = action.payload.type;
        state.isGetPokemonByType = action.payload.isGetPokemonByType;
      })

      .addCase(pokemonActions.clearPokemonListByType, (state, action) => {
        state.filters.pokemonType = action.payload.pokemonType;
        state.pokemonListByType = action.payload.pokemonListByType;
      })

      .addCase(pokemonActions.setPokemonNameAction, (state, action) => {
        state.filters.pokemonName = action.payload.name;
        state.isGetPokemonByName = action.payload.isGetPokemonByName;
      })

      .addCase(
        pokemonActions.addPokemonsToPokemonListByType,
        (state, action) => {
          state.pokemonListByType = action.payload.pokemonListByType;
        }
      );
  }
);

export default pokemonReducer;
