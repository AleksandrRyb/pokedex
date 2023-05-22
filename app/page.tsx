'use client';

import React, { useState } from 'react';

import Pagination from '@/components/pagination/pagination';
import PokemonCard from '@/components/pokemon-card/pokemon-card';
import PokemonSearchFilter from '@/components/pokemon-filter/pokemon-search-filter';
import PokemonSelectFilter from '@/components/pokemon-filter/pokemon-select-filter';
import { useGetPokemonListQuery } from '@/redux/services/pokemon-api';
import type { NameUrlPair } from '@/types/Pokemon';

function Page() {
  const { data: pokemonList, isLoading: isPokemonListLoading } =
    useGetPokemonListQuery(null);
  console.log(pokemonList);

  const [searchTerm, setSearchTerm] = useState('');

  const [selectedPokemonTypes, setSelectedPokemonTypes] = useState<any[]>([]);

  const handleTypeSelection = (types: any) => {
    const onlyTypesValues = types.map((type: any) => type.value);
    setSelectedPokemonTypes([...onlyTypesValues]);
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
      <PokemonSelectFilter handleTypeSelection={handleTypeSelection} />
      <div className="flex flex-wrap">
        {filteredPokemons?.map((pokemon: NameUrlPair) => (
          <PokemonCard
            key={pokemon.url}
            selectedPokemonTypes={selectedPokemonTypes}
            url={pokemon.url}
          />
        ))}
      </div>
      {/* <Pagination /> */}
    </>
  );
}

export default Page;
