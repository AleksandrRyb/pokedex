'use client';

import React, { useState } from 'react';

import PokemonCard from '@/components/pokemon-card/pokemon-card';
import PokemonSearchFilter from '@/components/pokemon-filter/pokemon-search-filter';
import PokemonSelectFilter from '@/components/pokemon-filter/pokemon-select-filter';
import { useGetPokemonListQuery } from '@/redux/services/pokemon-api';
import type { NameUrlPair } from '@/types/Pokemon';

function Page() {
  const { data: pokemonList, isLoading: isPokemonListLoading } =
    useGetPokemonListQuery(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [selectedTypes, setSelectedTypes] = useState<any[]>([]);

  const handleTypeSelection = (event: React.MouseEvent<HTMLSelectElement>) => {
    const { value } = event.target as HTMLSelectElement;

    setSelectedTypes((prevSelectedTypes) => {
      if (prevSelectedTypes.includes(value)) {
        return prevSelectedTypes.filter((type) => type !== value);
      }

      return [...prevSelectedTypes, value];
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemons = pokemonList?.results.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (isPokemonListLoading) return <div>Loading...</div>;

  return (
    <>
      <PokemonSearchFilter
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <PokemonSelectFilter
        selectedTypes={selectedTypes}
        handleTypeSelection={handleTypeSelection}
      />
      <div className="flex flex-wrap">
        {filteredPokemons?.map((pokemon: NameUrlPair) => (
          <PokemonCard
            key={pokemon.url}
            selectedTypes={selectedTypes}
            url={pokemon.url}
          />
        ))}
      </div>
    </>
  );
}

export default Page;
