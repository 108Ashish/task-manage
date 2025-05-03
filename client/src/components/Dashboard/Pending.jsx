import React from 'react'
import TaskCard from './TaskCard'

const Pending = ({ tasks = [], onTaskChanged }) => {
  return (
    <div className='flex flex-col gap-4'>
      {tasks && tasks.length > 0 ? (
        tasks.map(task => (
          <TaskCard 
            key={task._id} 
            task={task} 
            onTaskChanged={onTaskChanged} 
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No pending tasks</p>
      )}
    </div>
  )
}

export default Pending
