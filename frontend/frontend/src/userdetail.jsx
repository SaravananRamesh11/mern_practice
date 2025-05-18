import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/vista/user/${id}`);
        
        if (!data || !data.name) throw new Error("Invalid user data");

        setUser(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-detail">
      <h2>User Details</h2>
     <p><strong>ID:</strong> {user._id || "Unknown"}</p>
      <p><strong>Name:</strong> {user.name || "Unknown"}</p>
      <p><strong>Email:</strong> {user.email || "Unknown"}</p>
      <p><strong>Password:</strong> {user.password || "Unknown"}</p>
      <p><strong>Role:</strong> {user.role || "Unknown"}</p>
    </div>
  );
}
