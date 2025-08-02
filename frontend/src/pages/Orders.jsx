import React, { useState, useEffect } from 'react';

const Orders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/api/customer/orders/${user.id}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'PENDING': '#ffa500',
      'CONFIRMED': '#007bff',
      'PROCESSING': '#6f42c1',
      'SHIPPED': '#17a2b8',
      'DELIVERED': '#28a745',
      'CANCELLED': '#dc3545'
    };
    return colors[status] || '#6c757d';
  };



  if (!user) {
    return (
      <div className="orders-page">
        <h1>Please login to view your orders</h1>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track your order status here</p>
      </div>

      <div className="orders-list">
        {orders.length > 0 ? (
          <div className="orders-grid">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h3>Order #{order.orderNumber}</h3>
                  <span
                    className="status-badge"
                    style={{
                      backgroundColor: getStatusColor(order.status),
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="order-details">
                  <p><strong>Total:</strong> ${order.totalAmount}</p>
                  <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-orders">
            <p>You haven't placed any orders yet.</p>
            <p>Start shopping to see your orders here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
