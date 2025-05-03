import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ setAddTaskDiv, onTaskAdded }) => {
  const [value, setValue] = useState({
    title: '',
    priority: 'low',
    status: 'pending',
    description: '',
  });

  const change = (e) => {
    const { name, value: inputValue } = e.target;
    setValue(prevState => ({ ...prevState, [name]: inputValue }));
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/addtask`, value, {
        withCredentials: true
      });
      
      console.log(res.data);
      alert('Task added successfully!');
      setAddTaskDiv('hidden');
      
      // Reset form
      setValue({
        title: '',
        priority: 'low',
        status: 'pending',
        description: '',
      });
      
      // Call the callback to refresh the task list
      if (onTaskAdded) {
        onTaskAdded();
      }
      
    } catch (error) {
      console.error("Error adding task:", error);
      alert(error.response?.data?.error || 'Failed to add task');
    }
  };
  
  return (
    <div className="bg-white rounded px-4 py-4 w-[40%] mx-auto mt-8 shadow-lg">
      <h1 className="text-xl text-blue-800 font-semibold">Add Task</h1>
      <hr className="mb-4 mt-2" />

      <form className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={value.title}
          placeholder="Title"
          className="border rounded-lg px-4 py-2 border-zinc-300 w-full outline-none focus:border-blue-500"
          onChange={change}
        />

        <div className="flex items-center justify-between gap-4">
          <div className="w-full">
            <h3 className="mb-2">Select Priority</h3>
            <select
              name="priority"
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
              onChange={change}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="w-full">
            <h3 className="mb-2">Select Status</h3>
            <select
              name="status"
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
              onChange={(e) => setValue({ ...value, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <textarea
          name="description"
          value={value.description}
          placeholder="Description"
          className="border rounded-lg px-4 py-2 border-zinc-300 w-full outline-none focus:border-blue-500"
          onChange={change}
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-700 text-white font-semibold rounded-full px-4 py-2 hover:bg-blue-600 transition duration-300" onClick={addTask}
          >
            Add Task
          </button>

          <button
            type="button"
            className="bg-red-700 text-white font-semibold rounded-full px-4 py-2 hover:bg-red-600 transition duration-300"
            onClick={() => setAddTaskDiv('hidden')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask; 