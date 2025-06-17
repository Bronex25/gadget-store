// This function is used to emulate a delay for requests.
// It is useful for testing loaders and simulating network latency.
// function wait(delay: number) {
//   return new Promise(resolve => {
//     setTimeout(resolve, delay);
//   });
// }

const BASE_URL = 'https://jpsyitavotrjhcgizjau.supabase.co/rest/v1/';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impwc3lpdGF2b3RyamhjZ2l6amF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNjQ3OTgsImV4cCI6MjA2NTc0MDc5OH0.Pm9LQp9V0rYpgwq7qSUWPrmrJpkZTPpjVYBIU_wuUaU';

export function getItems(url: string) {
  return fetch(BASE_URL + url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  });
}
