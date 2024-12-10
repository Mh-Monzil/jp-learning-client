import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(1, 'Lesson name is required'),
  lessonNumber: z.number().min(1, 'Lesson number must be at least 1'),
});

const AdminAddLesson = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('/api/lessons', data);
      toast.success('Lesson added successfully');
      reset();
    } catch (error) {
      toast.error('Failed to add lesson');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Add New Lesson</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Lesson Name</label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="lessonNumber" className="block mb-2">Lesson Number</label>
          <input
            type="number"
            id="lessonNumber"
            {...register('lessonNumber', { valueAsNumber: true })}
            className="w-full p-2 border rounded"
          />
          {errors.lessonNumber && <p className="text-red-500">{errors.lessonNumber.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? 'Adding...' : 'Add Lesson'}
        </button>
      </form>
    </div>
  );
};

export default AdminAddLesson;

