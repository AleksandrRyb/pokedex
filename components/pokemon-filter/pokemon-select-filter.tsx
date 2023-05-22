import React from 'react';
import Select from 'react-select';

import { useGetPokemonTypesQuery } from '@/redux/services/pokemon-api';
import type { NameUrlPair } from '@/types/Pokemon';

interface IPokemonSelectFilter {
  handleTypeSelection: any;
}

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: '2px 0 2px 4px',
    borderWidth: '1px',
    borderRadius: '0.375rem',
    borderColor: state.isFocused ? 'none' : 'rgb(209, 213, 219)',
    boxShadow: state.isFocused
      ? '0px 0px 0px 3px rgba(234, 179, 8, 1)'
      : 'none',
    '&:hover': {
      borderColor: 'none',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'gray-200' : 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: 'rgba(234, 179, 8, 0.6)',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'rgba(0,0,0, 0.4)', // Change the color to your desired value
  }),
};

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
