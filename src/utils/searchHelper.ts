export type SearchParams = {
  [key: string]: string | null;
};

export function updateSearchParams(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams,
): URLSearchParams {
  const newParams = new URLSearchParams(currentParams.toString());

  // Here is the example of paramsToUpdate
  // {
  //   sex: 'm',                ['sex', 'm']
  //   order: null,             ['order', null]
  //   centuries: ['16', '19'], ['centuries', ['16', '19']]
  // }
  //
  // - params with the `null` value are deleted;
  // - string value is set to given param key;
  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null || value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
  });

  return newParams;
}
