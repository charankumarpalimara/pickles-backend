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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border z-50 transition-all duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-auto lg:bg-sidebar
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64 flex-shrink-0 shadow-xl lg:shadow-none
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-sidebar-border/50">
          <div className="flex items-center space-x-3">
            <div className="gradient-primary p-2.5 rounded-xl shadow-lg">
              <Package2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">Monika Pickle</h1>
              <p className="text-xs text-sidebar-foreground/60">Admin Dashboard</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-sidebar-foreground/60" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onToggle}
                  className={({ isActive }) => `
                    flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'gradient-primary text-white shadow-lg shadow-primary/25 scale-[1.02]' 
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground hover:scale-[1.01] hover:shadow-sm'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="gradient-accent text-white text-xs px-2.5 py-1 rounded-full min-w-[20px] text-center font-semibold shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer with subtle branding */}
        <div className="p-4 border-t border-sidebar-border/30">
          <div className="text-xs text-sidebar-foreground/40 text-center font-medium">
            © 2025 Pickles Admin
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

