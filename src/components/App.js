import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./Packinglist";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);
  const numItems = items.length;
  const numPackedItems = items.reduce(
    (acc, cur) => (cur.packed ? acc + 1 : acc),
    0
  );
  const percentPacked =
    numItems === 0 ? 0 : Math.round((numPackedItems / numItems) * 100);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClear() {
    const confirmedClear = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmedClear) {
      setItems([]);
      console.log("clear");
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClear={handleClear}
      />
      <Stats
        numItems={numItems}
        numPackedItems={numPackedItems}
        percentPacked={percentPacked}
      />
    </div>
  );
}
