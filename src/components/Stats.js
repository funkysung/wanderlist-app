export default function Stats({ numItems, numPackedItems, percentPacked }) {
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
