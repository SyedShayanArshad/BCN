"use client";
import { useState } from "react";
import React from "react";
import ListCard from "@/components/ListCard";
import ItemManager from "@/components/ItemManager";

function Page() {
  const [listName, setListName] = useState("");
  const [AllLists, setAllLists] = useState([]);
  const [AddListFlag, setAddListFlag] = useState(false);
  const handleEdit = (list) => {
  }

  const handleDelete = (list) => {
    setAllLists(AllLists.filter(item => item !== list))
  }

  const handleView = (list) => {
    alert(`Viewing list: ${list.name}`)
  }
  const handleAddList = (e) => {
    e.preventDefault();
    const newList = {
      name: listName,
      createdAt: new Date().toLocaleString(), // Formatting the date as string
    };
    setAllLists((prevLists) => [...prevLists, newList]);
    setListName("");
    setAddListFlag(false); // Close the form
  };
  return (
    <div className="p-4 relative flex flex-col gap-5 md:gap-10">
      <div className="flex flex-col gap-4 md:flex-row items-center justify-around">
        <h1 className="text-3xl font-bold">Customer Lists</h1>
        <button
          className="border-blue-500 hover:text-white hover:bg-blue-500 border-2 px-4 py-1 rounded-lg text-xl font-semibold text-blue-500 transition-all duration-300"
          onClick={() => setAddListFlag(true)}
        >
          Add New List
        </button>
      </div>

      {AddListFlag && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center dark:bg-white bg-black bg-opacity-70 z-50">
          <form className="p-6 rounded-lg shadow-lg flex flex-col gap-4">
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="Enter list name"
              className="p-2 border rounded"
            />
            <button
              onClick={handleAddList}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add List
            </button>
            <button
              type="button"
              onClick={() => setAddListFlag(false)}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="AllLists p-6 flex flex-col gap-5 border-2 rounded">
      {AllLists.map((list, index) => (
          <ListCard
            key={index}
            list={list}  // Pass the list as a prop
            onEdit={handleEdit}  // Function for Edit
            onDelete={handleDelete}  // Function for Delete
            onView={handleView}  // Function for View
          />
        ))}
      </div>
    <ItemManager/>

    </div>
  );
}

export default Page;
