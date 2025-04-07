"use client"
import {React} from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { removeList } from "@/lib/features/List/listSlice";
function ListItem({id, name, createdAt, balance }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const viewDetailHandler = ()=>{
    router.push(`/UserHome/viewList/${id}`)
  }
  const editListHandler = ()=>{
    router.push(`/UserHome/editList/${id}`)
  }
  return (
    <tr className="border-b">
      <td className="px-4 py-2 whitespace-normal md:whitespace-nowrap">{name}</td>
      <td className="px-4 py-2 whitespace-normal md:whitespace-nowrap">{createdAt}</td>
      <td className="px-4 py-2 whitespace-normal md:whitespace-nowrap">Rs. {balance}</td>
      <td className="px-4 py-2 whitespace-normal md:whitespace-nowrap">
        <div className="flex gap-1 md:gap-2 flex-wrap">
          <button onClick={() => viewDetailHandler(id)} className="border flex items-center gap-1 rounded-md px-2 py-1 text-sm">
            <IoEyeOutline />
            <p className="hidden sm:block">View List</p>
          </button>
          <button onClick={()=>editListHandler(id)}className="border flex items-center gap-1 rounded-md px-2 py-1 text-sm">
            <FaRegEdit />
            <p className="hidden sm:block">Manage</p>
          </button>
          <button className="border flex items-center gap-1 rounded-md px-2 py-1 text-sm"
          onClick={()=>{dispatch(removeList(id))}}>
            <AiOutlineDelete />
            <p className="hidden sm:block">Delete</p>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ListItem;
