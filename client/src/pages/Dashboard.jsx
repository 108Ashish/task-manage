import React,{ useEffect, useState} from 'react'
import Header from '../components/Dashboard/Header'
import AddTask from '../components/Dashboard/AddTask'
import Heading from '../components/Dashboard/heading';
import Pending from '../components/Dashboard/pending';
import InProgress from '../components/Dashboard/InProgress';
import Complided from '../components/Dashboard/Completed';
import Completed from '../components/Dashboard/Completed';
import axios from 'axios';  
const Dashboard = () => {
    const [AddTaskDiv, setAddTaskDiv] = useState("hidden");
    const [Task, setTask] = useState();
    useEffect(() => {
        const fetUserDetails = async () => {
          try {
            const res = await axios.get('http://localhost:1000/api/v1/userdetails', {
              withCredentials: true,
            });
            console.log(res.data);
            setTask(res.data.task);
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        };
      
        fetUserDetails();
      }, []);
      console.log(Task);
  return (
    <div className="w-full relative">
        <div className="bg-white">
            <Header setAddTaskDiv={setAddTaskDiv}/>
        </div>
        <div className='px-12 py-4 flex gap-12 bg0zinc100 min-h[89vh max-h-auto' >
            <div className='w-1/3'>
            <Heading title={'pending'}/>

            <div className='pt-2'>
                <Pending/>
            </div>

         </div>
            <div className='w-1/3'>
            <Heading title={'in-progress'}/>
            <div className='pt-2'>
                <InProgress/>

            </div>
        </div>
            <div className='w-1/3'>
            <Heading title={'completed'}/>
            </div>
            
            <div className='pt-2'>

                <Completed/>

            </div>
        </div>
{/* -------------------------------------------------------------------------------------*/ }
        <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}>

        </div>

        <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85 flex flex-col items-center justify-center`}>
            <AddTask setAddTaskDiv={setAddTaskDiv}/>

        </div>
      
    </div>
  )
}

export default Dashboard
