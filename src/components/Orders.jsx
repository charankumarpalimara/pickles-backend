import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Eye, 
  RefreshCw,
  CheckCircle,
  Clock,
  Truck,
  AlertTriangle,
  X
} from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/orders/');
      const result = await response.json();
      if (result.success) {
        const transformedOrders = result.data.map(order => {
          let customerName = `Customer ${order.user_id}`;
          let customerPhone = '+91 98765 43210';
          let customerEmail = `customer${order.user_id}@example.com`;
          if (order.user) {
            const fullName = `${order.user.first_name || ''} ${order.user.last_name || ''}`.trim();
            customerName = fullName || order.user.username || `Customer ${order.user_id}`;
            customerPhone = order.user.mobile || '+91 98765 43210';
            customerEmail = order.user.email || `customer${order.user_id}@example.com`;
          }
          return {
            id: order.id,
            order_id: order.order_id,
            customer_name: customerName,
            customer_phone: customerPhone,
            customer_email: customerEmail,
            total_items: order.items ? order.items.length : 0,
            item_names: order.items ? order.items.map(item => item.product_name).join(', ') : 'No items',
            total_amount: order.total_price,
            status: reverseStatusMapping[order.status] || order.status,
            created_at: order.createdAt,
            payment_method: order.payment_method,
            payment_status: 'Paid',
            delivery_address: order.shipping_address,
            delivery_city: 'Visakhapatnam',
            delivery_pincode: '530001',
            delivery_state: 'Andhra Pradesh',
            items: order.items ? order.items.map(item => ({
              product_name: item.product_name,
              size: item.weight,
              quantity: item.quantity,
              price: item.price
            })) : []
          };
        });
        setOrders(transformedOrders);
      } else {
        console.error('Failed to fetch orders:', result);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const fetchPromise = fetch('http://localhost:3000/api/orders/');
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      const result = await response.json();
      
      if (result.success) {
        const transformedOrders = result.data.map(order => {
          let customerName = `Customer ${order.user_id}`;
          let customerPhone = '+91 98765 43210';
          let customerEmail = `customer${order.user_id}@example.com`;
          if (order.user) {
            const fullName = `${order.user.first_name || ''} ${order.user.last_name || ''}`.trim();
            customerName = fullName || order.user.username || `Customer ${order.user_id}`;
            customerPhone = order.user.mobile || '+91 98765 43210';
            customerEmail = order.user.email || `customer${order.user_id}@example.com`;
          }
          return {
            id: order.id,
            order_id: order.order_id,
            customer_name: customerName,
            customer_phone: customerPhone,
            customer_email: customerEmail,
            total_items: order.items ? order.items.length : 0,
            item_names: order.items ? order.items.map(item => item.product_name).join(', ') : 'No items',
            total_amount: order.total_price,
            status: reverseStatusMapping[order.status] || order.status,
            created_at: order.createdAt,
            payment_method: order.payment_method,
            payment_status: 'Paid',
            delivery_address: order.shipping_address,
            delivery_city: 'Visakhapatnam',
            delivery_pincode: '530001',
            delivery_state: 'Andhra Pradesh',
            items: order.items ? order.items.map(item => ({
              product_name: item.product_name,
              size: item.weight,
              quantity: item.quantity,
              price: item.price
            })) : []
          };
        });
        setOrders(transformedOrders);
      } else {
        console.error('Failed to fetch orders:', result);
      }
    } catch (error) {
      console.error('Error refreshing orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: statusMapping[newStatus] }),
      });
      const result = await response.json();
      if (!response.ok) {
        console.error('Failed to update order status:', result.message);
        fetchOrders(); // Revert local state on failure
      } else {
        console.log('Order status updated successfully:', result);
        fetchOrders(); // Refresh the orders list
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      fetchOrders(); // Revert local state on error
    }
  };

  const statusMapping = {
    'New': 'pending',
    'Processing': 'confirmed',
    'Shipped': 'shipped',
    'Delivered': 'delivered',
    'Cancelled': 'cancelled'
  };

  const reverseStatusMapping = {
    'pending': 'New',
    'confirmed': 'Processing',
    'shipped': 'Shipped',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled'
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'New': return <Clock className="w-4 h-4" />;
      case 'Processing': return <AlertTriangle className="w-4 h-4" />;
      case 'Shipped': return <Truck className="w-4 h-4" />;
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      case 'Cancelled': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return '₹0';
    return `₹${parseFloat(amount).toFixed(2)}`;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      (order.order_id?.toString().includes(searchTerm) || '') ||
      (order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (order.customer_phone?.includes(searchTerm) || '') ||
      (order.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) || '');
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const newOrders = orders.filter(o => o.status === 'New').length;
  const processingOrders = orders.filter(o => o.status === 'Processing').length;
  const shippedOrders = orders.filter(o => o.status === 'Shipped').length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage and track customer orders</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Orders</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{orders.length}</p>
            </div>
            <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 flex-shrink-0" />
          </div>
        </div>
        <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">New Orders</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">{newOrders}</p>
            </div>
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
          </div>
        </div>
        <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Processing</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-600">{processingOrders}</p>
            </div>
            <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 flex-shrink-0" />
          </div>
        </div>
        <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Delivered</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">{deliveredOrders}</p>
            </div>
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by order ID, customer name, phone, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
          >
            <option value="all">All Status</option>
            <option value="New">New</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <RefreshCw className="w-6 h-6 animate-spin text-orange-500" />
              <span className="ml-2 text-gray-600">Loading orders...</span>
            </div>
          ) : (
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="hidden lg:table-cell px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{order.order_id}</div>
                    </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                              <span className="text-white text-xs sm:text-sm font-medium">
                                {order.customer_name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-2 sm:ml-3 lg:ml-4 min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {order.customer_name}
                        </div>
                            <div className="text-xs sm:text-sm text-gray-500 truncate">
                            {order.customer_phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.total_items} items
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 max-w-[150px] lg:max-w-xs truncate">
                          {order.item_names}
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(order.total_amount)}
                      </div>
                    </td>
                      <td className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1 hidden sm:inline">{order.status}</span>
                          </span>
                        </div>
                    </td>
                      <td className="hidden lg:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.created_at)}
                    </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowOrderModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1 p-1 sm:p-2 rounded hover:bg-blue-50"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline text-xs">View</span>
                          </button>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="text-xs sm:text-sm border border-gray-300 rounded px-1 sm:px-2 py-1 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="New">New</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 sm:p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold">Order Details</h2>
                    <p className="text-white/80 text-sm">#{selectedOrder.order_id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold mb-4 text-blue-800">Customer Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                        <span className="font-medium text-gray-700">Name:</span>
                        <span className="ml-2 text-gray-900">{selectedOrder.customer_name}</span>
                      </div>
                  </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                        <span className="font-medium text-gray-700">Phone:</span>
                        <span className="ml-2 text-gray-900">{selectedOrder.customer_phone}</span>
                      </div>
                  </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="ml-2 text-gray-900 break-all">{selectedOrder.customer_email}</span>
                      </div>
                  </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6 rounded-xl border border-green-200">
                  <h3 className="text-lg font-semibold mb-4 text-green-800">Order Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                        <span className="font-medium text-gray-700">Status:</span>
                    <span className={`ml-2 inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      <span className="ml-1">{selectedOrder.status}</span>
                    </span>
                  </div>
                  </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                        <span className="font-medium text-gray-700">Total Items:</span>
                        <span className="ml-2 text-gray-900">{selectedOrder.total_items}</span>
                  </div>
                </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <span className="font-medium text-gray-700">Total Amount:</span>
                        <span className="ml-2 text-gray-900 font-bold">{formatCurrency(selectedOrder.total_amount)}</span>
              </div>
                  </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <span className="font-medium text-gray-700">Date:</span>
                        <span className="ml-2 text-gray-900">{formatDate(selectedOrder.created_at)}</span>
                  </div>
                  </div>
                  </div>
                </div>
              </div>
              {selectedOrder.items && selectedOrder.items.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
                  <div className="bg-gray-50 px-4 sm:px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Order Items</h3>
            </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead className="bg-gray-50">
                    <tr>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                          <th className="hidden sm:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                          <th className="hidden sm:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedOrder.items.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gray-900">{item.product_name}</td>
                            <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-sm text-gray-600">{item.size}</td>
                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-600">{item.quantity}</td>
                            <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-sm text-gray-600">{formatCurrency(item.price)}</td>
                            <td className="px-4 sm:px-6 py-4 text-sm font-semibold text-gray-900">
                              {formatCurrency(item.quantity * item.price)}
                            </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
              )}
              <div className="flex justify-end pt-6">
              <button
                onClick={() => setShowOrderModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;

