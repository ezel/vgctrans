import { List, ListTypeEnum } from "./data.jsx";
import { useState } from "react";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState("");

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleClick(e) {
    let text = e.target.innerText;
    navigator.clipboard
      .writeText(text)
      .then((e) => {
        setMessages(text);
      })
      .catch(function (err) {
        alert("cannot do the copy in this browser");
      });
  }

  return (
    <>
      <SearchBar query={query} onChange={handleChange} />
      {messages.length > 0 ? (<p><span className="flash-span-msg">{messages}</span> copied.</p>) : (<p>Click a result to copy.</p>)}
      
      <List
        type={ListTypeEnum.MOVE}
        query={query}
        maxResultSize={20}
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
    <div className="searchbar">
      <label>
        Search: <input value={query} onChange={onChange} />
      </label>
    </div>
  );
}
