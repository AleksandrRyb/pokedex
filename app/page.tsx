'use client';

import React from 'react';

import PokemonCard from '@/components/pokemon-card';
import { useGetPokemonListQuery } from '@/redux/services/pokemon-api';

function Page() {
  const { data: pokemonList, isLoading: isPokemonListLoading } =
    useGetPokemonListQuery(null);

  if (isPokemonListLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap">
      {pokemonList.results.map((pokemon: any) => (
        <PokemonCard key={pokemon.url} url={pokemon.url} />
      ))}
    </div>
  );
}

export default Page;
