'use client';

import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import PokemonCard from '@/components/pokemon-card/pokemon-card';
import PokemonSearchFilter from '@/components/pokemon-filter/pokemon-search-filter';
import PokemonSelectFilter from '@/components/pokemon-filter/pokemon-select-filter';
import Pagination from '@/components/pokemon-pagination/pokemon-pagination';
import {
  customStyles,
  perPageCounts,
} from '@/constants/ui-libriries-constants';
import { useGetPokemonListQuery } from '@/redux/services/pokemon-api';
import type { NameUrlPair } from '@/types/Pokemon';
import { calculateOffset, calculatePageCount } from '@/utils/math-utils';
import {
  getItemFromSessionStorage,
  saveItemToSessionStorage,
} from '@/utils/storage-utils';

function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemonTypes, setSelectedPokemonTypes] = useState<string[]>(
    []
  );
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(perPageCounts[0].value);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { data: pokemonList, isLoading: isPokemonListLoading } =
    useGetPokemonListQuery({
      limit,
      offset,
    });

  const filteredPokemons = pokemonList?.results.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    const pageData = getItemFromSessionStorage<{
      limit: number;
      offset: number;
      currentPage: number;
    }>('pokemonsPage');
    if (pageData) {
      setLimit(pageData?.limit);
      setOffset(pageData?.offset);
      setCurrentPage(pageData?.currentPage);
    }
  }, []);

  const handleTypeSelection = (types: { value: string; label: string }[]) => {
    const onlyTypesValues = types.map(
      (type: { value: string; label: string }) => type.value
    );
    setSelectedPokemonTypes([...onlyTypesValues]);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    const calculateOffsetData = {
      limit,
      totalCount: pokemonList?.count as number,
      currentPage: selectedItem.selected,
    };

    const calculatedOffset = calculateOffset(calculateOffsetData);

    saveItemToSessionStorage('pokemonsPage', {
      limit,
      offset: calculatedOffset,
      currentPage: selectedItem.selected,
    });
    setCurrentPage(selectedItem.selected);
    setOffset(calculatedOffset);
  };

  if (isPokemonListLoading) return <div>Loading...</div>;

  return (
    <>
      <PokemonSearchFilter
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <PokemonSelectFilter handleTypeSelection={handleTypeSelection} />
      <Select
        styles={customStyles}
        options={perPageCounts}
        onChange={(data) => setLimit(data?.value as number)}
        defaultValue={perPageCounts[0]}
        className="mx-4 mt-4"
        placeholder="Show pokemons per page"
      />
      <div className="flex flex-wrap">
        {filteredPokemons?.map((pokemon: NameUrlPair) => (
          <PokemonCard
            key={pokemon.url}
            selectedPokemonTypes={selectedPokemonTypes}
            url={pokemon.url}
          />
        ))}
      </div>

      <Pagination
        pageCount={calculatePageCount(pokemonList?.count as number, limit)}
        onPageChange={handlePageChange}
        forcePage={currentPage}
      />
    </>
  );
}

export default Page;
