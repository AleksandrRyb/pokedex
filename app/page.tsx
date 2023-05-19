'use client';

import React, { useState } from 'react';

import PokemonCard from '@/components/pokemon-card';
import { useGetPokemonListQuery } from '@/redux/services/pokemon-api';
import type { NameUrlPair } from '@/types/Pokemon';

function Page() {
  const { data: pokemonList, isLoading: isPokemonListLoading } =
    useGetPokemonListQuery(null);

  const [searchTerm, setSearchTerm] = useState('');

  // Handler for updating the search term
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter the Pokémon based on the search term
  const filteredPokemons = pokemonList?.results.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (isPokemonListLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex items-center justify-center p-4">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={handleSearch}
          className="mt-4 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>
      <div className="flex flex-wrap">
        {filteredPokemons?.map((pokemon: NameUrlPair) => (
          <PokemonCard key={pokemon.url} url={pokemon.url} />
        ))}
      </div>
    </>
  );
}

export default Page;
