import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { POKEMON_API_BASE_URL } from '@/constants/services-constants';
import type { NameUrlPair, Pokemon } from '@/types/Pokemon';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: POKEMON_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<
      { results: NameUrlPair[]; count: number },
      { limit: number; offset: number }
    >({
      query: ({ limit, offset }) => `/pokemon/?limit=${limit}&offset=${offset}`,
    }),
    getPokemon: builder.query<Pokemon, string>({
      queryFn: async (_arg, _queryApi, _extraOptions, fetchWithBQ) => {
        // eslint-disable-next-line no-promise-executor-return
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const result = await fetchWithBQ(_arg);

        return result.data
          ? { data: result.data as Pokemon }
          : { error: result.error as FetchBaseQueryError };
      },
    }),
    getPokemonTypes: builder.query<{ results: NameUrlPair[] }, null>({
      query: () => '/type',
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonQuery,
  useGetPokemonTypesQuery,
} = pokemonApi;
