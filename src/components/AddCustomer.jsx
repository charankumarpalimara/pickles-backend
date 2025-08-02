
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddCustomer = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    mobile: '',
    username: '',
    address: '',
    city: '',
    state: '',
    postalcode: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      // Compose payload for backend
      const payload = {
        name: form.name || form.first_name + (form.last_name ? ' ' + form.last_name : ''),
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        mobile: form.mobile,
        username: form.username,
        address: form.address,
        city: form.city,
        state: form.state,
        postalcode: form.postalcode,
        password: form.password,
      };
      const res = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result?.message || 'Failed to add customer');
        setLoading(false);
        return;
      }
      navigate('/customers');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Customer</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input name="first_name" value={form.first_name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" placeholder="Enter first name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input name="last_name" value={form.last_name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Enter last name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input name="username" value={form.username} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" placeholder="Enter username" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" placeholder="Enter email address" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
            <input name="mobile" value={form.mobile} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" placeholder="Enter mobile number" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" placeholder="Enter password" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input name="address" value={form.address} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Enter address" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input name="city" value={form.city} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Enter city" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input name="state" value={form.state} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Enter state" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
            <input name="postalcode" value={form.postalcode} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Enter postal code" />
          </div>
          <div className="flex items-end justify-end md:col-span-2 gap-2 mt-4">
            <button type="button" onClick={() => navigate('/customers')} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#A0522D]">
              {loading ? 'Adding...' : 'Add Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
