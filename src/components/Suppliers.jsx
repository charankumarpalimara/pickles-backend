import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Search, 
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Package
} from 'lucide-react';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for suppliers
      const mockSuppliers = [
        {
          id: 1,
          name: 'Fresh Pickle Supplies',
          contact_person: 'John Smith',
          phone: '+91 98765 43210',
          email: 'john@freshpickles.com',
          address: '123 Pickle Street, Mumbai',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
          products: ['Cucumber', 'Lemon', 'Mango'],
          status: 'Active',
          rating: 4.5,
          total_orders: 45
        },
        {
          id: 2,
          name: 'Spice Traders Co.',
          contact_person: 'Sarah Johnson',
          phone: '+91 98765 43211',
          email: 'sarah@spicetraders.com',
          address: '456 Spice Road, Delhi',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110001',
          products: ['Red Chilli', 'Turmeric', 'Coriander'],
          status: 'Active',
          rating: 4.2,
          total_orders: 32
        },
        {
          id: 3,
          name: 'Organic Farms Ltd.',
          contact_person: 'Mike Wilson',
          phone: '+91 98765 43212',
          email: 'mike@organicfarms.com',
          address: '789 Farm Lane, Bangalore',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560001',
          products: ['Organic Vegetables', 'Herbs'],
          status: 'Active',
          rating: 4.8,
          total_orders: 28
        }
      ];
      
      setSuppliers(mockSuppliers);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
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
      
      const fetchPromise = new Promise(resolve => 
        setTimeout(() => resolve({ success: true }), 2000)
      );
      
      await Promise.race([fetchPromise, timeoutPromise]);
      await fetchSuppliers();
    } catch (error) {
      console.error('Error refreshing suppliers:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalSuppliers = suppliers.length;
  const activeSuppliers = suppliers.filter(s => s.status === 'Active').length;
  const topRatedSuppliers = suppliers.filter(s => s.rating >= 4.5).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Suppliers</h1>
          <p className="text-gray-600">Manage your supplier relationships</p>
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
              <p className="text-sm font-medium text-gray-600">Total Suppliers</p>
              <p className="text-2xl font-bold text-gray-900">{totalSuppliers}</p>
            </div>
            <Truck className="w-8 h-8 text-orange-500" />
              </div>
            </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
              <p className="text-sm font-medium text-gray-600">Active Suppliers</p>
              <p className="text-2xl font-bold text-green-600">{activeSuppliers}</p>
            </div>
            <Package className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
              <p className="text-sm font-medium text-gray-600">Top Rated</p>
              <p className="text-2xl font-bold text-blue-600">{topRatedSuppliers}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
                          </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
              <p className="text-2xl font-bold text-purple-600">
                {suppliers.length > 0 ? (suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1) : '0.0'}
              </p>
                          </div>
            <Package className="w-8 h-8 text-purple-600" />
          </div>
                  </div>
                </div>
                
      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-12">
            <RefreshCw className="w-6 h-6 animate-spin text-orange-500" />
            <span className="ml-2 text-gray-600">Loading suppliers...</span>
                  </div>
        ) : suppliers.length > 0 ? (
          suppliers.map((supplier) => (
            <div key={supplier.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Truck className="w-6 h-6" />
                  </div>
                    <div>
                      <h3 className="text-lg font-semibold">{supplier.name}</h3>
                      <p className="text-white/80 text-sm">{supplier.contact_person}</p>
                  </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-300">★</span>
                      <span className="font-semibold">{supplier.rating}</span>
                </div>
                    <p className="text-white/80 text-xs">{supplier.total_orders} orders</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{supplier.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 break-all">{supplier.email}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="text-sm text-gray-600">
                      <p>{supplier.address}</p>
                      <p>{supplier.city}, {supplier.state} {supplier.pincode}</p>
                  </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Products</h4>
                  <div className="flex flex-wrap gap-2">
                    {supplier.products.map((product, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    supplier.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {supplier.status}
                  </span>
                  <button className="text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Truck className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">No suppliers found</p>
          </div>
        )}
          </div>
    </div>
  );
};

export default Suppliers;

