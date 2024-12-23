// src/components/Login.tsx

import React, { useState, useEffect } from 'react';
import { getUsers } from '../api';
import { User } from '../types';
import {useNavigate} from "react-router-dom";
import { useUserContext } from '../context/UserContext';



const Login: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
    const { setUserId, setEmail } = useUserContext(); // Get setUserId from context

    const navigate = useNavigate(); // Get the navigate function
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Login</h2>
      <select onChange={e => {setSelectedUser(e.target.value);  }} value={selectedUser}>
        <option value="">Select User</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.username}</option>
        ))}
      </select>
      <button onClick={() => {setUserId(selectedUser); navigate(`/hotels/`); }}>Login</button>
    </div>
  );
};

export default Login;

