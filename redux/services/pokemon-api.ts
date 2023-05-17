import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<any, null>({
      query: () => 'clefairy',
    }),
    getPokemon: builder.query<any, string>({
      query: (url) => url,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonQuery } = pokemonApi;
