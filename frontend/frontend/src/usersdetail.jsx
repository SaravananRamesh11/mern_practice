import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // ⬅️ Get token from localStorage

      const response = await axios.get("http://localhost:3000/api/vista/getall", {
        headers: {
          Authorization: `Bearer ${token}` // ⬅️ Attach token to request
        }
      });

      if (response.data && Array.isArray(response.data.summas)) {
        setUsers(response.data.summas);
      } else {
        throw new Error('Invalid data format: expected array in "summas" field');
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  fetchUsers(); // ⬅️ Don't forget to call the function
}, []);


  const getRoleColor = (role) => {
    switch(role.toLowerCase()) { // Case-insensitive check
      case 'admin': return '#f44336';
      case 'editor': return '#2196f3';
      default: return '#4caf50';
    }
  };

  // Styles
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    },
    header: {
      color: '#333',
      textAlign: 'center',
      marginBottom: '20px'
    },
    table: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    row: {
      display: 'flex',
      borderBottom: '1px solid #eee',
      padding: '12px 15px'
    },
    headerRow: {
      backgroundColor: '#f5f5f5',
      fontWeight: 'bold'
    },
    cell: {
      flex: 1,
      padding: '8px'
    },
    roleBadge: {
      padding: '4px 8px',
      borderRadius: '12px',
      color: 'white',
      fontSize: '0.8rem',
      display: 'inline-block'
    },
    error: {
      color: 'red',
      textAlign: 'center',
      padding: '20px'
    },
    loading: {
      textAlign: 'center',
      padding: '20px'
    }
  };

  if (loading) return <div style={styles.loading}>Loading users...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>User Management</h2>
      <div style={styles.table}>
        {/* Table Header */}
        <div style={{ ...styles.row, ...styles.headerRow }}>
          <div style={styles.cell}>Name</div>
          <div style={styles.cell}>Email</div>
          <div style={styles.cell}>Password</div>
          <div style={styles.cell}>Role</div>
        </div>

        {/* User Rows */}
        {users.map(user => (
          <div key={user._id} style={styles.row}>
            <div style={styles.cell}>{user.name}</div>
            <div style={styles.cell}>{user.email}</div>
            <div style={styles.cell}>••••••••</div>
            <div style={styles.cell}>
              <span style={{
                ...styles.roleBadge,
                backgroundColor: getRoleColor(user.role)
              }}>
                {user.role}
              </span>
            </div>
          </div>
        ))}
      </div>
      {users.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          No users found
        </div>
      )}
    </div>
  );
};

export default UserList;