import React, { useState } from 'react';
import axios from 'axios';
import {BsPencil} from 'react-icons/bs'
import {AiOutlineDelete} from 'react-icons/ai'

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateData, setUpdateData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
  });

  const handleUpdate = async () => {
    try {
      await axios.put(`https://task-management-apoi-v1.vercel.app/api/v1/tasks/${task._id}`, updateData);
      setIsUpdating(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://task-management-apoi-v1.vercel.app/api/v1/tasks/${task._id}`);
      onDelete();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCheckboxChange = (e) => {
    const newStatus = e.target.checked;
    setUpdateData({ ...updateData, status: newStatus });
    // Immediately update the status on the server when the checkbox is clicked
    axios.put(`https://task-management-apoi-v1.vercel.app/api/v1/tasks/${task._id}`, { ...updateData, status: newStatus })
      .then(() => onUpdate())
      .catch((error) => console.error('Error updating task status:', error));
  };

  return (
    <div className='border border-gray-300 rounded p-4 my-4'>
      {!isUpdating ? (
        <div className='flex items-center'>
          <input
            type='checkbox'
            checked={updateData.status}
            onChange={handleCheckboxChange} 
            className='mr-2'
          />
          <div className='flex-1'>
            <h3 className='text-lg font-medium text-indigo-400'>{task.title}</h3>
            <p className='text-sm text-indigo-200'>{task.description}</p>
          </div>
          <button
            className='text-indigo-600 hover:text-indigo-900 focus:outline-none'
            onClick={() => setIsUpdating(true)}
          >
            <BsPencil size={24} />
          </button>
          <button
            className='text-rose-600 hover:text-rose-900 focus:outline-none ml-4'
            onClick={handleDelete}
          >
            <AiOutlineDelete size={24} />
          </button>
        </div>
      ) : (
        <div>
          <input
            type='text'
            value={updateData.title}
            onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
            className='block w-full p-3 outline-none bg-transparent border-2  border-gray-500 sm:text-sm text-white rounded-md mb-2'
            placeholder='Title'
          />
          <textarea
            value={updateData.description}
            onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
            className='block w-full p-3 outline-none bg-transparent border-2  border-gray-500 sm:text-sm text-white rounded-md mb-2'
            placeholder='Description'
          />
          <button
            className='text-indigo-600 hover:text-indigo-900 focus:outline-none'
            onClick={handleUpdate}
          >
            Save
          </button>
          <button
            className='text-red-600 hover:text-red-900 focus:outline-none ml-4'
            onClick={() => setIsUpdating(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;