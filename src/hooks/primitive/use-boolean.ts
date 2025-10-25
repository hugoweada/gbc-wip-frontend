import React, {useState} from 'react';

export type UseBooleanReturn = {
  value: boolean;
  onTrue: () => void;
  onFalse: () => void;
  onToggle: () => void;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useBoolean(defaultValue: boolean = false): UseBooleanReturn {
  const [value, setValue] = useState<boolean>(defaultValue);

  const onTrue = () => setValue(true);
  const onFalse = () => setValue(false);
  const onToggle = () => setValue((prev) => !prev);

  return {
    value,
    onTrue,
    onFalse,
    onToggle,
    setValue,
  };
}
