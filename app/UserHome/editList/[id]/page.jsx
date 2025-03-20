"use client";
import React, { useState } from "react";
import {
  FaPlus,
  FaSave,
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/components/Loading";
import {
  addPayment,
  addExpense,
  removePayment,
  removeExpense,
} from "@/lib/features/List/listSlice";
import AddCustomerInPayment from "@/components/AddCustomerInPayment";

const Page = ({ params }) => {
  const router = useRouter();
  const unwrap = React.use(params);
  const paymentListId = unwrap.id;
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const AllList = useSelector((state) => state.lists.lists);
  const selectedList = AllList.find((item) => item.id === paymentListId);
  const dispatch = useDispatch();

  // Customer Handlers
  const handleAddCustomer = (customer) => {
    dispatch(
      addPayment({
        listId: selectedList.id,
        payment: {
          customerName: customer.customerName,
          amount: parseFloat(customer.amount),
          date: customer.date,
          comments: customer.comment,
        },
      })
    );
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    dispatch(
      removePayment({
        listId: selectedList.id,
        paymentId: updatedCustomer.paymentId,
      })
    );
    dispatch(
      addPayment({
        listId: selectedList.id,
        payment: {
          customerName: updatedCustomer.customerName,
          amount: parseFloat(updatedCustomer.amount),
          date: updatedCustomer.date,
          comments: updatedCustomer.comment,
        },
      })
    );
  };
  const handleDeleteCustomer = (paymentId) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      dispatch(
        removePayment({
          listId: selectedList.id,
          paymentId: paymentId,
        })
      );
    }
  };
  const handleAddExpense = (expense) => {
    dispatch(
      addExpense({
        listId: selectedList.id,
        expense: {
          expenseName: expense.item,
          amount: parseFloat(expense.cost),
        },
      })
    );
  };
  const handleUpdateExpense = (updatedExpense) => {
    dispatch(
      removeExpense({
        listId: selectedList.id,
        expenseId: updatedExpense.expenseId,
      })
    );
    dispatch(
      addExpense({
        listId: selectedList.id,
        expense: {
          expenseName: updatedExpense.item,
          amount: parseFloat(updatedExpense.cost),
        },
      })
    );
  };
  const handleDeleteExpense = (expenseId) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      dispatch(
        removeExpense({
          listId: selectedList.id,
          expenseId: expenseId,
        })
      );
    }
  };

  if (!selectedList)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <button
              onClick={() => router.back()}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 mb-4 md:mb-0 text-gray-800 dark:text-gray-100"
            >
              <FaArrowLeft /> Back
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              Payment List Management:{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {selectedList.name}
              </span>
            </h1>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm w-full md:w-auto">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Total Payments
                </p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  <FaMoneyCheckAlt className="inline mr-2" />
                  Rs.{selectedList.TotalAmount}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Total Expenses
                </p>
                <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                  Rs.{selectedList.TotalExpenses}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Balance
                </p>
                <p
                  className={`text-lg font-semibold ${
                    selectedList.Balance >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  Rs.{selectedList.Balance}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payments Section */}
        <section className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Customer Payments
            </h3>
            <h3 className="text-lg font-semibold">Total Customers: {selectedList.Payments.length}</h3>
            <button
              onClick={() => {
                setEditingCustomer(null);
                setShowCustomerForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
            >
              <FaPlus className="text-sm" /> Add Customer
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedList.Payments.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                No payments recorded yet. Click "Add Customer" to get started.
              </div>
            ) : (
              selectedList.Payments.map((payment) => (
                <div
                  key={payment.paymentId}
                  className="border border-gray-100 dark:border-gray-700 p-4 rounded-xl dark:bg-gradient-to-br dark:from-gray-800 dark:to-blue-950 bg-gradient-to-br from-white to-blue-50 hover:shadow-md transition-shadow relative group"
                >
                  <div className="absolute top-3 right-3 flex gap-2 transition-opacity">
                    <button
                      onClick={() => {
                        setEditingCustomer(payment);
                        setShowCustomerForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-400 p-2 rounded-full bg-white dark:bg-gray-700 shadow-sm hover:shadow-md"
                      title="Edit"
                    >
                      <FaEdit className="text-sm" />
                    </button>
                    <button
                      onClick={() => handleDeleteCustomer(payment.paymentId)}
                      className="text-red-600 hover:text-red-800 dark:text-red-300 dark:hover:text-red-400 p-2 rounded-full bg-white dark:bg-gray-700 shadow-sm hover:shadow-md"
                      title="Delete"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800 dark:text-gray-100 truncate">
                      {payment.customerName}
                    </h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Amount:
                      </span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        Rs.{payment.amount}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Date:
                      </span>
                      <span className="text-gray-500 dark:text-gray-300">
                        {new Date(payment.paidDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p
                      className="text-sm text-gray-600 dark:text-gray-400 truncate"
                      title={payment.comments}
                    >
                      {payment.comments || "No comments"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Expenses Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Expenses
            </h3>
            <button
              onClick={() => {
                setEditingExpense(null);
                setShowExpenseForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
            >
              <FaPlus className="text-sm" /> Add Expense
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedList.Expenses.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                No expenses recorded yet. Click "Add Expense" to get started.
              </div>
            ) : (
              selectedList.Expenses.map((expense) => (
                <div
                  key={expense.expenseId}
                  className="border border-gray-100 dark:border-gray-700 p-4 rounded-xl bg-gradient-to-br from-white to-red-50 dark:bg-gradient-to-br dark:from-gray-800 dark:to-red-950 hover:shadow-md transition-shadow relative group"
                >
                  <div className="absolute top-3 right-3 flex gap-2 transition-opacity">
                    <button
                      onClick={() => {
                        setEditingExpense({
                          ...expense,
                          item: expense.expenseName,
                          cost: expense.amount,
                          date: new Date(expense.expenseDate)
                            .toISOString()
                            .split("T")[0],
                        });
                        setShowExpenseForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-400 p-2 rounded-full bg-white shadow-sm dark:bg-gray-700 hover:shadow-md"
                      title="Edit"
                    >
                      <FaEdit className="text-sm" />
                    </button>
                    <button
                      onClick={() => handleDeleteExpense(expense.expenseId)}
                      className="text-red-600 hover:text-red-800 dark:text-red-300 dark:hover:text-red-400 p-2 rounded-full bg-white shadow-sm dark:bg-gray-700 hover:shadow-md"
                      title="Delete"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800 dark:text-gray-100 truncate">
                      {expense.expenseName}
                    </h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Cost:
                      </span>
                      <span className="font-semibold text-red-600 dark:text-red-400">
                        Rs.{expense.amount}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Date:
                      </span>
                      <span className="text-gray-500 dark:text-gray-300">
                        {new Date(expense.expenseDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Modal Forms */}
        {showCustomerForm && (
          <AddCustomerInPayment
            customer={editingCustomer}
            onClose={() => setShowCustomerForm(false)}
            onSubmit={
              editingCustomer ? handleUpdateCustomer : handleAddCustomer
            }
          />
        )}
        {showExpenseForm && (
          <ExpenseForm
            expense={editingExpense}
            onClose={() => setShowExpenseForm(false)}
            onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
          />
        )}
      </div>
    </div>
  );
};
// Expense Form Component
const ExpenseForm = ({ expense, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(
    expense || {
      item: "",
      cost: "",
      date: new Date().toISOString().split("T")[0],
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      cost: parseFloat(formData.cost),
      date: formData.date || new Date().toISOString().split("T")[0],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          {expense ? "Edit Expense" : "Add New Expense"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Expense Item"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={formData.item}
            onChange={(e) => setFormData({ ...formData, item: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Cost"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={formData.cost}
            onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
            required
          />
          <input
            type="date"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
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
              <FaSave /> {expense ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
