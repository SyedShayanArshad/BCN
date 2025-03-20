"use client";
import React, { useState } from "react";
import { FaPlus, FaRegEdit, FaSave } from "react-icons/fa";

function CashierForm({ cashier, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: cashier?.name || "",
    username: cashier?.username || "",
    password: "",
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = cashier ? `/api/cashiers/${cashier._id}` : '/api/cashiers';
      const method = cashier ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const data = await response.json();
        console.log("CheckData",data)
        throw new Error(data.message || 'Something went wrong');
      }

      onSuccess?.();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-2xl w-[90%] sm:w-[480px] transform transition-all">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            {cashier ? (
              <FaRegEdit className="text-blue-400 text-xl" />
            ) : (
              <FaPlus className="text-blue-400 text-xl" />
            )}
          </div>
          <h2 className="text-xl font-semibold">
            {cashier ? "Edit Cashier" : "Add New Cashier"}
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Cashier Name
            </label>
            <input
              type="text"
              placeholder="Enter Cashier Name"
              className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required={!cashier}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-300 dark:bg-gray-600 dark:text-white rounded-lg transition-colors duration-200"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
              disabled={loading}
            >
              <FaSave className="text-sm" />
              {loading ? 'Processing...' : (cashier ? "Update Cashier" : "Add Cashier")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CashierForm;
