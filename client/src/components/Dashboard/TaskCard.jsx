import React from 'react'

const TaskCard = () => {
  return <button className="bg-white rounded px-4 w-[100%] py-2 border border-zinc-300 shadow-md hover:shadow-lg transition duration-300">
    <div className='flex items-center justify-between'>
        <h1 className=''>Task Title</h1>
        <div className='test-sm text-gray-700 bg-green-100 px-2 rounded-full'><p>Low</p>
        </div>

        </div>    
        <hr className='my-2'/>
        <p className='text-sm text-zinc-500 test-start'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque porro, molestiae totam ipsam, doloremque dolorum nesciunt laboriosam consectetur vitae veritatis tenetur ullam beatae culpa velit veniam. Ut, consequuntur. Quae, suscipit.</p>
  </button> 
}

export default TaskCard
