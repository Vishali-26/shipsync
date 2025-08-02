import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          ShipSync
        </Link>

        <div className="nav-menu">
          {/* Show navigation links only when user is logged in */}
          {user && (
            <>
              {/* Customer Navigation */}
              {user.role === 'CUSTOMER' && (
                <>
                  <Link to="/products" className="nav-link">
                    Browse Products
                  </Link>
                  <Link to="/orders" className="nav-link">
                    My Orders
                  </Link>
                </>
              )}

              {/* Admin Navigation */}
              {user.role === 'ADMIN' && (
                <>
                  <Link to="/admin/products" className="nav-link">
                    Manage Products
                  </Link>
                  <Link to="/admin/orders" className="nav-link">
                    All Orders
                  </Link>
                </>
              )}
            </>
          )}

          <div className="nav-auth">
            {user ? (
              <div className="user-menu">
                <span className="user-greeting">
                  Hello, {user.name}
                </span>
                <button onClick={handleLogout} className="btn btn-outline">
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
