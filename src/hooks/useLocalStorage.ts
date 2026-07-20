import { useState, useEffect } from 'react';
import { storage } from '../lib/storage';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return storage.get<T>(key, initialValue);
  });

  useEffect(() => {
    storage.set<T>(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
