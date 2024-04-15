import { List, ListTypeEnum } from "./data.js";
import { useState } from "react";

export default function SearchBox() {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <>
      <SearchBar query={query} onChange={handleChange} />
      <List
        type={ListTypeEnum.MOVE}
        query={query}
        resultHandler={handleClick}
      />
      <List
        type={ListTypeEnum.ITEM}
        query={query}
        resultHandler={handleClick}
      />
      <List
        type={ListTypeEnum.ABILITY}
        query={query}
        resultHandler={handleClick}
      />
      <List
        type={ListTypeEnum.NATURE}
        query={query}
        resultHandler={handleClick}
      />
    </>
  );
}

function SearchBar({ query, onChange }) {
  return (
    <div className="bar">
      <label>
        Search: <input value={query} onChange={onChange} />
      </label>
    </div>
  );
}

function handleClick(e) {
  let text = e.target.innerText;
  navigator.clipboard.writeText(text).catch(function (err) {
    alert("cannot do the copy in this browser");
  });
}
