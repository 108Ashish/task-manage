import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Dashboard/Header'
import AddTask from '../components/Dashboard/AddTask'
import Heading from '../components/Dashboard/Heading'
import Pending from '../components/Dashboard/Pending'
import InProgress from '../components/Dashboard/InProgress'
import Completed from '../components/Dashboard/Completed'
import axios from 'axios'

const Dashboard = () => {
    const [addTaskDiv, setAddTaskDiv] = useState("hidden");
    const [tasks, setTasks] = useState({
      pending: [],
      inProgress: [],
      completed: []
    });
    const navigate = useNavigate();
    
    // Function to fetch all tasks
    const fetchTasks = async () => {
        try {
            if (!localStorage.getItem("userLoggedIn")) {
                navigate('/login');
                return;
            }
            
            const res = await axios.get('http://localhost:1000/api/v1/alltasks', {
                withCredentials: true
            });
            
            console.log("Tasks response:", res.data);
            
            if (res.data && res.data.tasks) {
                setTasks({
                    pending: res.data.tasks.pending || [],
                    inProgress: res.data.tasks.inProgress || [],
                    completed: res.data.tasks.completed || []
                });
            }

            console.log("Tasks data structure:", {
              pending: res.data.tasks.pending?.length || 0,
              inProgress: res.data.tasks.inProgress?.length || 0,
              completed: res.data.tasks.completed?.length || 0,
              samplePending: res.data.tasks.pending?.[0],
            });
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
        <div className="w-full relative">
            <Header setAddTaskDiv={setAddTaskDiv}/>
            <div className='px-12 py-4 flex gap-12 bg-zinc-100 min-h-[89vh] max-h-auto'>
                <div className='w-1/3'>
                    <Heading title={'Pending'}/>
                    <div className='pt-2'>
                        <Pending tasks={tasks.pending} onTaskChanged={fetchTasks}/>
                    </div>
                </div>
                <div className='w-1/3'>
                    <Heading title={'In Progress'}/>
                    <div className='pt-2'>
                        <InProgress tasks={tasks.inProgress} onTaskChanged={fetchTasks}/>
                    </div>
                </div>
                <div className='w-1/3'>
                    <Heading title={'Completed'}/>
                    <div className='pt-2'>
                        <Completed tasks={tasks.completed} onTaskChanged={fetchTasks}/>
                    </div>
                </div>
            </div>
            <div className={`${addTaskDiv} fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10`}>
                <AddTask setAddTaskDiv={setAddTaskDiv} onTaskAdded={fetchTasks}/>
            </div>
        </div>
    )
}

export default Dashboard
