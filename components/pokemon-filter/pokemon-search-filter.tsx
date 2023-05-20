'use client';

import React from 'react';

interface IPokemonSearchFilter {
  searchTerm: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PokemonSearchFilter = ({
  searchTerm,
  handleSearch,
}: IPokemonSearchFilter) => {
  return (
    <div className="flex items-center justify-center p-4">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={handleSearch}
        className="mt-4 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>
  );
};

export default PokemonSearchFilter;
