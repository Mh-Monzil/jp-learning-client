import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/admin/lessons" className="bg-blue-500 text-white p-4 rounded shadow hover:bg-blue-600">
          Manage Lessons
        </Link>
        <Link to="/admin/add-lesson" className="bg-green-500 text-white p-4 rounded shadow hover:bg-green-600">
          Add New Lesson
        </Link>
        <Link to="/admin/add-vocabulary" className="bg-purple-500 text-white p-4 rounded shadow hover:bg-purple-600">
          Add New Vocabulary
        </Link>
        <Link to="/admin/manage-users" className="bg-yellow-500 text-white p-4 rounded shadow hover:bg-yellow-600">
          Manage Users
        </Link>
        <Link to="/admin/lesson-management" className="bg-red-500 text-white p-4 rounded shadow hover:bg-red-600">
          Lesson Management
        </Link>
        <Link to="/admin/vocabulary-management" className="bg-indigo-500 text-white p-4 rounded shadow hover:bg-indigo-600">
          Vocabulary Management
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

