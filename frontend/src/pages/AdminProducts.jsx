import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProducts = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    category: ''
  });
  const navigate = useNavigate();

  // Check if user is admin
  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/login');
      return;
    }
    fetchProducts();
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/admin/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
          stockQuantity: parseInt(newProduct.stockQuantity)
        })
      });
      
      if (response.ok) {
        setNewProduct({ name: '', description: '', price: '', stockQuantity: '', category: '' });
        setShowAddForm(false);
        fetchProducts();
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/api/admin/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingProduct,
          price: parseFloat(editingProduct.price),
          stockQuantity: parseInt(editingProduct.stockQuantity)
        })
      });
      
      if (response.ok) {
        setEditingProduct(null);
        fetchProducts();
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:8081/api/admin/products/${productId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          fetchProducts();
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="admin-products-page">
      <div className="admin-header">
        <h1>Manage Products</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="btn btn-primary"
        >
          {showAddForm ? 'Cancel' : 'Add New Product'}
        </button>
      </div>

      {showAddForm && (
        <div className="add-product-form">
          <h3>Add New Product</h3>
          <form onSubmit={handleAddProduct}>
            <div className="form-group">
              <label>Product Name:</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Stock Quantity:</label>
              <input
                type="number"
                value={newProduct.stockQuantity}
                onChange={(e) => setNewProduct({...newProduct, stockQuantity: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <input
                type="text"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </form>
        </div>
      )}

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="text"
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                    />
                  ) : (
                    product.category
                  )}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="number"
                      step="0.01"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                    />
                  ) : (
                    `$${product.price}`
                  )}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="number"
                      value={editingProduct.stockQuantity}
                      onChange={(e) => setEditingProduct({...editingProduct, stockQuantity: e.target.value})}
                    />
                  ) : (
                    product.stockQuantity
                  )}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <>
                      <button onClick={handleEditProduct} className="btn btn-success btn-small">Save</button>
                      <button onClick={() => setEditingProduct(null)} className="btn btn-secondary btn-small">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setEditingProduct(product)} className="btn btn-primary btn-small">Edit</button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="btn btn-danger btn-small">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
