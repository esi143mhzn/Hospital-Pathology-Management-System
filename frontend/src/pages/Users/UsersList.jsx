import React, { useEffect, useState } from 'react'
import { deleteUser, getAllUsers } from '../../api/users.js';
import { Link } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext.jsx';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { successMsg, showSuccess } = useNotification();

  const fetchUsersData = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data.data)
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
        showSuccess(res.data.message);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, [])

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-semibold'>Users</h2>
        {successMsg && 
            <p className="text-green-500 bg-green-100 p-2 text-center rounded mb-4">{successMsg}</p>
        }
        <Link to="/user/create" className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>Add User</Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className='min-w-full border border-black-200'>
          <thead className='bg-slate-300'>
            <tr>
              <th className='py-2 px-4 border'>S.N.</th>
              <th className='py-2 px-4 border'>Name</th>
              <th className='py-2 px-4 border'>Email</th>
              <th className='py-2 px-4 border'>Role</th>
              <th className='py-2 px-4 border'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className='text-center'>
                <td className='py-2 px-4 border'>{index + 1}</td>
                <td className='py-2 px-4 border'>{user.name}</td>
                <td className='py-2 px-4 border'>{user.email}</td>
                <td className='py-2 px-4 border'>{user.role}</td>
                <td className='py-2 px-4 border'>
                  <Link to={`/user/${user.id}`} className='bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500 mr-2'>Edit</Link>
                  <button onClick={() => handleDelete(user.id)} className='bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UsersList;