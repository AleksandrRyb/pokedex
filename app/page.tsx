'use client';

import React, { useState } from 'react';
import type { SingleValue } from 'react-select';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';

import PokemonCard from '@/components/pokemon-card/pokemon-card';
import PokemonSearchFilter from '@/components/pokemon-filter/pokemon-search-filter';
import PokemonSelectFilter from '@/components/pokemon-filter/pokemon-select-filter';
import Pagination from '@/components/pokemon-pagination/pokemon-pagination';
import {
  customStyles,
  perPageCounts,
} from '@/constants/ui-libriries-constants';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import {
  setCurrentPageAction,
  setLimitAction,
  setOffsetAction,
} from '@/redux/actions/pokemon-actions';
import type { NameUrlPair } from '@/types/Pokemon';
import { calculateOffset, calculatePageCount } from '@/utils/math-utils';

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

  const { pokemonList, isPokemonListLoading } = useAppSelector(
    (state) => state.pokemonReducer
  );

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(requestPokemonsList());
  // }, []);

  const handleTypeSelection = (types: { value: string; label: string }[]) => {
    setSelectedPokemonTypes([...types]);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    const calculateOffsetData = {
      limit: limit.value,
      totalCount: pokemonList?.length,
      currentPage: selectedItem.selected,
    };

    const calculatedOffset = calculateOffset(calculateOffsetData);

    setCurrentPage(selectedItem.selected);
    setOffset(calculatedOffset);

    dispatch(setLimitAction(limit.value));
    dispatch(setOffsetAction(calculatedOffset));
    dispatch(setCurrentPageAction(selectedItem.selected));
  };

  const handleLimitChange = (
    data: SingleValue<{ label: number; value: number }>
  ) => {
    dispatch(setLimitAction(data?.value));

    setLimit((prevState) => {
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
        {pokemonList.map((pokemon: NameUrlPair) => (
          <PokemonCard key={uuidv4()} url={pokemon.url} />
        ))}
      </div>

      <Pagination
        pageCount={calculatePageCount(pokemonList.length, limit.value)}
        onPageChange={handlePageChange}
        forcePage={currentPage}
      />
    </>
  );
}

export default Page;
