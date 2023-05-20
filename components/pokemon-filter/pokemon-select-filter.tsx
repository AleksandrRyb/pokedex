import React from 'react';

import { useGetPokemonTypesQuery } from '@/redux/services/pokemon-api';
import type { NameUrlPair } from '@/types/Pokemon';

interface IPokemonSelectFilter {
  selectedTypes: string[];
  handleTypeSelection: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PokemonSelectFilter = ({
  selectedTypes,
  handleTypeSelection,
}: IPokemonSelectFilter) => {
  const { data: pokemonTypes, isLoading: isLoadingPokemonTypes } =
    useGetPokemonTypesQuery(null);

  if (isLoadingPokemonTypes) return null;

  return (
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
        {pokemonTypes?.results.map((typeObj: NameUrlPair) => (
          <option
            key={typeObj.name}
            value={typeObj.name}
            className="bg-yellow-500 text-white"
          >
            {typeObj.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PokemonSelectFilter;
