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
    <div className="container  mt-5">

      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4" >
          <label htmlFor="username" className="form-label">Select a user</label>
          <select id="username" className="form-select" onChange={e => {setSelectedUser(e.target.value);  }} value={selectedUser}>
            <option value="">Select User</option>
            {users.map(user => (
                <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>
          <br/>
          <button  type="button" className="btn btn-primary"  onClick={() => {setUserId(selectedUser); sessionStorage.setItem("userId", selectedUser ); navigate(`/hotels/`); }}>Login</button>
        </div>
        <div className="col-sm-4"></div>
    </div>
    </div>
  );
};

export default Login;

