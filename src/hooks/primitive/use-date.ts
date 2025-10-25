import dayjs from 'dayjs';
import React, {useCallback, useState} from 'react';
import {fPrimaryDate} from '../../utils/format/format-time';

type DateFormatter = (date: Date | string | number) => string;

export type UseDateReturn = {
  value: string;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeValueByDate: (newDate: Date | string | number) => void;
  formatter: DateFormatter;
};

const useDate = (
  defaultValue: Date | string | number | dayjs.Dayjs,
  formatter: DateFormatter | null
): UseDateReturn => {
  const localFormatter = formatter == null ? fPrimaryDate : formatter;

  const [value, setValue] = useState<string>(localFormatter(defaultValue));

  const onChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const onChangeValueByDate = useCallback(
    (newDate: Date | string | number) => {
      setValue(localFormatter(newDate));
    },
    [localFormatter]
  );

  return <UseDateReturn>{
    value,
    onChangeValue,
    onChangeValueByDate,
    formatter: localFormatter,
  };
};

export default useDate;
