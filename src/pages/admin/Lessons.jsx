import { useQuery } from 'react-query';
import axios from 'axios';

const AdminLessons = () => {
  const { data: lessons, isLoading, error } = useQuery('lessons', async () => {
    const response = await axios.get('/api/lessons');
    return response.data;
  });

  if (isLoading) return <div className="text-center mt-8">Loading lessons...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error loading lessons</div>;

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Manage Lessons</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Lesson Name</th>
            <th className="border border-gray-300 p-2">Lesson Number</th>
            <th className="border border-gray-300 p-2">Vocabulary Count</th>
          </tr>
        </thead>
        <tbody>
          {lessons?.map((lesson) => (
            <tr key={lesson.id}>
              <td className="border border-gray-300 p-2">{lesson.name}</td>
              <td className="border border-gray-300 p-2">{lesson.lessonNumber}</td>
              <td className="border border-gray-300 p-2">{lesson.vocabularyCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLessons;

