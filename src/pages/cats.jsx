import React, { useEffect, useState } from 'react';

import { Badge } from 'components/badge';
import { TextField } from 'components/text-field';
import { useCatsListings, CatItem } from 'domains/cats';

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Return a cleanup function that will be called every time ...
      // ... useEffect is re-called. useEffect will only be re-called ...
      // ... if value changes (see the inputs array below).
      // This is how we prevent debouncedValue from changing if value is ...
      // ... changed within the delay period. Timeout gets cleared and restarted.
      // To put it in context, if the user is typing within our app's ...
      // ... search box, we don't want the debouncedValue to update until ...
      // ... they've stopped typing for more than 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-call effect if value changes
    // You could also add the "delay" var to inputs array if you ...
    // ... need to be able to change that dynamically.
    [value]
  );

  return debouncedValue;
}

const ListItem = ({ isLoading, data, onClick }) => {
  if (isLoading && !data) {
    return <div className="p-3">Loading ...</div>;
  }

  if (!data || (data && data.length === 0)) {
    return <>There is no cats</>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map((singleData) => (
        <CatItem data={singleData} key={singleData.id} onClick={onClick} />
      ))}
    </div>
  );
};

export const CatsPage = () => {
  const { data, isLoading, setTags } = useCatsListings();
  const [keyword, setKeyword] = useState('');
  const [currentSearchTerms, setCurrentSearchTerms] = useState([]);
  const value = useDebounce(keyword);

  const _onChange = ({ target }) => {
    setKeyword(target.value);
  };

  const _onClick = (word) =>
    setCurrentSearchTerms((terms) => {
      return [...terms, word];
    });

  const _removeTerm = (word) =>
    setCurrentSearchTerms((terms) => terms.filter((term) => term !== word));

  useEffect(() => {
    const _values = value ? [...currentSearchTerms, value] : currentSearchTerms;
    setTags(_values.join(','));
  }, [value, currentSearchTerms, setTags]);

  return (
    <div className="p-3">
      <div className="m-4 py-4">
        <TextField value={keyword} onChange={_onChange} placeholder="Search for cats" />
        <div className="my-3">
          {currentSearchTerms.map((singleTerm) => (
            <Badge className="mr-3">
              <span className="px-1">{singleTerm}</span>
              <span className="cursor-pointer" onClick={() => _removeTerm(singleTerm)}>
                X
              </span>
            </Badge>
          ))}
        </div>
      </div>
      <ListItem isLoading={isLoading} data={data} onClick={_onClick} />
    </div>
  );
};