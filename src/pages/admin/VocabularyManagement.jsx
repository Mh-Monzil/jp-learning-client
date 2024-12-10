import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminVocabularyManagement = () => {
  const [editingVocabulary, setEditingVocabulary] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState('');
  const queryClient = useQueryClient();

  const { data: vocabularies, isLoading: isLoadingVocabularies, error: vocabulariesError } = useQuery(
    ['vocabularies', selectedLesson],
    async () => {
      const response = await axios.get(`/api/vocabularies${selectedLesson ? `?lessonId=${selectedLesson}` : ''}`);
      return response.data;
    }
  );

  const { data: lessons } = useQuery('lessons', async () => {
    const response = await axios.get('/api/lessons');
    return response.data;
  });

  const updateVocabulary = useMutation(
    async (updatedVocabulary) => {
      await axios.put(`/api/vocabularies/${updatedVocabulary.id}`, updatedVocabulary);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['vocabularies', selectedLesson]);
        toast.success('Vocabulary updated successfully');
        setEditingVocabulary(null);
      },
      onError: () => {
        toast.error('Failed to update vocabulary');
      },
    }
  );

  const deleteVocabulary = useMutation(
    async (vocabularyId) => {
      await axios.delete(`/api/vocabularies/${vocabularyId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['vocabularies', selectedLesson]);
        toast.success('Vocabulary deleted successfully');
      },
      onError: () => {
        toast.error('Failed to delete vocabulary');
      },
    }
  );

  if (isLoadingVocabularies) return <div className="text-center mt-8">Loading vocabularies...</div>;
  if (vocabulariesError) return <div className="text-center mt-8 text-red-500">Error loading vocabularies</div>;

  const handleEdit = (vocabulary) => {
    setEditingVocabulary(vocabulary);
  };

  const handleUpdate = () => {
    if (editingVocabulary) {
      updateVocabulary.mutate(editingVocabulary);
    }
  };

  const handleDelete = (vocabularyId) => {
    if (window.confirm('Are you sure you want to delete this vocabulary?')) {
      deleteVocabulary.mutate(vocabularyId);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Vocabulary Management</h1>
      <div className="mb-4">
        <label htmlFor="lessonFilter" className="mr-2">Filter by Lesson:</label>
        <select
          id="lessonFilter"
          value={selectedLesson}
          onChange={(e) => setSelectedLesson(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Lessons</option>
          {lessons?.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.name} (Lesson {lesson.lessonNumber})
            </option>
          ))}
        </select>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Word</th>
            <th className="border border-gray-300 p-2">Pronunciation</th>
            <th className="border border-gray-300 p-2">Meaning</th>
            <th className="border border-gray-300 p-2">When to Say</th>
            <th className="border border-gray-300 p-2">Lesson</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vocabularies?.map((vocabulary) => (
            <tr key={vocabulary.id}>
              <td className="border border-gray-300 p-2">
                {editingVocabulary?.id === vocabulary.id ? (
                  <input
                    type="text"
                    value={editingVocabulary.word}
                    onChange={(e) => setEditingVocabulary({ ...editingVocabulary, word: e.target.value })}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  vocabulary.word
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editingVocabulary?.id === vocabulary.id ? (
                  <input
                    type="text"
                    value={editingVocabulary.pronunciation}
                    onChange={(e) => setEditingVocabulary({ ...editingVocabulary, pronunciation: e.target.value })}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  vocabulary.pronunciation
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editingVocabulary?.id === vocabulary.id ? (
                  <input
                    type="text"
                    value={editingVocabulary.meaning}
                    onChange={(e) => setEditingVocabulary({ ...editingVocabulary, meaning: e.target.value })}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  vocabulary.meaning
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editingVocabulary?.id === vocabulary.id ? (
                  <input
                    type="text"
                    value={editingVocabulary.whenToSay}
                    onChange={(e) => setEditingVocabulary({ ...editingVocabulary, whenToSay: e.target.value })}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  vocabulary.whenToSay
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {lessons?.find(lesson => lesson.id === vocabulary.lessonId)?.name || 'Unknown'}
              </td>
              <td className="border border-gray-300 p-2">
                {editingVocabulary?.id === vocabulary.id ? (
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(vocabulary)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(vocabulary.id)}
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

export default AdminVocabularyManagement;

