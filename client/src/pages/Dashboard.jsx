import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Dashboard/Header';
import AddTask from '../components/Dashboard/AddTask';
import Heading from '../components/Dashboard/Heading';
import Pending from '../components/Dashboard/Pending';
import InProgress from '../components/Dashboard/InProgress';
import Completed from '../components/Dashboard/Completed';
import axios from 'axios';

const Dashboard = () => {
  const [addTaskDiv, setAddTaskDiv] = useState("hidden");
  const [tasks, setTasks] = useState({
    pending: [],
    inProgress: [],
    completed: []
  });
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      if (!localStorage.getItem("userLoggedIn")) {
        navigate('/login');
        return;
      }

      const res = await axios.get('http://localhost:1000/api/v1/alltasks', {
        withCredentials: true
      });

      if (res.data && res.data.tasks) {
        setTasks({
          pending: res.data.tasks.pending || [],
          inProgress: res.data.tasks.inProgress || [],
          completed: res.data.tasks.completed || []
        });
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("userLoggedIn");
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <Header setAddTaskDiv={setAddTaskDiv} />

      {/* Task Columns */}
      <div className="p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pending Tasks */}
          <div className="bg-white rounded-2xl shadow-md p-4">
            <Heading title={'Pending'} />
            <div className="pt-2">
              <Pending tasks={tasks.pending} onTaskChanged={fetchTasks} />
            </div>
          </div>

          {/* In Progress Tasks */}
          <div className="bg-white rounded-2xl shadow-md p-4">
            <Heading title={'In Progress'} />
            <div className="pt-2">
              <InProgress tasks={tasks.inProgress} onTaskChanged={fetchTasks} />
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="bg-white rounded-2xl shadow-md p-4">
            <Heading title={'Completed'} />
            <div className="pt-2">
              <Completed tasks={tasks.completed} onTaskChanged={fetchTasks} />
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      <div className={`fixed inset-0 z-20 bg-black bg-opacity-40 backdrop-blur-sm transition-all duration-300 ease-in-out ${addTaskDiv === 'hidden' ? 'opacity-0 pointer-events-none' : 'opacity-100 flex items-center justify-center'}`}>
        <div className="w-[90vw] md:w-[60vw] lg:w-[40vw] bg-white rounded-xl shadow-xl p-6">
          <AddTask setAddTaskDiv={setAddTaskDiv} onTaskAdded={fetchTasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
