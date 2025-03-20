import React, { useState, useEffect } from "react";
import { FaPlus, FaRegEdit, FaSave } from "react-icons/fa";

function CustomerForm({ Customer, onClose }) {
  const [formData, setFormData] = useState(
    Customer || {
      CustomerName: {
        InEnglish: "",
        InUrdu: "",
      },
      area: "",
      PhoneNumber: "",
    }
  );
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch("/api/areas");
        const data = await response.json();
        setAreas(data);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };
    fetchAreas();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = Customer
        ? `/api/customers/${Customer._id}`
        : "/api/customers";
      const method = Customer ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save");

      onClose(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fade-in">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-2xl w-[90%] sm:w-[480px] transform transition-all"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            {Customer ? (
              <FaRegEdit className="text-blue-400 text-xl" />
            ) : (
              <FaPlus className="text-blue-400 text-xl" />
            )}
          </div>
          <h2 className="text-xl font-semibold">
            {Customer ? "Edit Customer" : "Add New Customer"}
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Customer Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Customer Name in English"
                className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                value={formData.CustomerName.InEnglish}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    CustomerName: {
                      ...formData.CustomerName,
                      InEnglish: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">In Urdu</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Customer Name in Urdu"
                className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                value={formData.CustomerName.InUrdu}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    CustomerName: {
                      ...formData.CustomerName,
                      InUrdu: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Area</label>
            <select
              value={formData.area}
              onChange={(e) =>
                setFormData({ ...formData, area: e.target.value })
              }
              className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
              required
            >
              <option value="">Select Area</option>
              {areas.map((area) => (
                <option key={area._id} value={area._id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                pattern="03[0-9]{2}-[0-9]{7}"
                placeholder="03XX-XXXXXXX"
                className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                value={formData.PhoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, PhoneNumber: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-300 dark:bg-gray-600 dark:text-white rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <FaSave className="text-sm" />
              {Customer ? "Update Customer" : "Add Customer"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CustomerForm;
