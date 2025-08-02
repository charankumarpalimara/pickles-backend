import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  User, 
  Package, 
  DollarSign, 
  Calendar, 
  RefreshCw, 
  Search, 
  Filter,
  Eye,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCart, setSelectedCart] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);

  // Fetch carts from backend
  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/cart');
      const data = await response.json();
      console.log('Carts data:', data); // Debug: Log the carts data
      
      if (data.success && data.data) {
        // Transform the data to group by user_id
        const cartMap = new Map();
        
        data.data.forEach(item => {
          const userId = item.user_id;
          if (!cartMap.has(userId)) {
            // Extract user information from the user object
            let userName = `User ${userId}`;
            let userEmail = 'N/A';
            
            if (item.user) {
              const fullName = `${item.user.first_name || ''} ${item.user.last_name || ''}`.trim();
              userName = fullName || item.user.username || `User ${userId}`;
              userEmail = item.user.email || 'N/A';
            }
            
            cartMap.set(userId, {
              id: userId,
              user_id: userId,
              user_name: userName,
              user_email: userEmail,
              items: [],
              total_amount: 0,
              status: 'active',
              created_at: new Date().toISOString(),
              items_count: 0
            });
          }
          
          const cart = cartMap.get(userId);
          cart.items.push({
            product_name: item.product_name,
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price),
            weight: item.weight,
            type: item.type,
            image_url: item.image_url
          });
          cart.total_amount += parseFloat(item.price) * parseInt(item.quantity);
          cart.items_count = cart.items.length;
        });
        
        setCarts(Array.from(cartMap.values()));
      } else {
        setCarts([]);
      }
    } catch (error) {
      console.error('Error fetching carts:', error);
      setCarts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      // Use Promise.race to add a timeout for faster feedback
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const fetchPromise = fetch('http://localhost:3000/api/cart');
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      const data = await response.json();
      
      if (data.success && data.data) {
        // Transform the data to group by user_id
        const cartMap = new Map();
        
        data.data.forEach(item => {
          const userId = item.user_id;
          if (!cartMap.has(userId)) {
            // Extract user information from the user object
            let userName = `User ${userId}`;
            let userEmail = 'N/A';
            
            if (item.user) {
              const fullName = `${item.user.first_name || ''} ${item.user.last_name || ''}`.trim();
              userName = fullName || item.user.username || `User ${userId}`;
              userEmail = item.user.email || 'N/A';
            }
            
            cartMap.set(userId, {
              id: userId,
              user_id: userId,
              user_name: userName,
              user_email: userEmail,
              items: [],
              total_amount: 0,
              status: 'active',
              created_at: new Date().toISOString(),
              items_count: 0
            });
          }
          
          const cart = cartMap.get(userId);
          cart.items.push({
            product_name: item.product_name,
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price),
            weight: item.weight,
            type: item.type,
            image_url: item.image_url
          });
          cart.total_amount += parseFloat(item.price) * parseInt(item.quantity);
          cart.items_count = cart.items.length;
        });
        
        setCarts(Array.from(cartMap.values()));
      } else {
        setCarts([]);
      }
    } catch (error) {
      console.error('Error refreshing carts:', error);
      setCarts([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteCart = async (cartId) => {
    if (window.confirm('Are you sure you want to delete this cart?')) {
      try {
        // Since the API returns individual items, we need to delete all items for this user
        const response = await fetch(`http://localhost:3000/api/cart/${cartId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          fetchCarts();
          alert('Cart deleted successfully!');
        } else {
          alert('Failed to delete cart');
        }
      } catch (error) {
        console.error('Error deleting cart:', error);
        alert('Error deleting cart');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'abandoned': return 'bg-red-100 text-red-800';
      case 'converted': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return <Clock className="w-4 h-4" />;
      case 'abandoned': return <AlertTriangle className="w-4 h-4" />;
      case 'converted': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
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

  const filteredCarts = carts.filter(cart => {
    const matchesSearch = 
      (cart.user_id?.toString().includes(searchTerm) || '') ||
      (cart.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (cart.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) || '');
    const matchesStatus = statusFilter === 'all' || cart.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Carts</h1>
          <p className="text-gray-600">Manage and monitor user shopping carts</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Carts</p>
              <p className="text-2xl font-bold text-gray-900">{carts.length}</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Carts</p>
              <p className="text-2xl font-bold text-green-600">
                {carts.filter(c => c.status?.toLowerCase() === 'active').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-green-600" />
          </div>
        </div>
        {/* <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Abandoned Carts</p>
              <p className="text-2xl font-bold text-red-600">
                {carts.filter(c => c.status?.toLowerCase() === 'abandoned').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div> */}
        {/* <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Converted Carts</p>
              <p className="text-2xl font-bold text-blue-600">
                {carts.filter(c => c.status?.toLowerCase() === 'converted').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
        </div> */}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by user ID, name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="abandoned">Abandoned</option>
            <option value="converted">Converted</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Carts Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <RefreshCw className="w-6 h-6 animate-spin text-orange-500" />
              <span className="ml-2 text-gray-600">Loading carts...</span>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cart ID</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="hidden sm:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="hidden lg:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCarts.length > 0 ? (
                  filteredCarts.map((cart) => (
                    <tr key={cart.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{cart.id}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-[#8B4513] flex items-center justify-center">
                              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                          </div>
                          <div className="ml-2 sm:ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {cart.user_name || `User ${cart.user_id}`}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500">
                              {cart.user_email || 'No email'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {cart.items_count || cart.items?.length || 0} items
                        </div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {cart.items?.map(item => item.product_name).join(', ')}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(cart.total_amount)}
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(cart.status)}`}>
                            {getStatusIcon(cart.status)}
                            <span className="ml-1">{cart.status || 'Unknown'}</span>
                          </span>
                        </div>
                      </td>
                      <td className="hidden lg:table-cell px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(cart.created_at || cart.createdAt)}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedCart(cart);
                              setShowCartModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          {/* <button
                            onClick={() => deleteCart(cart.id)}
                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      No carts found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Cart Details Modal */}
      {showCartModal && selectedCart && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 sm:p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Cart Details</h2>
                    <p className="text-white/80 text-sm">#{selectedCart.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCartModal(false)}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
                {/* User Information */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-800">
                    <User className="w-5 h-5 mr-2" />
                    User Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <span className="font-medium text-gray-700">User ID:</span>
                        <span className="ml-2 text-gray-900 break-all">{selectedCart.user_id}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <span className="font-medium text-gray-700">Name:</span>
                        <span className="ml-2 text-gray-900">{selectedCart.user_name || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="ml-2 text-gray-900 break-all">{selectedCart.user_email || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cart Information */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6 rounded-xl border border-green-200">
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-green-800">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Cart Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <span className="font-medium text-gray-700">Status:</span>
                        <span className={`ml-2 inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedCart.status)}`}>
                          {getStatusIcon(selectedCart.status)}
                          <span className="ml-1">{selectedCart.status || 'Unknown'}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <span className="font-medium text-gray-700">Total Items:</span>
                        <span className="ml-2 text-gray-900">{selectedCart.items_count || selectedCart.items?.length || 0}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <span className="font-medium text-gray-700">Total Amount:</span>
                        <span className="ml-2 text-gray-900 font-bold">{formatCurrency(selectedCart.total_amount)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <span className="font-medium text-gray-700">Created:</span>
                        <span className="ml-2 text-gray-900">{formatDate(selectedCart.created_at || selectedCart.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              {selectedCart.items && selectedCart.items.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-gray-50 px-4 sm:px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Package className="w-5 h-5 mr-2 text-[#8B4513]" />
                      Cart Items
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                          <th className="hidden sm:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                          <th className="hidden sm:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        </tr>
                      </thead>
                       <tbody className="bg-white divide-y divide-gray-200">
                         {selectedCart.items.map((item, index) => (
                           <tr key={index} className="hover:bg-gray-50 transition-colors">
                             <td className="px-4 sm:px-6 py-4">
                               <div className="flex items-center">
                                 {item.image_url && (
                                   <img 
                                     src={item.image_url} 
                                     alt={item.product_name}
                                     className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover mr-2 sm:mr-3"
                                   />
                                 )}
                                 <div>
                                   <div className="text-sm font-medium text-gray-900">{item.product_name}</div>
                                 </div>
                               </div>
                             </td>
                             <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-sm text-gray-600">{item.type || 'N/A'}</td>
                             <td className="hidden md:table-cell px-4 sm:px-6 py-4 text-sm text-gray-600">{item.weight || 'N/A'}</td>
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

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowCartModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {/* <button
                  onClick={() => {
                    deleteCart(selectedCart.id);
                    setShowCartModal(false);
                  }}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm hover:shadow-md"
                >
                  Delete Cart
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 