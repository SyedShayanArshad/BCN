import { useState } from 'react';
import AddItem from './AddItem';

export default function List({ list, onAddItem }) {
  const [showAddItem, setShowAddItem] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4">{list.name}</h2>
      
      <button
        onClick={() => setShowAddItem(!showAddItem)}
        className="bg-green-500 text-white p-2 rounded mb-4 hover:bg-green-600"
      >
        {showAddItem ? 'Cancel' : 'Add Item'}
      </button>

      {showAddItem && <AddItem onAddItem={onAddItem} />}

      <div className="space-y-2">
        {list.items.map((item, index) => (
          <div key={index} className="border p-2 rounded">
            <p>Customer: {item.customerName}</p>
            <p>Amount: ${item.amount}</p>
            <p>Date: {item.date}</p>
            {item.comment && <p>Comment: {item.comment}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}