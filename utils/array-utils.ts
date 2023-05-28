import type { MultiValue } from 'react-select';

export const getRandomObject = (
  array: MultiValue<{
    label: string;
    value: string;
  }>
) => {
  if (array.length === 1) {
    return array[0].value;
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex].value;
};
