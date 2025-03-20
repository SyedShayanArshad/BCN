import React, { useState, useEffect, useRef } from 'react';
import { FaSave, FaSearch } from 'react-icons/fa';
import { Noto_Nastaliq_Urdu } from 'next/font/google'
import Loading from './Loading';
const urduFontClass = Noto_Nastaliq_Urdu();

const AddCustomerInPayment = ({ customer, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(
    customer || {
      customerId: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      comment: "",
    }
  );
  
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCustomerUrdu, setSelectedCustomerUrdu] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => {
    if (customer) {
      setSearchTerm(customer.customerName || "");
      fetchCustomerDetails(customer.customerId);
    }
  }, [customer]);

  useEffect(() => {
    if (selectedCustomer && searchTerm !== selectedCustomer.CustomerName.InEnglish) {
      setFormData(prev => ({ ...prev, customerId: "" }));
      setSelectedCustomer(null);
      setSelectedCustomerUrdu("");
    }
  }, [searchTerm, selectedCustomer]);

  const fetchCustomerDetails = async (customerId) => {
    try {
      const response = await fetch('/api/customers');
      const customers = await response.json();
      const customerDetail = customers.find(c => c._id === customerId);
      if (customerDetail) {
        setSelectedCustomerUrdu(customerDetail.CustomerName.InUrdu);
        setSearchTerm(customerDetail.CustomerName.InEnglish);
        setFormData(prev => ({
          ...prev,
          customerId: customerDetail._id,
        }));
        setSelectedCustomer(customerDetail);
      }
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };

  const fetchCustomerSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/customers`);
      const data = await response.json();
      const filteredCustomers = data.filter(customer => 
        customer.CustomerName.InEnglish.toLowerCase().includes(query.toLowerCase()) ||
        customer.CustomerName.InUrdu.includes(query)
      );
      setSuggestions(filteredCustomers.slice(0, 5));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!customer) {
        fetchCustomerSuggestions(searchTerm);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, customer]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCustomerSelect = (customer) => {
    setFormData(prev => ({
      ...prev,
      customerId: customer._id,
    }));
    setSelectedCustomer(customer);
    setSelectedCustomerUrdu(customer.CustomerName.InUrdu);
    setSearchTerm(customer.CustomerName.InEnglish);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      customerName: searchTerm,
      amount: parseFloat(formData.amount),
      date: formData.date || new Date().toISOString().split("T")[0],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          {customer ? "Edit Customer" : "Add New Customer"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative" ref={searchRef}>
            <div className="flex items-center border rounded dark:border-gray-600">
              <FaSearch className="ml-2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search customer..."
                className="w-full p-2 rounded dark:bg-gray-700 dark:text-white focus:outline-none"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (!customer) {
                    setShowSuggestions(true);
                  }
                }}
                readOnly={!!customer}
                required
              />
            </div>
            
            {showSuggestions && searchTerm.trim() && !customer && (
              <div className="absolute w-full mt-1 bg-white dark:bg-gray-700 border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                {loading ? (
                  <div className="p-3 text-center text-gray-500 dark:text-gray-300">
                    <Loading/>
                  </div>
                ) : suggestions.length > 0 ? (
                  suggestions.map((suggestion) => (
                    <div
                      key={suggestion._id}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                      onClick={() => handleCustomerSelect(suggestion)}
                    >
                      <div className="text-sm dark:text-white">
                        {suggestion.CustomerName.InEnglish}
                      </div>
                      <div className={`${urduFontClass.className} text-xs text-gray-500 dark:text-gray-300`} dir="rtl">
                        {suggestion.CustomerName.InUrdu}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center text-gray-500 dark:text-gray-300">
                    No customer found with name "{searchTerm}"
                  </div>
                )}
              </div>
            )}
            
            {selectedCustomerUrdu && (
              <div className={`${urduFontClass.className} mt-1 text-sm text-gray-500 dark:text-gray-300`} dir="rtl">
                {selectedCustomerUrdu}
              </div>
            )}
          </div>

          <input
            type="number"
            placeholder="Amount"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
          />
          
          <input
            type="date"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          
          <textarea
            placeholder="Comment"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          />
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 dark:bg-gray-600 dark:text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <FaSave className="h-5 w-5" /> {customer ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerInPayment;