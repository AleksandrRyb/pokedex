import React from 'react';
import Select from 'react-select';

import { customStyles } from '@/constants/react-select-constants';
import { useGetPokemonTypesQuery } from '@/redux/services/pokemon-api';
import type { NameUrlPair } from '@/types/Pokemon';

interface IPokemonSelectFilter {
  handleTypeSelection: any;
}

const PokemonSelectFilter = ({ handleTypeSelection }: IPokemonSelectFilter) => {
  const { data: pokemonTypes, isLoading: isLoadingPokemonTypes } =
    useGetPokemonTypesQuery(null);

  if (isLoadingPokemonTypes) return null;

  return (
    <div>
      <Select
        styles={customStyles}
        className="mx-4"
        onChange={handleTypeSelection}
        isMulti
        placeholder="Select Pokemon Type"
        options={pokemonTypes?.results.map((typeObj: NameUrlPair) => {
          return { value: typeObj.name, label: typeObj.name };
        })}
      />
    </div>
  );
};

export default PokemonSelectFilter;
