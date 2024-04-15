import { List, ListTypeEnum } from './data.js';
import { useState } from 'react';

export default function SearchBox() {
  const [query, setQuery] = useState('');

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <>
      <SearchBar
        query={query}
        onChange={handleChange}
      />
      <List type={ListTypeEnum.MOVE} query={query} />
      <List type={ListTypeEnum.ITEM} query={query} />
      <List type={ListTypeEnum.ABILITY} query={query} />
      <List type={ListTypeEnum.NATURE} query={query} />
    </>
  );
}

function SearchBar({ query, onChange }) {
  return (
    <label>
      Search:{' '}
      <input
        value={query}
        onChange={onChange}
      />
    </label>
  );
}