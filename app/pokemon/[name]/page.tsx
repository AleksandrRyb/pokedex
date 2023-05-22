import Image from 'next/image';
import React from 'react';

import type { Pokemon } from '@/types/Pokemon';
import { capitalize } from '@/utils/string-utils';

interface IPokemonPage {
  params: { [key: string]: string };
}

export const generateMetadata = async ({ params }: IPokemonPage) => {
  return {
    title: `${capitalize(params.name)} Info`,
  };
};

const getPokemon = async (name: string): Promise<Pokemon> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (!res.ok) {
    throw new Error('Server error when fetching');
  }

  return res.json();
};

/* @ts-expect-error Async Server Component */
const PokemonPage: React.FC<IPokemonPage> = async ({ params: { name } }) => {
  const pokemon = await getPokemon(name);

  return (
    <div className="container mx-auto min-w-min px-4 py-8">
      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="bg-blue-500 px-4 py-6">
          <h1 className="text-center text-3xl font-bold text-white">
            {capitalize(pokemon.name)} Detail Page
          </h1>
        </div>
        <div className="p-4">
          <div className="flex justify-center">
            <Image
              src={pokemon.sprites.front_default}
              alt="Pokemon Image"
              width={500}
              height={500}
            />
          </div>
          <div className="mt-8 flex flex-col items-center">
            <h2 className="mb-4 text-2xl font-bold">Name: {pokemon.name}</h2>
            <p className="mb-4">
              <span className="font-bold">Height:</span> {pokemon.height}
            </p>
            <p className="mb-4">
              <span className="font-bold">Weight:</span> {pokemon.weight}
            </p>
            <p className="mb-4">
              <span className="font-bold">Base Experience:</span>{' '}
              {pokemon.base_experience}
            </p>
            <h3 className="mb-2 text-xl font-bold">Abilities:</h3>
            <ul className="mb-4 list-inside list-disc">
              {pokemon.abilities.map((item) => (
                <li key={item.ability?.name}>{item.ability?.name}</li>
              ))}
            </ul>
            <h3 className="mb-2 text-xl font-bold">Moves:</h3>
            <ul className="list-inside list-disc">
              {pokemon.moves.map((item) => (
                <li key={item.move.name}>{item.move.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
