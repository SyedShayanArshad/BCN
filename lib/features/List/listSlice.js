import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  lists: [],
};

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action) => {
      const newList = {
        id: uuidv4(),
        name: action.payload.name,
        createdAt: new Date().toLocaleString(),
        modifiedAt: new Date().toLocaleString(),
        TotalAmount: 0,
        TotalExpenses: 0,
        Balance: 0,
        Payments: [],
        Expenses: [],
      };
      state.lists.push(newList);
    },
    addPayment: (state, action) => {
      const { listId, payment } = action.payload;
      const list = state.lists.find((l) => l.id === listId);
      if (list) {
        list.Payments.push({
          paymentId: uuidv4(),
          customerName: payment.customerName,
          amount: payment.amount,
          paidDate: payment.date,
          comments: payment.comments,
        });
        list.TotalAmount += payment.amount;
        list.Balance = list.TotalAmount - list.TotalExpenses;
        list.modifiedAt = new Date().toLocaleString();
      }
    },
    addExpense: (state, action) => {
      const { listId, expense } = action.payload;
      const list = state.lists.find((l) => l.id === listId);
      if (list) {
        list.Expenses.push({
          expenseId: uuidv4(),
          expenseName: expense.expenseName,
          amount: expense.amount,
          expenseDate: new Date().toLocaleString(),
        });

        // Update the TotalExpenses
        list.TotalExpenses += expense.amount;

        // Update Balance
        list.Balance = list.TotalAmount - list.TotalExpenses;

        // Update modified date
        list.modifiedAt = new Date().toLocaleString();
      }
    },
    updateList: (state, action) => {
      const index = state.lists.findIndex((l) => l.id === action.payload.id);
      if (index !== -1) {
        state.lists[index] = action.payload;
      }
    },
    removeList: (state, action) => {
      state.lists = state.lists.filter((l) => l.id !== action.payload);
    },
    removePayment: (state, action) => {
      const { listId, paymentId } = action.payload;
      const list = state.lists.find((l) => l.id === listId);
      if (list) {
        const payment = list.Payments.find((p) => p.paymentId === paymentId);
        list.TotalAmount -= payment.amount;
        list.Payments = list.Payments.filter((p) => p.paymentId !== paymentId);
        list.Balance = list.TotalAmount - list.TotalExpenses;
        list.modifiedAt = new Date().toLocaleString();
      }
    },
    removeExpense: (state, action) => {
      const { listId, expenseId } = action.payload;
      const list = state.lists.find((l) => l.id === listId);
      if (list) {
        const expense = list.Expenses.find((e) => e.expenseId === expenseId);
        list.Expenses = list.Expenses.filter((e) => e.expenseId !== expenseId);
        list.TotalExpenses -= expense.amount;
        list.Balance = list.TotalAmount - list.TotalExpenses;
        list.modifiedAt = new Date().toLocaleString();
      }
    },
  },
});

export const {
  addList,
  addPayment,
  addExpense,
  updateList,
  removeList,
  removePayment,
  removeExpense,
} = listsSlice.actions;
export default listsSlice.reducer;
