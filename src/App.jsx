import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import Customers from './components/Customers';
import AddCustomer from './components/AddCustomer';
import Analytics from './components/Analytics';
import Inventory from './components/Inventory';
import Suppliers from './components/Suppliers';
import UserManagement from './components/UserManagement';
import Cart from './components/Cart';
import Login from './components/Login';
import VideoGenerator from './components/VideoGenerator';
import YukthitechVideoGenerator from './components/YukthitechVideoGenerator';
import './App.css';

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user') || 'null'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="flex h-screen bg-gray-50">
          <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header user={user} onLogout={handleLogout} onToggleSidebar={toggleSidebar} />
            <main className="flex-1 overflow-y-auto bg-gray-50">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/add" element={<AddProduct />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/customers/add" element={<AddCustomer />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/video-generator" element={<VideoGenerator />} />
                <Route path="/yukthitech-video" element={<YukthitechVideoGenerator />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;