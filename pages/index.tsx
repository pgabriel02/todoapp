import Head from 'next/head'
import TasksContainer from '../components/Tasks'
import {todoApp } from '../utils/functions'


const Home = () => {
  const {name, setName, priority, setPriority, addTask} = todoApp()
  return (
    <div className='w-full my-10'>
      <Head>
        <title>Todo app | Petre Gabriel</title>
        <meta name="description" content="Petre Gabriel todo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form className='flex gap-1 flex-wrap justify-center items-center w-full'>
            <input onChange={(e) => setName(e.target?.value)}type="text" value={name} placeholder='Your todo here' className="outline-none w-[80%] md:w-[40vh] border  text-sm rounded-sm focus:ring-red-500 focus:border-red-500 block p-2.5 bg-gray-900 border-gray-900 placeholder-gray-400 text-white dark:focus:border-red-500" required />
            <select value={priority} onChange={(e) => setPriority(e.target?.value)} className="w-[80%] md:w-[20%] border text-sm rounded-sm focus:border-red-500 block p-2.5 bg-gray-900 border-gray-900 placeholder-gray-400 text-white focus:ring-red-500 dark:focus:border-red-500">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button onClick={addTask} className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-sm p-2.5">
              Add new task
            </button>
      </form>
      <TasksContainer />
    </div>
  )
}

export default Home
