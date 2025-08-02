import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        animation: 'float 20s ease-in-out infinite'
      }}></div>

      <div style={{
        textAlign: 'center',
        maxWidth: '900px',
        padding: '60px 30px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'relative',
        zIndex: 1
      }}>
        <h1 style={{
          fontSize: '3.8rem',
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: '800',
          letterSpacing: '-2px'
        }}>
          Welcome to ShipSync
        </h1>

        <p style={{
          fontSize: '1.3rem',
          marginBottom: '1rem',
          color: '#4a5568',
          lineHeight: '1.7',
          fontWeight: '400'
        }}>
          A simple order management system for learning Spring Boot and React basics.
        </p>

        <p style={{
          fontSize: '1.3rem',
          marginBottom: '3rem',
          color: '#718096',
          lineHeight: '1.7',
          fontWeight: '400'
        }}>
          Manage products, create orders, and track everything easily.
        </p>

        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '40px'
        }}>
          <Link
            to="/signup"
            style={{
              fontSize: '1.1rem',
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              border: 'none',
              borderRadius: '12px',
              textDecoration: 'none',
              color: 'white',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
              display: 'inline-block',
              transform: 'translateY(0)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
            }}
          >
            Get Started
          </Link>

          <Link
            to="/login"
            style={{
              fontSize: '1.1rem',
              padding: '16px 32px',
              border: '2px solid #667eea',
              backgroundColor: 'transparent',
              color: '#667eea',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              display: 'inline-block',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#667eea';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#667eea';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Login
          </Link>
        </div>

        {/* Feature highlights */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          marginTop: '50px',
          padding: '30px 0'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2d3748', marginBottom: '8px', fontWeight: '600' }}>
              Easy Setup
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#718096', lineHeight: '1.5' }}>
              Quick registration and intuitive interface
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2d3748', marginBottom: '8px', fontWeight: '600' }}>
              Product Management
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#718096', lineHeight: '1.5' }}>
              Organize and track your inventory
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2d3748', marginBottom: '8px', fontWeight: '600' }}>
              Order Tracking
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#718096', lineHeight: '1.5' }}>
              Monitor orders from start to finish
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
