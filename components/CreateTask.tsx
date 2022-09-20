import { FormEvent } from "react"
import { useTodoApp } from "../utils/functions"


type Props = {
    name: string,
    setName: (name: string) => void,
    priority: string,
    setPriority: (priority: string) => void,
    addTask: (e: FormEvent) => void
}

const CreateTask = ({name, setName, priority, setPriority, addTask}: Props) => {
    return (
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
    )
}

export default CreateTask