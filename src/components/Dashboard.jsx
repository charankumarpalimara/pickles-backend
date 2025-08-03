import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  Package, 
  DollarSign, 
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  LayoutDashboard,
  Eye
} from 'lucide-react';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      // Simulate API call with timeout
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const fetchPromise = new Promise(resolve => 
        setTimeout(() => resolve({ success: true }), 2000)
      );
      
      await Promise.race([fetchPromise, timeoutPromise]);
    } catch (error) {
      console.error('Error refreshing dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: 'Total Revenue',
      value: '₹45,231',
      change: '+20.1%',
      changeType: 'positive',
      icon: DollarSign,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50'
    },
    {
      title: 'Total Orders',
      value: '2,350',
      change: '+180.1%',
      changeType: 'positive',
      icon: ShoppingCart,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50'
    },
    {
      title: 'Total Customers',
      value: '1,234',
      change: '+19%',
      changeType: 'positive',
      icon: Users,
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      title: 'Total Products',
      value: '156',
      change: '+12%',
      changeType: 'positive',
      icon: Package,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50'
    }
  ];

  const recentOrders = [
    { id: 1, customer: 'John Doe', product: 'Spicy Pickles', amount: '₹240', status: 'Delivered' },
    { id: 2, customer: 'Jane Smith', product: 'Lemon Pickle', amount: '₹180', status: 'Processing' },
    { id: 3, customer: 'Mike Johnson', product: 'Mixed Pickles', amount: '₹320', status: 'Shipped' },
    { id: 4, customer: 'Sarah Wilson', product: 'Garlic Pickle', amount: '₹200', status: 'Pending' }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'Processing':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your business.</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-3 gradient-primary text-white rounded-xl hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="group bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:shadow-xl hover:shadow-primary/5 hover:scale-[1.02] transition-all duration-300 hover:border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0 space-y-3">
                <p className="text-sm font-medium text-muted-foreground truncate">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <div className="flex items-center">
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-semibold ml-1 ${
                    stat.changeType === 'positive' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">from last month</span>
                </div>
              </div>
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Revenue Overview</h3>
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-muted/30 rounded-xl border border-border/30">
            <div className="text-center space-y-3">
              <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto">
                <TrendingUp className="w-12 h-12 text-primary mx-auto" />
              </div>
              <p className="text-muted-foreground font-medium">Revenue chart will be displayed here</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Recent Orders</h3>
            <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-semibold hover:scale-105 transition-all duration-200">
              <Eye className="w-4 h-4" />
              View all
            </button>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/30 hover:bg-muted/50 hover:scale-[1.01] transition-all duration-200">
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm font-semibold text-foreground truncate">{order.customer}</p>
                  <p className="text-sm text-muted-foreground truncate">{order.product}</p>
                </div>
                <div className="flex items-center space-x-3 ml-4">
                  <span className="text-sm font-bold text-foreground">{order.amount}</span>
                  <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:shadow-lg transition-all duration-300">
        <h3 className="text-xl font-bold text-foreground mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="group flex items-center justify-center p-6 border-2 border-dashed border-border hover:border-primary rounded-2xl hover:bg-primary/5 transition-all duration-300 hover:scale-[1.02]">
            <Package className="w-6 h-6 mr-3 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Add Product</span>
          </button>
          <button className="group flex items-center justify-center p-6 border-2 border-dashed border-border hover:border-primary rounded-2xl hover:bg-primary/5 transition-all duration-300 hover:scale-[1.02]">
            <Users className="w-6 h-6 mr-3 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Add Customer</span>
          </button>
          <button className="group flex items-center justify-center p-6 border-2 border-dashed border-border hover:border-primary rounded-2xl hover:bg-primary/5 transition-all duration-300 hover:scale-[1.02]">
            <ShoppingCart className="w-6 h-6 mr-3 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">View Orders</span>
          </button>
          <button className="group flex items-center justify-center p-6 border-2 border-dashed border-border hover:border-primary rounded-2xl hover:bg-primary/5 transition-all duration-300 hover:scale-[1.02]">
            <TrendingUp className="w-6 h-6 mr-3 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

