'use client';

import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useState } from 'react';
import type { MultiValue, SingleValue } from 'react-select';
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
  clearPokemonListByType,
  requestPokemonsList,
  setCurrentPageAction,
  setLimitAction,
  setOffsetAction,
  setPokemonNameAction,
  setRandomPokemonTypeAction,
} from '@/redux/actions/pokemon-actions';
import type { NameUrlPair } from '@/types/Pokemon';
import { calculateOffset, calculatePageCount } from '@/utils/math-utils';

function Page() {
  const [pokemonName, setPokemonName] = useState('');

  const [selectedPokemonTypes, setSelectedPokemonTypes] = useState<
    { label: string; value: string }[]
  >([]);

  const [limit, setLimit] = useState<{ label: number; value: number }>(
    perPageCounts[0]
  );

  const [currentPage, setCurrentPage] = useState<number>(0);

  const { pokemonList, pokemonCount, isGetPokemonByName } = useAppSelector(
    (state) => state.pokemonReducer
  );

  const dispatch = useAppDispatch();

  const fetchPokemonsByName = (value: string) => {
    dispatch(setPokemonNameAction(value));
    dispatch(requestPokemonsList());
  };

  const debouncedHandler = useCallback(debounce(fetchPokemonsByName, 500), [
    pokemonName,
  ]);

  useEffect(() => {
    dispatch(requestPokemonsList());
  }, []);

  useEffect(() => {
    debouncedHandler(pokemonName);

    return () => {
      debouncedHandler.cancel();
    };
  }, [pokemonName]);

  const handleTypeSelection = (
    types: MultiValue<{
      label: string;
      value: string;
    }>
  ) => {
    if (!types.length) {
      dispatch(clearPokemonListByType());
    }

    setSelectedPokemonTypes([...types]);
    dispatch(setOffsetAction(0));
    setCurrentPage(0);
    dispatch(setCurrentPageAction(0));
    dispatch(setRandomPokemonTypeAction(types));
    dispatch(requestPokemonsList());
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(event.target.value);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    const calculateOffsetData = {
      limit: limit.value,
      totalCount: pokemonCount,
      currentPage: selectedItem.selected,
    };

    const calculatedOffset = calculateOffset(calculateOffsetData);

    setCurrentPage(selectedItem.selected);

    dispatch(setLimitAction(limit.value));
    dispatch(setOffsetAction(calculatedOffset));
    dispatch(setCurrentPageAction(selectedItem.selected));
    dispatch(requestPokemonsList());
  };

  const handleLimitChange = (
    data: SingleValue<{ label: number; value: number }>
  ) => {
    setLimit((prevState) => {
      return {
        ...prevState,
        label: data?.label as number,
        value: data?.value as number,
      };
    });

    setCurrentPage(0);
    dispatch(setCurrentPageAction(0));
    dispatch(setLimitAction(data?.value));
    dispatch(requestPokemonsList());
  };

  return (
    <>
      <PokemonSearchFilter
        handleSearch={handleSearch}
        searchTerm={pokemonName}
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

      <div
        className={`flex flex-wrap ${
          isGetPokemonByName &&
          pokemonList.length === 1 &&
          'h-96 items-center justify-center'
        }`}
      >
        {pokemonList.map((pokemon: NameUrlPair) => (
          <PokemonCard key={uuidv4()} url={pokemon.url} />
        ))}
      </div>

      <Pagination
        pageCount={calculatePageCount(pokemonCount, limit.value)}
        onPageChange={handlePageChange}
        forcePage={currentPage}
      />
    </>
  );
}

export default Page;
