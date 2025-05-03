import React from 'react';
import axios from 'axios';

const TaskCard = ({ task, onTaskChanged }) => {
    if (!task) return null;
    
    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API}/api/v1/deletetask/${task._id}`, {
                withCredentials: true
            });
            alert('Task deleted successfully');
            if (onTaskChanged) onTaskChanged();
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Failed to delete task');
        }
    };

    const handleStatusChange = async (newStatus) => {
        try {
            await axios.put(`${import.meta.env.VITE_API}/api/v1/edittask/${task._id}`, 
                { ...task, status: newStatus },
                { withCredentials: true }
            );
            if (onTaskChanged) onTaskChanged();
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update task');
        }
    };

    return (
        <div className="bg-white p-4 mb-4 rounded-lg shadow">
            <div className="flex justify-between">
                <h3 className="font-bold">{task.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full 
                    ${task.priority === 'high' ? 'bg-red-500 text-white' : 
                    task.priority === 'medium' ? 'bg-yellow-500 text-white' : 
                    'bg-green-500 text-white'}`}>
                    {task.priority}
                </span>
            </div>
            
            <p className="mt-2 text-gray-700">{task.description}</p>
            
            <div className="mt-4 text-xs text-gray-500">
                <p>Created by: {task.username}</p>
                <p>Email: {task.email}</p>
                <p>Created at: {new Date(task.createdAt).toLocaleString()}</p>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
                <div className="space-x-2">
                    <button 
                        onClick={() => handleStatusChange('pending')}
                        className={`px-2 py-1 text-xs rounded ${task.status === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        Pending
                    </button>
                    <button 
                        onClick={() => handleStatusChange('in-progress')}
                        className={`px-2 py-1 text-xs rounded ${task.status === 'in-progress' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>
                        In Progress
                    </button>
                    <button 
                        onClick={() => handleStatusChange('completed')}
                        className={`px-2 py-1 text-xs rounded ${task.status === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                        Completed
                    </button>
                </div>
                
                <button 
                    onClick={handleDelete}
                    className="px-2 py-1 text-xs bg-red-500 text-white rounded">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
