import React from "react";
import { GrView } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function ListCard({ list, onEdit, onDelete, onView }) {
  return (
    <div className=" p-4 rounded-lg border-2 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-4 justify-between">
      <div className="listInfo flex flex-col gap-2">
        <h3 className=" text-2xl font-bold text-blue-500">{list.name}</h3>
        <p className="text-md">
          <span className="font-bold">Created At: </span>
          {list.createdAt}
        </p>
      </div>
      <div className="listAction flex gap-4 text-lg font-medium">
        <button
          onClick={() => onView(list)}
          className="bg-green-500 text-white p-3 text-2xl m-auto rounded-lg hover:bg-green-600 transition-all duration-200"
        >
          <GrView />
        </button>
        <button
          onClick={() => onEdit(list)}
          className="bg-yellow-500 text-white p-3 text-2xl m-auto rounded-lg hover:bg-yellow-600 transition-all duration-200"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(list)}
          className="bg-red-500 text-white p-3 rounded-lg text-2xl m-auto hover:bg-red-600 transition-all duration-200"
        >
          <MdDelete/>
        </button>
      </div>
    </div>
  );
}

export default ListCard;
