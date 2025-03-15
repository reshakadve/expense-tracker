import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from './pages/auth/index';
import { ExpenseTracker } from "./pages/expense-tracker/index";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" exact element={<Auth />} />
            <Route path="/expense-tracker" element={<ExpenseTracker />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
