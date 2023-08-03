import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  title: '',
  description: '',
  status: false,
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
});

const TaskForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className='my-4'>
          <div>
            <label htmlFor='title' className='block text-sm font-medium text-white'>
              Title:
            </label>
            <Field
              type='text'
              id='title'
              name='title'
              className='mt-1 block w-full p-3 bg-transparent text-white outline-none rounded-md shadow-sm  border-2 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Title'
            />
            <ErrorMessage name='title' component='div' className='text-red-500 mt-1' />
          </div>
          <div className='mt-2'>
            <label htmlFor='description' className='block text-sm font-medium text-white'>
              Description:
            </label>
            <Field
              as='textarea'
              id='description'
              name='description'
              className='mt-1 block w-full border-2 bg-transparent p-3 outline-none text-white border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Description'
            />
            <ErrorMessage name='description' component='div' className='text-red-500 mt-1' />
          </div>
          <div className='mt-2'>
            <button
              type='submit'
              className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Add Task
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;