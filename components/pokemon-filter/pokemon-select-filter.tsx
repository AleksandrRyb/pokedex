import React from 'react';

interface IPokemonSelectFilter {
  selectedTypes: string[];
  handleTypeSelection: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const options = ['water', 'fire', 'grass'];

const PokemonSelectFilter = ({
  selectedTypes,
  handleTypeSelection,
}: IPokemonSelectFilter) => {
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
  );
};

export default PokemonSelectFilter;
