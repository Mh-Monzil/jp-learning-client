import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminManageUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const queryClient = useQueryClient();

  const { data: users, isLoading, error } = useQuery('users', async () => {
    const response = await axios.get('/api/users');
    return response.data;
  });

  const updateUserRole = useMutation(
    async ({ userId, newRole }) => {
      await axios.put(`/api/users/${userId}/role`, { role: newRole });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        toast.success('User role updated successfully');
      },
      onError: () => {
        toast.error('Failed to update user role');
      },
    }
  );

  if (isLoading) return <div className="text-center mt-8">Loading users...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error loading users</div>;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Manage Users</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers?.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2">
                {user.role === 'user' ? (
                  <button
                    onClick={() => updateUserRole.mutate({ userId: user.id, newRole: 'admin' })}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Promote to Admin
                  </button>
                ) : (
                  <button
                    onClick={() => updateUserRole.mutate({ userId: user.id, newRole: 'user' })}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Demote to User
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <Pagination
          itemsPerPage={usersPerPage}
          totalItems={users?.length || 0}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex space-x-2">
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminManageUsers;

