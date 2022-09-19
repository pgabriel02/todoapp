import Task from "../utils/types"
import {BsFillPencilFill, BsCheck, BsTrashFill} from 'react-icons/bs'
type Props = {
    task: Task,
    handleDelete(id: number): void
    handleMark(id: number): void,
    handleEdit(id: number): void,
}

const TaskContent = ({task, handleMark, handleEdit, handleDelete}: Props) => {
    return (
        <tr>
            <td>{task.id}</td>
            <td className='flex items-center justify-center gap-1'><span title={task.priority} className={`w-[10px] h-[10px] ${task.priority === 'Low' ? 'bg-green-500' : task.priority === 'Medium' ? 'bg-orange-300' : 'bg-red-400'} rounded-full`}></span>{task.name}</td>
            <td>{task.priority}</td>
            <td className='flex items-center justify-center gap-2'>
                {!task.done &&
                    <>
                        <BsCheck  onClick={() => handleMark(task.id)} className='text-green-400 text-2xl cursor-pointer'/>
                        <BsFillPencilFill onClick={() => handleEdit(task.id)} className='text-white text-md cursor-pointer' />
                    </>
                }
                <BsTrashFill onClick={() => handleDelete(task.id)} className='text-red-400 text-md cursor-pointer'/>
            </td>
        </tr>
    )
}

export default TaskContent