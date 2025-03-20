"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import AreaItem from "@/components/AreaItem";
import AreaForm from "@/components/AreaForm";
import Loading from "@/components/Loading";

function AreaPage() {
  const [areas, setAreas] = useState([]);
  const [addArea, setAddArea] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchAreas = async () => {
    try {
      const response = await fetch("/api/areas");

      if (!response.ok) {
        throw new Error("Failed to fetch areas");
      }

      const data = await response.json();
      setAreas(data);
    } catch (error) {
      console.error("Error fetching areas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  return (
    <div className="min-h-screen dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 relative">
      <button
        onClick={() => router.back()}
        className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 mb-2 text-gray-800 dark:text-gray-100"
      >
        <FaArrowLeft /> Back to Dashboard
      </button>

      <div className="flex justify-between items-center mb-6">
        <h1 className="font-semibold text-2xl">Area Management</h1>
        <button
          className="px-6 py-2 bg-black hover:bg-gray-800 border border-white text-white rounded-lg flex items-center gap-2 transition-all"
          onClick={() => setAddArea(true)}
        >
          <FaPlus />
          <p>Add New Area</p>
        </button>
      </div>

      <div className="dark:bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
        <div className="max-h-[360px] md:max-h-[350px] overflow-y-auto">
          <table className="min-w-full">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Area Name</th>
                <th className="px-6 py-3 text-left font-medium">
                  Number of Customers
                </th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center">
                    <Loading />
                  </td>
                </tr>
              ) : areas.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center">
                    No areas found
                  </td>
                </tr>
              ) : (
                areas.map((area) => (
                  <AreaItem key={area._id} area={area} onUpdate={fetchAreas} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {addArea && (
        <AreaForm
          onClose={() => setAddArea(false)}
          onSuccess={() => {
            setAddArea(false);
            fetchAreas();
          }}
        />
      )}
    </div>
  );
}

export default AreaPage;
