import { useState } from "react";
import abilityData from "./data/ability.json";
import itemData from "./data/item.json";
import moveData from "./data/move.json";
import natureData from "./data/nature.json";

[abilityData, itemData, moveData].map((item) => {
    if (item.title.length === 12) {
        item.title = item.title.slice(1);
        item.body = item.body.slice(1);
    }
    return item;
});

export default function VTBox() {
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



function List({ type, query, maxResultSize=10, resultHandler }) {
  let data;
  switch (type) {
    case ListTypeEnum.MOVE: {
        data = moveData;
        break;
    }
    case ListTypeEnum.ABILITY: {
        data = abilityData;
        break;
    }
    case ListTypeEnum.ITEM: {
        data = itemData;
        break;
    }
    case ListTypeEnum.NATURE: {
        data = natureData;
        break;
    }
    default: {
        data = {title: [], body: []};
    }
  }
  if (type === ListTypeEnum.MOVE) {
    data = moveData;
  }
  const titles = data.title;
  const res = data.body;
  const filterRes = FilterData(res, query.toLowerCase(), maxResultSize);
  const hasData = filterRes.length > 0;

  return (
    <div>
      {hasData ? (
        <table className="result">
          <colgroup>
            <col className="col-1" />
            <col className="col-2" />
            <col className="col-3" />
            <col className="col-4" />
            <col className="col-5" />
            <col className="col-6" />
            <col className="col-7" />
            <col className="col-8" />
            <col className="col-9" />
            <col className="col-10" />
            <col className="col-11" />
          </colgroup>
          <thead>
            <tr className="res-title-tr">
              {titles.map((t, id) => (
                <th key={id}>{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filterRes.map((col, id) => (
              <tr key={id} className="res-data-tr">
                {col.map((cell, id) => (
                  <td key={id} onClick={resultHandler}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="placeholder">No result in {type.description}.</div>
      )}
    </div>
  );
}

function FilterData(source, query, maxResultSize) {
  if (query === "") {
    return [];
  }
  // get id by query
  let ids = new Set([]);
  source.map((items) => {
    for (let i = 0; i < items.length; i++) {
      items[i].split(' ').some((word) => {
        if (word.toLowerCase().startsWith(query)) {
          ids.add(i);
        }
        return 0;
      })
      if (ids.size >= maxResultSize) break;
    }
    return 0;
  });

  let res = [];
  for (let id of ids) {
    if (id !== undefined) {
      let tmp = [];
      source.map((items) => {
        tmp.push(items[id]);
        return 0;
      });
      res.push(tmp);
    }
  }
  return res;
}

const ListTypeEnum = Object.freeze({
  MOVE: Symbol("move"),
  ABILITY: Symbol("ability"),
  ITEM: Symbol("item"),
  NATURE: Symbol("nature"),
});
