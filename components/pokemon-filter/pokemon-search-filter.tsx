'use client';

import React, { forwardRef } from 'react';

interface IPokemonSearchFilter {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PokemonSearchFilter = (
  { handleSearch }: IPokemonSearchFilter,
  ref: React.LegacyRef<HTMLInputElement>
) => {
  return (
    <div className="flex items-center justify-center p-4">
      <input
        ref={ref}
        type="text"
        placeholder="Search Pokémon"
        onChange={handleSearch}
        className="mt-4 w-full rounded-md border border-gray-300 px-4 py-2 placeholder:text-black/[0.4] focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>
  );
};
export default forwardRef(PokemonSearchFilter);
