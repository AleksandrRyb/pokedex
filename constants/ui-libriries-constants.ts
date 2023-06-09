import type { CSSObjectWithLabel } from 'react-select';

export const customStyles = {
  control: (base: CSSObjectWithLabel, props: any) => ({
    ...base,
    padding: '2px 0 2px 4px',
    borderWidth: '1px',
    borderRadius: '0.375rem',
    borderColor: props.isFocused ? 'none' : 'rgb(209, 213, 219)',
    boxShadow: props.isFocused
      ? '0px 0px 0px 3px rgba(234, 179, 8, 1)'
      : 'none',
    '&:hover': {
      borderColor: 'none',
    },
  }),
  option: (base: CSSObjectWithLabel, props: any) => ({
    ...base,
    backgroundColor: props.isFocused ? 'gray-200' : 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: 'rgba(234, 179, 8, 0.6)',
    },
  }),
  placeholder: (base: CSSObjectWithLabel) => ({
    ...base,
    color: 'rgba(0,0,0, 0.4)', // Change the color to your desired value
  }),
};

export const perPageCounts = [
  { label: 10, value: 10 },
  { label: 20, value: 20 },
  { label: 50, value: 50 },
];
