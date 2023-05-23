'use client';

import React, { useEffect, useState } from 'react';
import type { SingleValue } from 'react-select';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';

import PokemonCard from '@/components/pokemon-card/pokemon-card';
import PokemonSearchFilter from '@/components/pokemon-filter/pokemon-search-filter';
import PokemonSelectFilter from '@/components/pokemon-filter/pokemon-select-filter';
import Pagination from '@/components/pokemon-pagination/pokemon-pagination';
import { AppPages } from '@/constants/pages-constants';
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

  const [selectedPokemonTypes, setSelectedPokemonTypes] = useState<
    { label: string; value: string }[]
  >([]);

  const [offset, setOffset] = useState<number>(0);

  const [limit, setLimit] = useState<{ label: number; value: number }>(
    perPageCounts[0]
  );

  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data: pokemonList, isLoading: isPokemonListLoading } =
    useGetPokemonListQuery({
      limit: limit.value,
      offset,
    });

  const filteredPokemons = pokemonList?.results.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    const pageData = getItemFromSessionStorage<{
      limit: { label: number; value: number };
      offset: number;
      currentPage: number;
    }>(AppPages.POKEMONS_PAGE);
    if (pageData) {
      setLimit(pageData?.limit);
      setOffset(pageData?.offset);
      setCurrentPage(pageData?.currentPage);
    }
  }, []);

  const handleTypeSelection = (types: { value: string; label: string }[]) => {
    // const onlyTypesValues = types.map(
    //   (type: { value: string; label: string }) => type.value
    // );
    setSelectedPokemonTypes([...types]);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    const calculateOffsetData = {
      limit: limit.value,
      totalCount: pokemonList?.count as number,
      currentPage: selectedItem.selected,
    };

    const calculatedOffset = calculateOffset(calculateOffsetData);

    saveItemToSessionStorage(AppPages.POKEMONS_PAGE, {
      limit,
      offset: calculatedOffset,
      currentPage: selectedItem.selected,
    });
    setCurrentPage(selectedItem.selected);
    setOffset(calculatedOffset);
    setSelectedPokemonTypes([]);
  };

  const handleLimitChange = (
    data: SingleValue<{ label: number; value: number }>
  ) => {
    setLimit((prevState) => {
      saveItemToSessionStorage(AppPages.POKEMONS_PAGE, {
        limit: data,
        offset,
        currentPage,
      });

      return {
        ...prevState,
        label: data?.label as number,
        value: data?.value as number,
      };
    });
  };

  if (isPokemonListLoading) return <div>Loading...</div>;

  return (
    <>
      <PokemonSearchFilter
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <PokemonSelectFilter
        value={selectedPokemonTypes}
        handleTypeSelection={handleTypeSelection}
      />
      <Select
        value={limit}
        styles={customStyles}
        options={perPageCounts}
        onChange={handleLimitChange}
        defaultValue={perPageCounts[0]}
        className="mx-4 mt-4"
        placeholder="Show pokemons per page"
      />
      <div className="flex flex-wrap">
        {filteredPokemons?.map((pokemon: NameUrlPair) => (
          <PokemonCard
            key={uuidv4()}
            selectedPokemonTypes={selectedPokemonTypes}
            url={pokemon.url}
          />
        ))}
      </div>

      <Pagination
        pageCount={calculatePageCount(
          pokemonList?.count as number,
          limit.value
        )}
        onPageChange={handlePageChange}
        forcePage={currentPage}
      />
    </>
  );
}

export default Page;
