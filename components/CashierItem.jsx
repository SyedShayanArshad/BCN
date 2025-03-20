"use client";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import CashierForm from "./CashierForm";
import ReactDOM from "react-dom";

function CashierItem({ cashier, onUpdate }) {
  const [isEdit, setIsEdit] = useState(false);
  const handleDelete = async () => {
    if (window.confirm("Are you sure?")) {
      try {
        const response = await fetch(`/api/cashiers/${cashier._id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Delete failed");
        onUpdate();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <>
      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <td className="px-6 py-4">{cashier.name}</td>
        <td className="px-6 py-4">{cashier.username}</td>
        <td className="px-6 py-4">
          <div className="flex gap-1 md:gap-2 flex-wrap">
            <button
              onClick={() => setIsEdit(true)}
              className="border flex items-center gap-1 rounded-md px-2 py-1 text-sm"
            >
              <FaRegEdit />
              <p className="hidden sm:block">Edit</p>
            </button>
            <button
              onClick={handleDelete}
              className="border flex items-center gap-1 rounded-md px-2 py-1 text-sm"
            >
              <AiOutlineDelete />
              <p className="hidden sm:block">Delete</p>
            </button>
          </div>
        </td>
      </tr>
      
      {isEdit &&
        ReactDOM.createPortal(
          <CashierForm
            cashier={cashier}
            onClose={() => setIsEdit(false)}
            onSuccess={() => {
              setIsEdit(false);
              onUpdate();
            }}
          />,
          document.getElementById("modal-root")
        )}
    </>
  );
}

export default CashierItem;
