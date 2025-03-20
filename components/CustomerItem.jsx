import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import CustomerForm from "./CustomerForm";
import {Noto_Nastaliq_Urdu} from 'next/font/google'
const urduFontClass = Noto_Nastaliq_Urdu();
import ReactDOM from "react-dom"; 
function CustomerItem({ Customer, onCustomerUpdated }) {
  const [isEdit, setIsEdit] = useState(false);
  const handleDelete = async () => {
    if (window.confirm("Are you sure?")) {
      try {
        const response = await fetch(`/api/customers/${Customer._id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Delete failed");
        onCustomerUpdated();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <>
      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <td className="px-6 py-4">
          <p>{Customer.CustomerName.InEnglish}</p>
          <p className={urduFontClass.className}>{Customer.CustomerName.InUrdu}</p>
        </td>
        <td className="px-6 py-4">{Customer.area?.name}</td>
        <td className="px-6 py-4">{Customer.PhoneNumber}</td>
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
              className="border flex items-center gap-1 rounded-md px-2 py-1 text-sm"
              onClick={handleDelete}
            >
              <AiOutlineDelete />
              <p className="hidden sm:block">Delete</p>
            </button>
          </div>
        </td>
      </tr>
      {isEdit && ReactDOM.createPortal(
        <CustomerForm
          Customer={Customer}
          onClose={(shouldRefresh) => {
            setIsEdit(false);
            shouldRefresh && onCustomerUpdated();
          }}
        />,
        document.getElementById("modal-root")
      )}
    </>
  );
}

export default CustomerItem;
