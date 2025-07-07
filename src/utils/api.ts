const BASE_URL = 'https://jpsyitavotrjhcgizjau.supabase.co/rest/v1/';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impwc3lpdGF2b3RyamhjZ2l6amF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNjQ3OTgsImV4cCI6MjA2NTc0MDc5OH0.Pm9LQp9V0rYpgwq7qSUWPrmrJpkZTPpjVYBIU_wuUaU';
export type Category = 'phones' | 'tablets' | 'accessories';

export async function fetchFromSupabase(url: string) {
  const response = await fetch(BASE_URL + url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return await response.json();
}

export async function fetchProductDetails(id: string, category: Category) {
  const url = `${category}?id=eq.${id}&select=*`;
  const data = await fetchFromSupabase(url);
  return data;
}
