import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

const schema = z.object({
  word: z.string().min(1, 'Word is required'),
  pronunciation: z.string().min(1, 'Pronunciation is required'),
  meaning: z.string().min(1, 'Meaning is required'),
  whenToSay: z.string().min(1, 'When to say is required'),
  lessonId: z.string().min(1, 'Lesson is required'),
});

const AdminAddVocabulary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const { data: lessons } = useQuery('lessons', async () => {
    const response = await axios.get('/api/lessons');
    return response.data;
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('/api/vocabulary', data);
      toast.success('Vocabulary added successfully');
      reset();
    } catch (error) {
      toast.error('Failed to add vocabulary');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Add New Vocabulary</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="word" className="block mb-2">Word (Japanese)</label>
          <input
            type="text"
            id="word"
            {...register('word')}
            className="w-full p-2 border rounded"
          />
          {errors.word && <p className="text-red-500">{errors.word.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="pronunciation" className="block mb-2">Pronunciation</label>
          <input
            type="text"
            id="pronunciation"
            {...register('pronunciation')}
            className="w-full p-2 border rounded"
          />
          {errors.pronunciation && <p className="text-red-500">{errors.pronunciation.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="meaning" className="block mb-2">Meaning</label>
          <input
            type="text"
            id="meaning"
            {...register('meaning')}
            className="w-full p-2 border rounded"
          />
          {errors.meaning && <p className="text-red-500">{errors.meaning.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="whenToSay" className="block mb-2">When to Say</label>
          <input
            type="text"
            id="whenToSay"
            {...register('whenToSay')}
            className="w-full p-2 border rounded"
          />
          {errors.whenToSay && <p className="text-red-500">{errors.whenToSay.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="lessonId" className="block mb-2">Lesson</label>
          <select
            id="lessonId"
            {...register('lessonId')}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a lesson</option>
            {lessons?.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.name} (Lesson {lesson.lessonNumber})
              </option>
            ))}
          </select>
          {errors.lessonId && <p className="text-red-500">{errors.lessonId.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? 'Adding...' : 'Add Vocabulary'}
        </button>
      </form>
    </div>
  );
};

export default AdminAddVocabulary;

