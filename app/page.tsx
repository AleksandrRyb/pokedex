'use client';

import React from 'react';

import { useGetPokemonListQuery } from '@/redux/services/pokemon-api';

function Page() {
  const { data } = useGetPokemonListQuery(null);

  console.log(data);
  return <div className="text-3xl font-bold underline">Page</div>;
}

export default Page;
