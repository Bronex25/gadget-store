export function loadFromStorage<T>(key: string): T[] {
  try {
    const saved = localStorage.getItem(key);
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(`Failed to load ${key} from localStorage`, error);
    return [];
  }
}
