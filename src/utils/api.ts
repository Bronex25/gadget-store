const BASE_URL = '/api';

// This function is used to emulate a delay for requests.
// It is useful for testing loaders and simulating network latency.
function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export function getItems(url: string) {
  return wait(3000)
    .then(() => fetch(BASE_URL + url))
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    });
}
