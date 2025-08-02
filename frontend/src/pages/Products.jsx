import React, { useState, useEffect } from 'react';

const Products = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/customer/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    ));
  };

  const placeOrder = async () => {
    if (!user) {
      alert('Please login to place an order');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingAddress = prompt('Enter your shipping address:');

    if (!shippingAddress) return;

    try {
      const response = await fetch('http://localhost:8081/api/customer/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          totalAmount: totalAmount,
          shippingAddress: shippingAddress
        })
      });

      if (response.ok) {
        alert('Order placed successfully!');
        setCart([]);
        setShowCart(false);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };



  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Browse Products</h1>
        {user && (
          <button
            onClick={() => setShowCart(!showCart)}
            className="btn btn-primary"
          >
            Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        )}
      </div>

      {showCart && user && (
        <div className="cart-section">
          <h3>Shopping Cart</h3>
          {cart.length > 0 ? (
            <div>
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <span>{item.name}</span>
                  <div className="quantity-controls">
                    <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  <button onClick={() => removeFromCart(item.id)} className="btn btn-danger btn-small">
                    Remove
                  </button>
                </div>
              ))}
              <div className="cart-total">
                <strong>Total: ₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</strong>
              </div>
              <button onClick={placeOrder} className="btn btn-success">
                Place Order
              </button>
            </div>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
      )}

      <div className="products-grid">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-category">Category: {product.category}</p>
                <div className="product-details">
                  <span className="product-price">₹{product.price}</span>
                  <span className="product-stock">
                    {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
                  </span>
                </div>
                {user && product.stockQuantity > 0 && (
                  <button
                    onClick={() => addToCart(product)}
                    className="btn btn-primary"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
