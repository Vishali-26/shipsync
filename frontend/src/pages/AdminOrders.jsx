import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminOrders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is admin
  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/admin/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8081/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStatus)
      });
      
      if (response.ok) {
        fetchOrders(); // Refresh the orders list
      }
    } catch (error) {
      console.error('Error updating order status:', error);
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

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="admin-orders-page">
      <div className="admin-header">
        <h1>Manage Orders</h1>
        <p>Total Orders: {orders.length}</p>
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>User ID</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Shipping Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>{order.userId}</td>
                <td>${order.totalAmount}</td>
                <td>
                  <span 
                    className="status-badge" 
                    style={{ 
                      backgroundColor: getStatusColor(order.status),
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{order.shippingAddress}</td>
                <td>
                  <select 
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {orders.length === 0 && (
          <p>No orders found.</p>
        )}
      </div>

      <div className="order-stats">
        <h3>Order Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <h4>Pending</h4>
            <p>{orders.filter(o => o.status === 'PENDING').length}</p>
          </div>
          <div className="stat-card">
            <h4>Processing</h4>
            <p>{orders.filter(o => o.status === 'PROCESSING').length}</p>
          </div>
          <div className="stat-card">
            <h4>Shipped</h4>
            <p>{orders.filter(o => o.status === 'SHIPPED').length}</p>
          </div>
          <div className="stat-card">
            <h4>Delivered</h4>
            <p>{orders.filter(o => o.status === 'DELIVERED').length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
