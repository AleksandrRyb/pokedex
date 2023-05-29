export const getRandomObject = (
  array: {
    label: string;
    value: string;
  }[]
) => {
  if (!array.length) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
