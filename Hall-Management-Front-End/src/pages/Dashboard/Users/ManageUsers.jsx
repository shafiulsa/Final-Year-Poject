


import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await axios.get('http://localhost:5000/users');
    setUsers(data);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    }
  };

  const handleUpdateRole = async (id) => {
    if (!newRole) return;
    await axios.patch(`http://localhost:5000/users/${id}`, { role: newRole });
    setEditingUserId(null);
    fetchUsers(); // refresh the list
  };

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-6 text-center">Users Management</h2>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-left">
              <th className="py-3 px-5">#</th>
              <th className="py-3 px-5">Profile</th>
              <th className="py-3 px-5">Email</th>
              <th className="py-3 px-5">Role</th>
              <th className="py-3 px-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-4 px-5">{index + 1}</td>
                <td className="py-4 px-5">
                  <img
                    src={user.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                  />
                </td>
                <td className="py-4 px-5  text-black">{user.email}</td>
                <td className="py-4 px-5  text-black">
                  {editingUserId === user._id ? (
                    <select
                      className="border rounded p-1 dark:bg-gray-700"
                      onChange={(e) => setNewRole(e.target.value)}
                      defaultValue={user.role || 'student'}
                    >
                      <option value="student">Student</option>
                      <option value="provost">Provost</option>
                      <option value="housetutor">House Tutor</option>
                      <option value="register">Register</option>
                      <option value="staff">Staff</option>
                    </select>
                  ) : (
                    <span className="capitalize">{user.role || 'student'}</span>
                  )}
                </td>
                <td className="py-4 px-5 flex gap-3">
                  {editingUserId === user._id ? (
                    <button
                      onClick={() => handleUpdateRole(user._id)}
                      className="bg-green-500 hover:bg-green-600 text-black px-3 py-1 rounded"
                    >
                      Confirm
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingUserId(user._id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
