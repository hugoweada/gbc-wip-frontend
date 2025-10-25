import {useEffect, useRef} from 'react';

const useInit = (callback: () => void) => {
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      callback();
    }
  }, [callback]);
};

export default useInit;
