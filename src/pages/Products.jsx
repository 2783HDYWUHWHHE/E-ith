import React, { useState } from 'react';
import { 
  FaPlus, 
  FaSearch, 
  FaEdit, 
  FaTrashAlt, 
  FaTimes, 
  FaTh, 
  FaList, 
  FaLaptop, 
  FaTshirt, 
  FaGem, 
  FaHome,
  FaBoxOpen
} from 'react-icons/fa';

export default function Products() {
  // Mock products database
  const [products, setProducts] = useState([
    { id: 1, name: 'Pro Gaming Laptop', sku: 'LTP-1092', category: 'Electronics', price: 1299.99, stock: 45, maxStock: 100, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=512' },
    { id: 2, name: 'Samsung Galaxy S26 Ultra', sku: 'SMG-2601', category: 'Electronics', price: 1199.99, stock: 12, maxStock: 80, image: '/phone.jpg' },
    { id: 3, name: 'Vivo X300 Pro', sku: 'VVO-3001', category: 'Apparel', price: 899.99, stock: 8, maxStock: 40, image: '/vivo.jpg' },
    { id: 4, name: 'Smart Fitness Band', sku: 'FIT-091', category: 'Electronics', price: 79.99, stock: 92, maxStock: 150, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=512' },
    { id: 5, name: 'Oppo Find X9 Ultra', sku: 'OPP-9901', category: 'Accessories', price: 999.99, stock: 3, maxStock: 15, image: '/oppo.png' },
    { id: 6, name: 'OnePlus 12', sku: 'ONP-1201', category: 'Home', price: 799.99, stock: 0, maxStock: 30, image: '/oneplus12.jpg' }
  ]);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formCategory, setFormCategory] = useState('Electronics');
  const [formPrice, setFormPrice] = useState('');
  const [formStock, setFormStock] = useState('');
  const [formMaxStock, setFormMaxStock] = useState('');
  const [formImage, setFormImage] = useState('');

  // Handle filtering
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                          product.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setModalMode('add');
    setFormName('');
    setFormSku('');
    setFormCategory('Electronics');
    setFormPrice('');
    setFormStock('');
    setFormMaxStock('100');
    setFormImage('');
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setModalMode('edit');
    setFormName(product.name);
    setFormSku(product.sku);
    setFormCategory(product.category);
    setFormPrice(product.price.toString());
    setFormStock(product.stock.toString());
    setFormMaxStock(product.maxStock.toString());
    setFormImage(product.image || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formSku || !formPrice || !formStock) return;

    const parsedPrice = parseFloat(formPrice);
    const parsedStock = parseInt(formStock);
    const parsedMaxStock = parseInt(formMaxStock) || 100;
    const defaultImage = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=512';

    if (modalMode === 'add') {
      const newProduct = {
        id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name: formName,
        sku: formSku,
        category: formCategory,
        price: parsedPrice,
        stock: parsedStock,
        maxStock: parsedMaxStock,
        image: formImage || defaultImage
      };
      setProducts([...products, newProduct]);
    } else {
      setProducts(products.map(p => p.id === selectedProduct.id ? { 
        ...p, 
        name: formName, 
        sku: formSku, 
        category: formCategory, 
        price: parsedPrice, 
        stock: parsedStock,
        maxStock: parsedMaxStock,
        image: formImage || defaultImage
      } : p));
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  // Helper icons for categories
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Electronics':
        return <FaLaptop className="w-5 h-5 text-blue-400" />;
      case 'Apparel':
        return <FaTshirt className="w-5 h-5 text-pink-400" />;
      case 'Accessories':
        return <FaGem className="w-5 h-5 text-purple-400" />;
      case 'Home':
        return <FaHome className="w-5 h-5 text-amber-400" />;
      default:
        return <FaBoxOpen className="w-5 h-5 text-teal-400" />;
    }
  };

  // Stock status text & color
  const getStockStatus = (stock, max) => {
    const ratio = stock / max;
    if (stock === 0) return { label: 'Out of Stock', color: 'text-red-400 bg-red-500/10 border-red-500/20', barColor: 'bg-red-500' };
    if (ratio < 0.15) return { label: 'Low Stock', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', barColor: 'bg-amber-500' };
    return { label: 'In Stock', color: 'text-green-400 bg-green-500/10 border-green-500/20', barColor: 'bg-green-500' };
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Product Inventory</h2>
          <p className="text-white/50 text-xs mt-1">Monitor stocks, unit prices, product codes, and categories.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-semibold tracking-wider transition-all duration-200 shadow-lg shadow-blue-500/15 cursor-pointer"
        >
          <FaPlus className="w-3 h-3" />
          <span>ADD NEW PRODUCT</span>
        </button>
      </div>

      {/* Control filters bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Search + Category Filter */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="flex items-center bg-[#1e1e30] border border-white/5 px-4 py-2 rounded-full w-56 sm:w-64">
            <FaSearch className="text-white/40 w-3.5 h-3.5 mr-2.5" />
            <input
              type="text"
              placeholder="Search SKU or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none text-white text-xs w-full focus:outline-none placeholder-white/30"
            />
          </div>

          {/* Category Pill Filters */}
          <div className="flex items-center bg-[#1e1e30] border border-white/5 p-1 rounded-full text-[10px] font-bold">
            {['All', 'Electronics', 'Apparel', 'Accessories', 'Home'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                  categoryFilter === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Right: View Mode Toggle */}
        <div className="flex items-center space-x-1.5 bg-[#1e1e30] border border-white/5 p-1 rounded-full self-end sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-full transition-all ${
              viewMode === 'grid' ? 'bg-blue-600 text-white shadow-md' : 'text-white/50 hover:text-white'
            }`}
            title="Grid View"
          >
            <FaTh className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-full transition-all ${
              viewMode === 'list' ? 'bg-blue-600 text-white shadow-md' : 'text-white/50 hover:text-white'
            }`}
            title="List View"
          >
            <FaList className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main product display area */}
      {filteredProducts.length > 0 ? (
        viewMode === 'grid' ? (
          /* Grid View Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => {
              const stockStatus = getStockStatus(product.stock, product.maxStock);
              const progressPercent = Math.min((product.stock / product.maxStock) * 100, 100);

              return (
                <div key={product.id} className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-white/5 relative overflow-hidden group">
                  {/* Product Visual */}
                  <div className="w-full h-40 bg-[#141526] border border-white/5 rounded-xl overflow-hidden mb-4 relative">
                    <img 
                      src={product.image || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=512'} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Floating Category Icon and Stock Badge */}
                    <div className="absolute inset-x-3 top-3 flex justify-between items-start">
                      <div className="p-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-white">
                        {getCategoryIcon(product.category)}
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border backdrop-blur-md ${stockStatus.color}`}>
                        {stockStatus.label}
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="mb-4">
                    <span className="text-[10px] text-white/40 font-semibold tracking-wider block mb-1">{product.sku}</span>
                    <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">{product.name}</h4>
                    <div className="text-xl font-extrabold text-white mt-2">${product.price.toFixed(2)}</div>
                  </div>

                  {/* Stock Progress Bar */}
                  <div className="space-y-1.5 mb-6">
                    <div className="flex justify-between text-[10px] text-white/50">
                      <span>Stock level</span>
                      <span className="font-semibold">{product.stock} / {product.maxStock} units</span>
                    </div>
                    <div className="w-full bg-[#141526] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${stockStatus.barColor} rounded-full transition-all duration-500`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-[10px] text-white/35 font-bold uppercase tracking-widest">{product.category}</span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-2 text-white/60 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-all"
                        title="Edit Product"
                      >
                        <FaEdit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-white/60 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all"
                        title="Delete Product"
                      >
                        <FaTrashAlt className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List/Table View Layout */
          <div className="glass-card rounded-2xl overflow-hidden border border-white/5 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-[#17182b]/50 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                    <th className="py-4 px-6">Product Details</th>
                    <th className="py-4 px-6">SKU</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6">Stock Status</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {filteredProducts.map(product => {
                    const stockStatus = getStockStatus(product.stock, product.maxStock);
                    return (
                      <tr key={product.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6 flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-[#141526]">
                            <img 
                              src={product.image || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=512'} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-semibold text-white text-sm block">{product.name}</span>
                            <span className="text-[10px] text-white/30 sm:hidden block">{product.sku}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 align-middle font-semibold text-white/65">
                          {product.sku}
                        </td>
                        <td className="py-4 px-6 align-middle text-white/70">
                          {product.category}
                        </td>
                        <td className="py-4 px-6 align-middle font-bold text-white text-sm">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="py-4 px-6 align-middle">
                          <div className="flex items-center space-x-3">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${stockStatus.color}`}>
                              {stockStatus.label}
                            </span>
                            <span className="text-white/40 text-[10px]">{product.stock} left</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 align-middle text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => openEditModal(product)}
                              className="p-2 text-white/60 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-all"
                            >
                              <FaEdit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="p-2 text-white/60 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all"
                            >
                              <FaTrashAlt className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        <div className="glass-card rounded-2xl py-16 text-center text-white/40 font-medium">
          No products match the selected search & filter conditions.
        </div>
      )}

      {/* Create / Edit Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          
          <div className="relative w-full max-w-md bg-[#1e1e30] border border-white/10 rounded-2xl p-6 shadow-2xl z-10 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                {modalMode === 'add' ? 'Create New Catalog Item' : 'Edit Catalog Details'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UltraFit Gym Gloves"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                />
              </div>

              {/* SKU & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">SKU Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GLO-082"
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-lg custom-input bg-[#141526]"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Home">Home</option>
                  </select>
                </div>
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">Unit Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="49.99"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">In Stock</label>
                  <input
                    type="number"
                    required
                    placeholder="12"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">Max Cap</label>
                  <input
                    type="number"
                    required
                    placeholder="100"
                    value={formMaxStock}
                    onChange={(e) => setFormMaxStock(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                  />
                </div>
              </div>

              {/* Image URL input */}
              <div>
                <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">Product Image URL</label>
                <input
                  type="url"
                  placeholder="Paste Unsplash or external image URL..."
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-white/10 hover:bg-white/5 text-white rounded-lg text-xs font-semibold tracking-wider transition-all"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold tracking-wider transition-all shadow-md shadow-blue-500/10"
                >
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
