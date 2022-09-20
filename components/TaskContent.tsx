import {Task} from "../utils/types"
import {BsFillPencilFill, BsCheck, BsTrashFill} from 'react-icons/bs'
import { todoApp } from "../utils/functions"

type Props = {
    task: Task,
}

const TaskContent = ({task}: Props) => {
    const {handleMark, handleDelete, handleEdit} = todoApp()
    return (
        <tr>
            <td>{task.id}</td>
            <td className='flex items-center justify-center gap-1'><span title={task.priority} className={`w-[10px] h-[10px] ${task.priority === 'Low' ? 'bg-green-500' : task.priority === 'Medium' ? 'bg-orange-300' : 'bg-red-400'} rounded-full`}></span>{task.name}</td>
            <td>{task.priority}</td>
            <td className='flex items-center justify-center gap-2'>
                {!task.done &&
                    <>
                        <BsCheck title='Mark as done' onClick={() => handleMark(task.id)} className='text-green-400 text-2xl cursor-pointer'/>
                        <BsFillPencilFill title='Edit task' onClick={() => handleEdit(task.id)} className='text-white text-md cursor-pointer' />
                    </>
                }
                <BsTrashFill title='Delete task' onClick={() => handleDelete(task.id)} className='text-red-400 text-md cursor-pointer'/>
            </td>
        </tr>
    )
}

export default TaskContent