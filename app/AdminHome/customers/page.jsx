"use client";
import CustomerForm from "@/components/CustomerForm";
import CustomerItem from "@/components/CustomerItem";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

function Page() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addCustomer, setAddCustomer] = useState(false);
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customers");
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAreas = async () => {
    try {
      const response = await fetch("/api/areas");
      const data = await response.json();
      setAreas(data);
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchAreas();
  }, []);

  // Filtered customers
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = 
      customer.CustomerName.InEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.CustomerName.InUrdu.includes(searchTerm);
    const matchesArea = selectedArea === "all" || customer.area?.name === selectedArea;
    return matchesSearch && matchesArea;
  });

  return (
    <div className="min-h-screen dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 relative">
      <button
        onClick={() => router.back()}
        className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 mb-2 text-gray-800 dark:text-gray-100"
      >
        <FaArrowLeft /> Back to Dashboard
      </button>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-semibold text-2xl">Customers Management</h1>
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-all"
          onClick={() => setAddCustomer(true)}
        >
          Add New Customer
        </button>
      </div>

      {/* Filter Controls */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Search by name (English/Urdu)"
          className="dark:bg-gray-800 border border-gray-700 rounded-lg p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="dark:bg-gray-800 border border-gray-700 rounded-lg p-2"
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          <option value="all">All Areas</option>
          {areas.map((area) => (
            <option key={area._id} value={area.name}>
              {area.name}
            </option>
          ))}
        </select>
      </div>

      <div className="dark:bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
          <table className="min-w-full table-fixed">
            <thead className="sticky top-0 bg-gray-200 dark:bg-gray-800 z-10 border-b border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left font-medium w-1/4">Customer Name</th>
                <th className="px-6 py-3 text-left font-medium w-1/4">Area</th>
                <th className="px-6 py-3 text-left font-medium w-1/4">Phone Number</th>
                <th className="px-6 py-3 text-left font-medium w-1/4 ">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    <Loading />
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No customers found
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <CustomerItem
                    key={customer._id}
                    Customer={customer}
                    onCustomerUpdated={fetchCustomers}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {addCustomer && (
        <CustomerForm
          onClose={(shouldRefresh) => {
            setAddCustomer(false);
            shouldRefresh && fetchCustomers();
          }}
        />
      )}
    </div>
  );
}

export default Page;