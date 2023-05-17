import React from 'react';

const PokemonCardLoader = () => (
  <div className="w-full p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
    <div className="animate-pulse overflow-hidden rounded-lg bg-gray-200">
      <div className="h-40 bg-gray-300" />

      <div className="p-4">
        <div className="mb-2 h-6 bg-gray-300" />

        <div className="mb-4 flex space-x-2">
          <div className="h-4 w-1/3 bg-gray-300" />
          <div className="h-4 w-1/3 bg-gray-300" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm text-gray-600">HP:</div>
          <div className="bg-gray-300 text-sm" />

          <div className="text-sm text-gray-600">Attack:</div>
          <div className="bg-gray-300 text-sm" />
        </div>
      </div>
    </div>
  </div>
);

export default PokemonCardLoader;
