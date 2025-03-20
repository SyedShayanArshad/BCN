"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState,useEffect } from "react";
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import CashierItem from "@/components/CashierItem";
import CashierForm from "@/components/CashierForm";
import Loading from "@/components/Loading";

function CashierPage() {
  const [cashiers, setCashiers] = useState([]);
  const [addCashier, setAddCashier] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const fetchCashiers = async () => {
    try {
      const response = await fetch('/api/cashiers');
      
      if (!response.ok) {
        throw new Error('Failed to fetch cashiers');
      }
      
      const data = await response.json();
      setCashiers(data);
    } catch (error) {
      console.error('Error fetching cashiers:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCashiers();
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
        <h1 className="font-semibold text-2xl">Cashier Management</h1>
        <button
          className="px-6 py-2 bg-black hover:bg-gray-800 border border-white text-white rounded-lg flex items-center gap-2 transition-all"
          onClick={() => setAddCashier(true)}
        >
          <FaPlus />
          <p>Add New Cashier</p>
        </button>
      </div>

      <div className="dark:bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Cashier Name</th>
                <th className="px-6 py-3 text-left font-medium">Username</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center"><Loading/></td>
                </tr>
              ) : cashiers.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center">No cashiers found</td>
                </tr>
              ) : (
                cashiers.map((cashier) => (
                  <CashierItem 
                    key={cashier._id}
                    cashier={cashier}
                    onUpdate={fetchCashiers}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {addCashier && (
        <CashierForm 
          onClose={() => setAddCashier(false)}
          onSuccess={() => {
            setAddCashier(false);
            fetchCashiers();
          }}
        />
      )}
    </div>
  );
}

export default CashierPage;
