import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";

import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useDeleteTransaction } from "../../hooks/useDeleteTransaction";
import { useEditTransaction } from "../../hooks/useEditTransaction";
import { useGetTransactions } from "../../hooks/useGetTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { deleteTransaction } = useDeleteTransaction();
  const { editTransaction } = useEditTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const [editingTransaction, setEditingTransaction] = useState(null);

  const navigate = useNavigate();
  const { balance, income, expenses } = transactionTotals;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (editingTransaction) {
      await editTransaction(editingTransaction.id, {
        description,
        transactionAmount: Number(transactionAmount),
        transactionType,
      });
      setEditingTransaction(null);
    } else {
      await addTransaction({
        description,
        transactionAmount: Number(transactionAmount),
        transactionType,
      });
    }

    setDescription("");
    setTransactionAmount("");
  };

  const onEdit = (transaction) => {
    setEditingTransaction(transaction);
    setDescription(transaction.description);
    setTransactionAmount(transaction.transactionAmount);
    setTransactionType(transaction.transactionType);
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  console.log("Profile Photo URL:", profilePhoto);


  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-blue-50 to-gray-100 flex flex-col items-center p-6 relative">
      
      {/* profile & signout*/}
      {profilePhoto && (
        <div className="absolute top-4 right-6 flex items-center space-x-3">
          <img className="w-10 h-10 rounded-full border-gray-300" src={profilePhoto} alt="Profile" />
          <button onClick={signUserOut} className="bg-blue-400 hover:bg-sky-800 text-white px-4 py-2 rounded-lg shadow-md">
            Sign Out
          </button>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mt-12">
  
        {/* expense container */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-2/5">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            {name}'s Expense Tracker
          </h1>
  
          <div className="text-center mb-6">
            <h3 className="text-lg text-gray-600">Your Balance</h3>
            <h2 className={`text-2xl font-semibold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
              ₹{balance >= 0 ? balance : `-${balance * -1}`}
            </h2>
          </div>
  
          {/* income & expense */}
          <div className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
            <div className="text-center">
              <h4 className="text-gray-600">Income</h4>
              <p className="text-green-600 font-semibold">₹{income}</p>
            </div>
            <div className="text-center">
              <h4 className="text-gray-600">Expenses</h4>
              <p className="text-red-600 font-semibold">₹{expenses}</p>
            </div>
          </div>
  
          {/* add transaction */}
          <form onSubmit={onSubmit} className="space-y-4">
            <input type="text" placeholder="Description" value={description} required onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-300" />
            <input type="number" placeholder="Amount" value={transactionAmount} required onChange={(e) => setTransactionAmount(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-300" />
  
            {/* type of transaction */}
            <div className="flex items-center gap-4">
              <label className="flex items-center space-x-2">
                <input type="radio" value="expense" checked={transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)} className="accent-red-500" />
                <span className="text-gray-700">Expense</span>
              </label>
  
              <label className="flex items-center space-x-2">
                <input type="radio" value="income" checked={transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)} className="accent-green-500" />
                <span className="text-gray-700">Income</span>
              </label>
            </div>
  
            <button type="submit" className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-sky-800 transition duration-300">
              {editingTransaction ? "Update Transaction" : "Add Transaction"}
            </button>
          </form>
        </div>
  
        {/* transactions */}
        <div className="w-full md:w-3/5 bg-white shadow-lg rounded-lg p-7 h-[600px] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Transactions</h3>
          <ul className="space-y-3">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-sm">
                <div>
                  <h4 className="font-medium">{transaction.description}</h4>
                  <p className={`text-sm ${transaction.transactionType === "expense" ? "text-red-600" : "text-green-600"}`}>
                    ₹{transaction.transactionAmount} - {transaction.transactionType}
                  </p>
                </div>
                <div className="space-x-2">
                  <button onClick={() => onEdit(transaction)} className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-3 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => deleteTransaction(transaction.id)} className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  

  
};
