import React from 'react';
import type { MultiValue, SingleValue } from 'react-select';
import Select from 'react-select';

import { customStyles } from '@/constants/ui-libriries-constants';
import { useGetPokemonTypesQuery } from '@/redux/services/pokemon-api';
import type { NameUrlPair } from '@/types/Pokemon';

interface IPokemonSelectFilter {
  handleTypeSelection: (
    newValue: MultiValue<{
      label: string;
      value: string;
    }>
  ) => void;
  value:
    | SingleValue<{ label: string; value: string }>
    | MultiValue<{ label: string; value: string }>;
}

const PokemonSelectFilter = ({
  handleTypeSelection,
  value,
}: IPokemonSelectFilter) => {
  const { data: pokemonTypes } = useGetPokemonTypesQuery(null);

  return (
    <div>
      <Select
        styles={customStyles}
        value={value}
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
