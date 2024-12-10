import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Lessons = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 10;

  const { data: lessons, isLoading, error } = useQuery('lessons', async () => {
    const response = await axios.get('/api/lessons');
    return response.data;
  });

  if (isLoading) return <div className="text-center mt-8">Loading lessons...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error loading lessons</div>;

  const indexOfLastLesson = currentPage * lessonsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
  const currentLessons = lessons?.slice(indexOfFirstLesson, indexOfLastLesson);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Japanese Lessons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentLessons?.map((lesson) => (
          <Link
            key={lesson.id}
            to={`/lesson/${lesson.lessonNumber}`}
            className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{lesson.name}</h2>
            <p>Lesson Number: {lesson.lessonNumber}</p>
            <p>Vocabulary Count: {lesson.vocabularyCount}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        {lessons && (
          <Pagination
            itemsPerPage={lessonsPerPage}
            totalItems={lessons.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
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

export default Lessons;

