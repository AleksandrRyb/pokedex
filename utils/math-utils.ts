type CalculateOffset = {
  limit: number;
  currentPage: number;
  totalCount: number;
};

export const calculatePageCount = (
  totalItems: number,
  itemsPerPage: number
): number => {
  return Math.ceil(totalItems / itemsPerPage);
};

export const calculateOffset = ({
  limit,
  currentPage,
  totalCount,
}: CalculateOffset): number => {
  const isOffsetNotBiggerOrEqualThenTotal = limit * currentPage >= totalCount;

  if (isOffsetNotBiggerOrEqualThenTotal) {
    const offsetAllItemsWithoutCurrentLimit =
      totalCount - (limit * currentPage - limit);

    return offsetAllItemsWithoutCurrentLimit;
  }

  const offset = limit * currentPage;
  return offset;
};
