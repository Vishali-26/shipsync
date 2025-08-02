import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import Orders from './pages/Orders';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} setUser={setUser} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />

            {/* Customer Routes */}
            <Route path="/products" element={<Products user={user} />} />
            <Route path="/orders" element={<Orders user={user} />} />

            {/* Admin Routes */}
            <Route path="/admin/products" element={<AdminProducts user={user} />} />
            <Route path="/admin/orders" element={<AdminOrders user={user} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
