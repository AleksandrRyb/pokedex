'use client';

import Link from 'next/link';
import React from 'react';

import { useGetPokemonQuery } from '@/redux/services/pokemon-api';

import PokemonCardLoader from './pokemon-card-loader';

interface IPokemonCard {
  url: string;
}

const PokemonCard = ({ url }: IPokemonCard) => {
  const {
    data: pokemon,
    isLoading: isPokemonLoading,
    isError,
  } = useGetPokemonQuery(url);

  if (isError) return <div>Pokemon loading error</div>;

  if (isPokemonLoading) return <PokemonCardLoader />;

  return (
    <Link
      href={`pokemon/${pokemon?.name}`}
      className="w-full p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
    >
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <div className="flex w-full justify-center">
          {' '}
          <img
            src={pokemon?.sprites.front_default as string}
            alt="Pokemon Avatar"
            width={100}
            height={100}
            className="h-48 w-48"
          />
        </div>

        <div className="p-4">
          <h3 className="mb-2 text-xl font-semibold">{pokemon?.name}</h3>

          <div className="mb-4 flex space-x-2">
            <span className="rounded-full bg-yellow-500 px-2 py-1 text-white">
              {pokemon?.types[0].type.name}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-600">HP:</div>
            <div className="text-sm">{pokemon?.stats[0].base_stat}</div>

            <div className="text-sm text-gray-600">Attack:</div>
            <div className="text-sm">{pokemon?.stats[1].base_stat}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(PokemonCard);
