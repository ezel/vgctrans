import abilityData from "../data/ability.json";
import itemData from "../data/item.json";
import moveData from "../data/move.json";
import natureData from "../data/nature.json";

[abilityData, itemData, moveData].map((item) => {
    if (item.title.length === 12) {
        item.title = item.title.slice(1);
        item.body = item.body.slice(1);
    }
});


function List({ type, query }) {
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
  const filterRes = FilterData(res, query.toLowerCase());
  const hasData = filterRes.length > 0;

  return (
    <div>
      {hasData ? (
        <table class="result">
          <colgroup>
            <col class="index" />
          </colgroup>
          <thead>
            <tr class="res-title-tr">
              {titles.map((t) => (
                <th>{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filterRes.map((col) => (
              <tr class="res-data-tr">
                {col.map((cell) => (
                  <td>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div class="placeholder">No result {type.description}.</div>
      )}
    </div>
  );
}

function FilterData(source, query) {
  if (query === "") {
    return [];
  }
  // get id by query
  let ids = new Set([]);
  source.map((items) => {
    for (let i = 0; i < items.length; i++) {
      items[i].split(" ").some((word) => {
        if (word.toLowerCase().startsWith(query)) {
          ids.add(i);
        }
      })
      if (ids.size > MaxListSize) break;
    }
  });

  let res = [];
  for (let id of ids) {
    if (id !== undefined) {
      let tmp = [];
      source.map((items) => {
        tmp.push(items[id]);
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

const MaxListSize = 20;

export { List, ListTypeEnum };
