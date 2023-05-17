'use client';

import React from 'react';

import { useGetPokemonListQuery } from '@/redux/services/pokemon-api';

function Page() {
  const { data: pokemonList, isLoading: isPokemonListLoading } =
    useGetPokemonListQuery(null);

  if (isPokemonListLoading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center">
      {pokemonList.results.map((pokemon: any) => (
        <div className="" key={pokemon.name}>
          {pokemon?.name}
        </div>
      ))}
    </div>
  );
}

export default Page;
