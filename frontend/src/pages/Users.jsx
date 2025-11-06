import React, { useEffect, useState } from 'react'
import api from "../api/api"

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsersData = async () => {
    const res = await api.get('/user');
    setUsers(res.data.data)
  }

  useEffect(() => {
    fetchUsersData();
  }, [])

  return (
    users && users.length > 0 ? (
      <div className='p-4'>
        <h2 className='text-xl font-semibold mb-3'>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    ) : (
      <div className='p-8 text-center'>
        <h1 className='text-3xl font-bold'>User page is forbidden.</h1>
        <p className='mt-2'>Your role is not allow to see users!</p>
      </div>

    )
  )
}

export default Users