import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { addTask, deleteTask, getTasks } from './app/todoSlice';

function App() {

  // task state which hold current input
  const [task, setTask] = useState('');

  // select tasks from current state
  const tasks = useAppSelector((state: any) => state.todo.tasks);

  // action dispatch function declaration
  const dispatch = useAppDispatch();

  // fetch tasks after component loaded
  useEffect(() => {
    dispatch(getTasks());
  }, [])

  // a function to process task
  const onAddTask = () => {
    if (task.trim() === '') return;
    const newTask = {
      id: window.crypto.randomUUID(),
      task: task
    }
    dispatch(addTask(newTask))
    setTask('');
  }

  // handle task adding on enter key
  const handleKeyPress = (e: any) => {
    // This is perfectly safe in react, it correctly detect the keys
    if (e.key == 'Enter') onAddTask();
  }

  // delete requested task
  const onDeleteTask = (taskId: any) => {
    dispatch(deleteTask(taskId))
  }

  return (
    <div className="mt-5 App container max-w-3xl mx-auto px-4">
      <div className="flex">
        <img src={logo} className="App-logo mr-2" alt="logo" />
        <h3 className='text-3xl font-bold'>React Redux To Do App</h3>
      </div>
      <p className="text-sm text-gray-500">
        A simple todo app utilizing react redux.
      </p>

      <div className="my-5 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </div>
        <input
          type="text"
          name="task"
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyPress}
          className="py-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 border-gray-300 rounded-md"
          placeholder="Add a task"
        />
      </div>
      <button type="button"
        onClick={onAddTask}
        className="text-xs text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Add Task</button>
      <div className="tasks grid grid-cols-1 gap-3 mt-3">
        {tasks.allIds.length > 0 &&
          <h4>Tasks</h4>}
        {tasks.allIds.map((taskId: any) => {
          const task = tasks.byId[taskId];
          return <>
            <div className="card p-4 bg-white shadow w-full">
              <input type="checkbox" className="default:ring-2 mr-2" />

              <h4 className='inline'>{task.task}</h4>

              <button className='float-right hover:text-red-400' onClick={() => onDeleteTask(task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg></button>
            </div>
          </>
        })}
      </div>

      <footer className="p-4 bg-white rounded-lg mt-4 md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()}
          <a href="https://itsbohara.com/" className="hover:underline"> Itsbohara</a>. All Rights Reserved.
        </span>
      </footer>

    </div>
  );
}

export default App;
