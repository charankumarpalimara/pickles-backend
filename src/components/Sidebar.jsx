import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Warehouse, 
  Users, 
  BarChart3, 
  Truck,
  UserCog,
  Package2,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, onToggle }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', badge: null },
    { icon: ShoppingCart, label: 'Orders', path: '/orders', badge: null },
    { icon: Package, label: 'Products', path: '/products', badge: null },
    { icon: ShoppingCart, label: 'Carts', path: '/cart', badge: null },
    // { icon: Warehouse, label: 'Inventory', path: '/inventory', badge: '4' },
    { icon: Users, label: 'Customers', path: '/customers', badge: null },
    // { icon: BarChart3, label: 'Analytics', path: '/analytics', badge: null },
    // { icon: Truck, label: 'Suppliers', path: '/suppliers', badge: null },
    // { icon: UserCog, label: 'User Management', path: '/user-management', badge: null },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64 flex-shrink-0
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
              <Package2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Monika Pickle</h1>
              <p className="text-xs text-gray-500">Dashboard</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

 

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onToggle}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-sm' 
                      : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
                   {/* User Info */}
         {/* <div className="p-4 border-b border-gray-200">
           <div className="flex items-center space-x-3">
             <div className="w-10 h-10 bg-[#8B4513] rounded-full flex items-center justify-center">
               <span className="text-white font-semibold text-sm">
                 {user.first_name ? user.first_name.charAt(0).toUpperCase() : 'A'}
               </span>
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-medium text-gray-900 truncate">
                 {user.first_name && user.last_name 
                   ? `${user.first_name} ${user.last_name}` 
                   : user.username || 'Admin User'
                 }
               </p>
               <p className="text-xs text-gray-500 truncate">
                 {user.email || 'admin@pickles.com'}
               </p>
             </div>
           </div>
         </div> */}
        </nav>

        {/* Footer */}
        {/* <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            © 2025 Pickles Admin
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Sidebar;

