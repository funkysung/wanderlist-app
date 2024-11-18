import { useState } from "react";

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

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats
        numItems={numItems}
        numPackedItems={numPackedItems}
        percentPacked={percentPacked}
      />
    </div>
  );
}

function Logo() {
  return <h1>🌴Wanderlist✈️</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    //if empty input- reject
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);

    //reset back to default
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Add your item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ numItems, numPackedItems, percentPacked }) {
  if (numItems === 0) {
    return (
      <footer className="stats">
        <em> Let's start packing! Add some items to your list </em>
      </footer>
    );
  }

  return (
    <footer className="stats">
      <em>
        {percentPacked === 100
          ? `Great job! You got everything 🤩`
          : `You have ${numItems} items on your list, and you have packed ${numPackedItems} (${percentPacked}%)`}
      </em>
    </footer>
  );
}
