import {useState} from 'react';

export type UseObjectReturn<T> = {
  value: T | null;
  isEmpty: boolean;
  onChangeValue: (newObj: T | null) => void;
};

const useObject = <T extends object>(obj: T | null): UseObjectReturn<T> => {
  const [value, setValue] = useState<T | null>(obj);

  const onChangeValue = (newObj: T | null) => {
    setValue(newObj);
  };

  return {
    value,
    isEmpty: value == null,
    onChangeValue,
  };
};

export default useObject;
