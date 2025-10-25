import {useState} from 'react';

export interface UseToggleSetReturn<T> {
  value: Set<T>;
  setValues: (items: T[]) => void;
  hasItem: (item: T) => boolean;
  addItem: (item: T) => void;
  removeItem: (item: T) => void;
  toggleItem: (item: T) => void;
}

function useToggleSet<T>(initialValues: T[] = []): UseToggleSetReturn<T> {
  const [set, setSet] = useState<Set<T>>(new Set(initialValues));

  const setValues = (items: T[]) => {
    setSet(new Set(items));
  };

  const hasItem = (item: T): boolean => set.has(item);

  const addItem = (item: T): void => {
    setSet((prevSet) => new Set(prevSet).add(item));
  };

  const removeItem = (item: T): void => {
    setSet((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.delete(item);
      return newSet;
    });
  };

  const toggleItem = (item: T): void => {
    setSet((prevSet) => {
      const newSet = new Set(prevSet);
      if (newSet.has(item)) {
        newSet.delete(item);
      } else {
        newSet.add(item);
      }
      return newSet;
    });
  };

  return {value: set, setValues, hasItem, addItem, removeItem, toggleItem};
}

export default useToggleSet;
