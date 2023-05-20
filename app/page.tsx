'use client';

import React, { useState } from 'react';

import PokemonCard from '@/components/pokemon-card/pokemon-card';
import PokemonSearchFilter from '@/components/pokemon-filter/pokemon-search-filter';
import { useGetPokemonListQuery } from '@/redux/services/pokemon-api';
import type { NameUrlPair } from '@/types/Pokemon';

const options = ['water', 'fire', 'grasp'];

function Page() {
  const { data: pokemonList, isLoading: isPokemonListLoading } =
    useGetPokemonListQuery(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [selectedTypes, setSelectedTypes] = useState<any[]>([]);

  const handleTypeSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

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
      <div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="type-select">Select types:</label>
        <select
          id="type-select"
          multiple
          value={selectedTypes}
          className="appearance-none rounded-md bg-yellow-500 px-4 py-3 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          onChange={handleTypeSelection}
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-yellow-500 text-white"
            >
              {option}
            </option>
          ))}
        </select>
      </div>
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
