import React from 'react';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <div className='custom-gradient  min-h-screen py-8'>
      <div className=' max-w-md mx-auto p-4 rounded-lg shadow'>
        <TaskList />
      </div>
    </div>
  );
};

export default App;
