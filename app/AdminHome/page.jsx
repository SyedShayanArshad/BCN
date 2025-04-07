"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaUsers, FaUserTie, FaDollarSign } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
export default function page() {
  const router = useRouter();
  const [customerCount, setCustomerCount] = useState(null);
  const [cashierCount, setCashierCount] = useState(null);
  const [areaCount, setAreaCount] = useState(null);

  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
        const data = await response.json();
        setter(data.length); // Assuming API returns an array of items
      } catch (error) {
        console.error(`Error fetching from ${url}:`, error);
      }
    };

    fetchData("/api/customers", setCustomerCount);
    fetchData("/api/areas", setAreaCount);
    fetchData("/api/cashiers", setCashierCount); // ✅ Fetch cashier count
  }, []);

  return (
    <div className="min-h-screen dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-semibold text-xl">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          icon={<FaUsers className="text-xl" />}
          title="Customers"
          count={customerCount !== null ? customerCount : "Loading..."}
          onClick={() => router.push("AdminHome/customers")}
        />

        <DashboardCard
          icon={<FaUserTie className="text-xl" />}
          title="Cashiers"
          count={cashierCount !== null ? cashierCount : "Loading..."} // ✅ Dynamic cashier count
          onClick={() => router.push("AdminHome/cashiers")}
        />

        <DashboardCard
          icon={<FaDollarSign className="text-xl" />}
          title="Payments"
          count="$12,345"
          onClick={() => router.push("AdminHome/paymentLists")}
        />
        <DashboardCard
          icon={<MdPlace className="text-xl" />}
          title="Area"
          count={areaCount !== null ? areaCount : "Loading..."}
          onClick={() => router.push("AdminHome/areas")}
        />
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, count, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-100 dark:bg-gray-800 border border-gray-700 cursor-pointer p-6 rounded-xl shadow-xl hover:border-blue-500 transition-all"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-500/20 rounded-lg text-blue-600">
          {icon}
        </div>
        <div>
          <h2 className="text-sm mb-1">{title}</h2>
          <p className="text-2xl font-bold">{count}</p>
        </div>
      </div>
    </div>
  );
}
