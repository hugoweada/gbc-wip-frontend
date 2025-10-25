import {useCallback, useState} from 'react';

export type UseArrayReturn<T> = {
  value: T[];
  isEmpty: boolean;
  onChangeValue: (newValue: T[] | null | undefined) => void;
  onAppendElement: (newValue: T) => void;
  onModifyElement: (index: number, newValue: T) => void;
  onRemoveElement: (index: number) => void;
  onClear: () => void;
};

const useArray = <T>(initialArray: T[] = []): UseArrayReturn<T> => {
  const [value, setValue] = useState<T[]>(initialArray);

  const isEmpty = value.length === 0;

  const onChangeValue = (newValue: T[] | null | undefined) => {
    setValue(newValue ?? []);
  };

  const onAppendElement = useCallback(
    (newValue: T) => {
      onChangeValue([...value, newValue]);
    },
    [value]
  );

  const onModifyElement = useCallback(
    (index: number, newValue: T) => {
      if (index >= 0 && index < value.length) {
        const newArray = [...value];
        newArray[index] = newValue;
        setValue(newArray);
      } else {
        console.warn(`Cannot modify element by invalid index: {index}, range=[0,{length}]`, {
          index,
          length: value.length,
        });
      }
    },
    [value]
  );

  const onRemoveElement = useCallback(
    (index: number) => {
      if (index >= 0 && index < value.length) {
        const newArray = value.filter((_, i) => i !== index);
        setValue(newArray);
      } else {
        console.warn(`Cannot remove element by invalid index: {index}, range=[0,{length}]`, {
          index,
          length: value.length,
        });
      }
    },
    [value]
  );

  const onClear = () => onChangeValue([]);

  return {
    value,
    isEmpty,
    onChangeValue,
    onAppendElement,
    onModifyElement,
    onRemoveElement,
    onClear,
  };
};

export default useArray;
