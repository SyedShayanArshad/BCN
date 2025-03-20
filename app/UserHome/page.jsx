"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import ListItem from "@/components/ListItem";
import { addList } from "@/lib/features/List/listSlice";
import { useDispatch,useSelector } from "react-redux";
function Page() {
  const [showForm, setShowForm] = useState(false);
  const [listName, setListName] = useState("");
  const lists = useSelector((state) => state.lists.lists);
  const dispatch = useDispatch()
  const handleAddList = () => {
    if (!listName.trim()) return;
    dispatch(addList({"name":listName}))
    setListName("");
    setShowForm(false);
  };

  return (
    <div className="py-10 px-4 relative">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">My Payment Lists</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-4 bg-black text-white border border-white rounded-md p-3"
        >
          <FaPlus />
          <p>New Payment List</p>
        </button>
      </div>
      <div className="listContent py-4 relative rounded-xl ">
        <table className="border  w-full">
          <thead>
            <tr className="border">
              <th className="px-4 py-2 text-left">List Name</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-left">Balance</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lists.map((list, index) => (
              <ListItem
                key={index}
                id={list.id}
                name={list.name}
                createdAt={list.createdAt}
                balance={list.Balance}
              />
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fade-in">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-2xl w-[90%] sm:w-[480px] transform transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <FaPlus className="text-blue-400 text-xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-100">
                Create New Payment List
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  List Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter List Name"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddList}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <FaPlus className="text-sm" />
                  Create List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
