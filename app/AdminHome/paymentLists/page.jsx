"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaFilter, FaArrowLeft, FaFileExport } from "react-icons/fa";
function page() {
  const router = useRouter();
  return (
    <div className="min-h-screen dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 relative">
      <button
        onClick={() => router.back()}
        className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 mb-2 text-gray-800 dark:text-gray-100"
      >
        <FaArrowLeft /> Back to Dashboard
      </button>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-semibold text-2xl">Payment List Management</h1>
        <div className="flex gap-5">
          <button className=" px-6 py-2 bg-black hover:bg-gray-800 border border-white  text-white rounded-lg flex items-center gap-2 transition-all">
            <FaFilter />
            <p>Filter</p>
          </button>
          <button className=" px-6 py-2 bg-black hover:bg-gray-800 border border-white  text-white rounded-lg flex items-center gap-2 transition-all">
            <FaFileExport />
            <p>Export</p>
          </button>
        </div>
      </div>
      <div className="dark:bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left font-medium">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left font-medium">Amount</th>
                <th className="px-6 py-3 text-left font-medium">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Date</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 text-blue-600 dark:text-blue-400 font-mono">
                  #TX98567
                </td>
                <td className="px-6 py-4">$450.00</td>
                <td className="px-6 py-4">Credit Card</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4">Feb 19, 2025</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 dark:text-blue-400 transition-colors">
                    Details
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 text-blue-600 dark:text-blue-400 font-mono">
                  #TX98432
                </td>
                <td className="px-6 py-4">$275.50</td>
                <td className="px-6 py-4">PayPal</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4">Feb 18, 2025</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 dark:text-blue-400 transition-colors">
                    Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default page;
