import React, { useState } from "react";
import InvoiceDocument from "./InvoiceDocument";

const TableForm = () => {
  const [items, setItems] = useState([
    { description: "", quantity: "", price: "", note: "" },
  ]);

  const handleChange = (index, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems(values);
  };

  const addRow = () => {
    setItems([...items, { description: "", quantity: "", price: "", note: ""}]);
  };

  const removeRow = (index) => {
    const values = [...items];
    values.splice(index, 1);
    setItems(values);
  };

  return (
    <>
    <div className="container mx-auto mb-6">
      <div className="bg-white shadow-md p-6">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-1">Description</th>
              <th className="border border-gray-300 p-1">Quantity</th>
              <th className="border border-gray-300 p-1">Price</th>
              <th className="border border-gray-300 p-1">Note</th>
              <th className="border border-gray-300 p-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-1">
                  <input
                    type="text"
                    name="description"
                    value={item.description}
                    onChange={(event) => handleChange(index, event)}
                    className="w-full p-1 border border-gray-300"
                    required
                  />
                </td>
                <td className="border border-gray-300 p-1">
                  <input
                    type="number"
                    step={0.01}
                    name="quantity"
                    value={item.quantity}
                    onChange={(event) => handleChange(index, event)}
                    className="w-full p-1 border border-gray-300"
                    required
                  />
                </td>
                <td className="border border-gray-300 p-1">
                  <input
                    type="number"
                    step={0.01}
                    name="price"
                    value={item.price}
                    onChange={(event) => handleChange(index, event)}
                    className="w-full p-1 border border-gray-300"
                    required
                  />
                </td>
                <td className="border border-gray-300 p-1">
                  <input
                    type="text"                    
                    name="note"
                    value={item.note}
                    onChange={(event) => handleChange(index, event)}
                    className="w-full p-1 border border-gray-300"
                    required
                  />
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  <button
                    onClick={() => removeRow(index)}
                    className="bg-red-500 text-white px-2 py-1 hover:bg-red-600"
                    disabled={items.length === 1}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-end">
          <button
            onClick={addRow}
            className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
          >
            Add More
          </button>
        </div>
      </div>
    </div>
    <InvoiceDocument items={items} />
    </>
  );
};

export default TableForm;
