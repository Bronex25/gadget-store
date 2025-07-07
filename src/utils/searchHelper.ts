export type SearchParams = {
  [key: string]: string | null;
};

export function updateSearchParams(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams,
): URLSearchParams {
  const newParams = new URLSearchParams(currentParams.toString());

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null || value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
  });

  return newParams;
}
