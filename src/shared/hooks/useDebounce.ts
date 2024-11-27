import { useEffect, useState } from 'react';

function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return (): void => {
      clearTimeout(t);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
