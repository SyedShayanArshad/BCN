"use client";
import React from "react";
import {
  FaFileExcel,
  FaFilePdf,
  FaDollarSign,
  FaWallet,
  FaArrowLeft,
  FaChartLine,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
function Page({ params }) {
  const unwrap = React.use(params);
  const paymentListId = unwrap.id;
  const AllList = useSelector((state) => state.lists.lists);
  const selectedList = AllList.find((item) => item.id == paymentListId);
  const router = useRouter()
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
  
    // 📝 Create Summary Sheet
    const summaryData = [
      ["Total Payment", selectedList.TotalAmount],
      ["Total Expenses", selectedList.TotalExpenses],
      ["Balance", selectedList.Balance],
      ["Total Customers", selectedList.Payments.length],
    ];
    const wsSummary = XLSX.utils.aoa_to_sheet([["Summary"], ...summaryData]);
    XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");
  
    // 🧾 Customers Sheet
    const wsCustomers = XLSX.utils.json_to_sheet(selectedList.Payments);
    XLSX.utils.book_append_sheet(wb, wsCustomers, "Customers");
  
    // 💸 Expenses Sheet
    const wsExpenses = XLSX.utils.json_to_sheet(selectedList.Expenses);
    XLSX.utils.book_append_sheet(wb, wsExpenses, "Expenses");
  
    XLSX.writeFile(wb, `PaymentList_${selectedList.name}.xlsx`);
  };
  
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Payment List: ${selectedList.name}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Total Payment: Rs.${selectedList.TotalAmount}`, 10, 20);
    doc.text(`Total Expenses: Rs.${selectedList.TotalExpenses}`, 10, 27);
    doc.text(`Balance: Rs.${selectedList.Balance}`, 10, 34);
    doc.text(`Total Customers: ${selectedList.Payments.length}`, 10, 41);
    doc.autoTable({
      head: [["Name", "Amount", "Date", "Comment"]],
      body: selectedList.Payments.map((cust) => [
        cust.customerName,
        `Rs.${cust.amount}`,
        cust.paidDate,
        cust.comments || "No comments",
      ]),
      startY: 45,
    });
    doc.autoTable({
      head: [["Item", "Cost", "Date"]],
      body: selectedList.Expenses.map((exp) => [
        exp.expenseName,
        `Rs.${exp.amount}`,
        exp.expenseDate,
      ]),
      startY: doc.lastAutoTable.finalY + 10,
    });
  
    doc.save(`PaymentList_${selectedList.name}.pdf`);
  };
  

  if (!selectedList)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <button
              onClick={() => router.back()}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 mb-4 md:mb-0 text-gray-800 dark:text-gray-100"
            >
              <FaArrowLeft /> Back
            </button>
            <h1 className="text-3xl font-bold mb-2">
              Payment List: {selectedList.name}
            </h1>
            <p className="text-gray-500">Created on {selectedList.createdAt}</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all"
            >
              <FaFileExcel className="text-lg" /> Export Excel
            </button>
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition-all"
            >
              <FaFilePdf className="text-lg" /> Export PDF
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-xl shadow-sm border dark:bg-gray-800 border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FaDollarSign className="text-2xl text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Payment</p>
                <p className="text-2xl font-semibold">
                  Rs.{selectedList.TotalAmount}
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-xl shadow-sm border dark:bg-gray-800 border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <FaWallet className="text-2xl text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
                <p className="text-2xl font-semibold">
                  Rs.{selectedList.TotalExpenses}
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-xl shadow-sm border dark:bg-gray-800 border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaChartLine className="text-2xl text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Balance</p>
                <p className="text-2xl font-semibold">
                  Rs.{selectedList.Balance}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" rounded-xl shadow-sm border dark:bg-gray-800 border-gray-100 mb-8">
          <div className="p-6 border-b border-gray-200 flex justify-between">
            <h3 className="text-lg font-semibold">Customer Payments</h3>
            <h3 className="text-lg font-semibold">Total Customers: {selectedList.Payments.length}</h3>

          </div>
          <div className="h-[475  px] md:h-[400px] overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
            {selectedList.Payments.map((cust) => (
              <div
                key={cust.paymentId}
                className="p-4  rounded-lg border border-gray-100 dark:border-gray-700 dark:bg-gradient-to-br dark:from-gray-800 dark:to-blue-950 bg-gradient-to-br from-white to-blue-50  "
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium ">{cust.customerName}</h4>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">
                    Rs.{cust.amount}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">{cust.paidDate}</p>
                <p className="text-sm text-gray-600 ">
                  {cust.comments || "No comments"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Expenses Section */}
        <div className="rounded-xl shadow-sm border dark:bg-gray-800 border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Expenses</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
            {selectedList.Expenses.map((exp) => (
              <div
                key={exp.expenseId}
                className="p-4 border border-gray-100 rounded-lg dark:border-gray-700 bg-gradient-to-br from-white to-red-50 dark:bg-gradient-to-br dark:from-gray-800 dark:to-red-950 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{exp.expenseName}</h4>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm">
                    Rs.{exp.amount}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{exp.expenseDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
