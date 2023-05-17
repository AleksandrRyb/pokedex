import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<any, null>({
      query: () => '',
    }),
    getPokemon: builder.query<any, string>({
      queryFn: async (_arg, _queryApi, _extraOptions, fetchWithBQ) => {
        // eslint-disable-next-line no-promise-executor-return
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const result = await fetchWithBQ(_arg);

        return result.data
          ? { data: result.data as any }
          : { error: result.error as FetchBaseQueryError };
      },
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonQuery } = pokemonApi;
