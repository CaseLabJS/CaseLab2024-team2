import { useState } from 'react';

type TSearch = {
  querySearch: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const useSearch = (): TSearch => {
  const [querySearch, setQuerySearch] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuerySearch(event.target.value);
  };

  return { querySearch, handleSearchChange };
};

export default useSearch;
