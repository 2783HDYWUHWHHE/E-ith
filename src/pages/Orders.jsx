import React, { useState } from 'react';
import { FaSearch, FaEye, FaTimes, FaExchangeAlt, FaRegCalendarAlt, FaShippingFast, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function Orders() {
  // Mock orders database
  const [orders, setOrders] = useState([
    { 
      id: 'ORD-9821', 
      customer: 'Samath Long', 
      date: '2026-07-10', 
      total: 2499.98, 
      payment: 'Credit Card',
      status: 'Pending',
      address: 'No 15, St 271, Phnom Penh, Cambodia',
      items: [
        { name: 'Pro Gaming Laptop', qty: 1, price: 1299.99, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=256' },
        { name: 'Samsung Galaxy S24 Ultra', qty: 1, price: 1199.99, image: '/phone.jpg' }
      ]
    },
    { 
      id: 'ORD-9820', 
      customer: 'Sophea Kim', 
      date: '2026-07-09', 
      total: 899.99, 
      payment: 'PayPal',
      status: 'Shipped',
      address: 'Vimean Phnom Penh, Sen Sok, Cambodia',
      items: [
        { name: 'Vivo X100 Pro', qty: 1, price: 899.99, image: '/vivo.jpg' }
      ]
    },
    { 
      id: 'ORD-9819', 
      customer: 'Rithy Sok', 
      date: '2026-07-08', 
      total: 1999.98, 
      payment: 'Crypto',
      status: 'Completed',
      address: 'Street 51, BKK1, Phnom Penh, Cambodia',
      items: [
        { name: 'Oppo Find X9 Ultra', qty: 2, price: 999.99, image: '/oppo.png' }
      ]
    },
    { 
      id: 'ORD-9818', 
      customer: 'Vanna Meas', 
      date: '2026-07-05', 
      total: 79.99, 
      payment: 'Cash on Delivery',
      status: 'Cancelled',
      address: 'St 371, Steung Meanchey, Phnom Penh, Cambodia',
      items: [
        { name: 'Smart Fitness Band', qty: 1, price: 79.99, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=256' }
      ]
    },
    { 
      id: 'ORD-9817', 
      customer: 'Dara Pich', 
      date: '2026-07-04', 
      total: 2129.97, 
      payment: 'Credit Card',
      status: 'Completed',
      address: 'No 82, Toul Kork, Phnom Penh, Cambodia',
      items: [
        { name: 'Samsung Galaxy S24 Ultra', qty: 1, price: 1199.99, image: '/phone.jpg' },
        { name: 'OnePlus 12', qty: 1, price: 799.99, image: '/oneplus12.jpg' },
        { name: 'Smart Fitness Band', qty: 1, price: 129.99, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=256' }
      ]
    }
  ]);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter Logic
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) || 
                          order.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    setSelectedOrder(prev => prev && prev.id === orderId ? { ...prev, status: newStatus } : prev);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Shipped':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Completed':
        return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'Cancelled':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <FaExclamationCircle className="w-4 h-4 text-amber-400" />;
      case 'Shipped':
        return <FaShippingFast className="w-4 h-4 text-blue-400" />;
      case 'Completed':
        return <FaCheckCircle className="w-4 h-4 text-green-400" />;
      case 'Cancelled':
        return <FaTimes className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Order Management</h2>
          <p className="text-white/50 text-xs mt-1">Review orders, update delivery statuses, and audit billing transactions.</p>
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="flex items-center bg-[#1e1e30] border border-white/5 px-4 py-2.5 rounded-full w-full sm:w-80">
          <FaSearch className="text-white/40 w-3.5 h-3.5 mr-2.5" />
          <input
            type="text"
            placeholder="Search Order ID or Customer Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none text-white text-xs w-full focus:outline-none placeholder-white/30"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex items-center bg-[#1e1e30] border border-white/5 p-1 rounded-full text-[10px] font-bold self-start sm:self-auto overflow-x-auto max-w-full">
          {['All', 'Pending', 'Shipped', 'Completed', 'Cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 shrink-0 ${
                statusFilter === status
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {status.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Directory Table */}
      <div className="glass-card rounded-2xl overflow-hidden border border-white/5 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-[#17182b]/50 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-center">Items</th>
                <th className="py-4 px-6">Payment</th>
                <th className="py-4 px-6">Total</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    {/* Order ID */}
                    <td className="py-4 px-6 align-middle font-bold text-blue-400">
                      {order.id}
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-6 align-middle font-semibold text-white">
                      {order.customer}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 align-middle text-white/60 flex items-center space-x-2">
                      <FaRegCalendarAlt className="w-3.5 h-3.5 text-white/30" />
                      <span>{order.date}</span>
                    </td>

                    {/* Items Quantity */}
                    <td className="py-4 px-6 align-middle text-center font-medium text-white/80">
                      {order.items.reduce((sum, item) => sum + item.qty, 0)}
                    </td>

                    {/* Payment Method */}
                    <td className="py-4 px-6 align-middle text-white/75">
                      {order.payment}
                    </td>

                    {/* Total Price */}
                    <td className="py-4 px-6 align-middle font-bold text-white text-sm">
                      ${order.total.toFixed(2)}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6 align-middle">
                      <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getStatusBadge(order.status)}`}>
                        <span className="w-1 h-1 rounded-full bg-current" />
                        <span>{order.status}</span>
                      </span>
                    </td>

                    {/* Details Action */}
                    <td className="py-4 px-6 align-middle text-center">
                      <button
                        onClick={() => viewOrderDetails(order)}
                        className="p-2 text-white/60 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-all cursor-pointer"
                        title="View Receipt Details"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-white/40 font-medium">
                    No orders match your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal Overlay */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          
          <div className="relative w-full max-w-lg bg-[#1e1e30] border border-white/10 rounded-2xl p-6 shadow-2xl z-10 animate-fade-in-up">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-bold text-white tracking-wider flex items-center space-x-2">
                  <span>Order Invoice:</span>
                  <span className="text-blue-400 font-extrabold">{selectedOrder.id}</span>
                </h3>
                <span className="text-white/40 text-[10px] block mt-0.5">Placed on {selectedOrder.date}</span>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-6">
              {/* Order Status Manager */}
              <div className="bg-[#141526]/55 border border-white/5 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-2.5">
                  {getStatusIcon(selectedOrder.status)}
                  <div>
                    <span className="text-white/40 text-[9px] font-bold uppercase block">Shipping Status</span>
                    <span className="font-semibold text-white text-xs">{selectedOrder.status}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <FaExchangeAlt className="w-3 h-3 text-white/30" />
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                    className="px-3 py-1.5 text-[11px] rounded-lg custom-input bg-[#141526] font-semibold border-white/10"
                  >
                    <option value="Pending">Set Pending</option>
                    <option value="Shipped">Set Shipped</option>
                    <option value="Completed">Set Completed</option>
                    <option value="Cancelled">Set Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase block">Purchased Items</span>
                <div className="divide-y divide-white/5 border-y border-white/5 py-1">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2.5 text-xs">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-[#141526]">
                          <img 
                            src={item.image || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=256'} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-white">{item.name}</div>
                          <div className="text-white/40 text-[10px] mt-0.5">Quantity: {item.qty}</div>
                        </div>
                      </div>
                      <div className="font-semibold text-white/90">
                        ${(item.price * item.qty).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">Customer info</span>
                  <div className="font-semibold text-white">{selectedOrder.customer}</div>
                  <div className="text-white/50 text-[11px] mt-0.5">Payment: {selectedOrder.payment}</div>
                </div>
                <div>
                  <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">Delivery Address</span>
                  <div className="text-white/80 text-[11px] leading-relaxed">{selectedOrder.address}</div>
                </div>
              </div>

              {/* Totals Summary */}
              <div className="pt-4 border-t border-white/5 flex justify-between items-center text-sm">
                <span className="font-bold text-white/50">Total Billing:</span>
                <span className="text-lg font-black text-white">${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold tracking-wider transition-all shadow-md"
              >
                CLOSE INVOICE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
