import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminLessonManagement = () => {
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const queryClient = useQueryClient();

  const { data: lessons, isLoading, error } = useQuery('lessons', async () => {
    const response = await axios.get('/api/lessons');
    return response.data;
  });

  const updateLesson = useMutation(
    async (updatedLesson) => {
      await axios.put(`/api/lessons/${updatedLesson.id}`, updatedLesson);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('lessons');
        toast.success('Lesson updated successfully');
        setEditingLesson(null);
      },
      onError: () => {
        toast.error('Failed to update lesson');
      },
    }
  );

  const deleteLesson = useMutation(
    async (lessonId) => {
      await axios.delete(`/api/lessons/${lessonId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('lessons');
        toast.success('Lesson deleted successfully');
      },
      onError: () => {
        toast.error('Failed to delete lesson');
      },
    }
  );

  if (isLoading) return <div className="text-center mt-8">Loading lessons...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error loading lessons</div>;

  const handleEdit = (lesson) => {
    setEditingLesson(lesson);
  };

  const handleUpdate = () => {
    if (editingLesson) {
      updateLesson.mutate(editingLesson);
    }
  };

  const handleDelete = (lessonId) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      deleteLesson.mutate(lessonId);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Lesson Management</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Lesson Name</th>
            <th className="border border-gray-300 p-2">Lesson Number</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons?.map((lesson) => (
            <tr key={lesson.id}>
              <td className="border border-gray-300 p-2">
                {editingLesson?.id === lesson.id ? (
                  <input
                    type="text"
                    value={editingLesson.name}
                    onChange={(e) => setEditingLesson({ ...editingLesson, name: e.target.value })}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  lesson.name
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editingLesson?.id === lesson.id ? (
                  <input
                    type="number"
                    value={editingLesson.lessonNumber}
                    onChange={(e) => setEditingLesson({ ...editingLesson, lessonNumber: parseInt(e.target.value) })}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  lesson.lessonNumber
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editingLesson?.id === lesson.id ? (
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(lesson)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(lesson.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLessonManagement;

