import {Task} from "../utils/types"
import TaskContent from "./TaskContent"
import {useState, useEffect} from 'react'
import {Pagination} from "../utils/pagination"
import {AiOutlineRight, AiOutlineLeft} from 'react-icons/ai'
import {BiFirstPage, BiLastPage} from 'react-icons/bi' 

type Props = {
    tasks: Task[],
    handleDelete(id: number): void
    handleMark(id: number): void,
    handleEdit(id: number): void,
}

const TasksContainer = ({tasks, handleDelete, handleMark, handleEdit}: Props) => {
    const [search1, setSearch1] = useState<string>('')
    const [search2, setSearch2] = useState<string>('')
    const [page1, setPage1]= useState<number>(1)
    const [page2, setPage2]= useState<number>(1)
    const [totalpage1, setTotalPage1] = useState<number>(0)
    const [totalpage2, setTotalPage2] = useState<number>(0)
    useEffect(() => {
        setTotalPage1(Math.ceil(tasks?.filter(t => !t.done && t.name.toLowerCase().includes(search1.toLowerCase())).length/10))
        setTotalPage2(Math.ceil(tasks?.filter(t => t.done && t.name.toLowerCase().includes(search2.toLowerCase())).length/10))
    }, [tasks])
    return (
        <div className='mt-5 flex w-[90%] mx-auto flex-col gap-2 justify-center items-center md:justify-start md:items-start'>
            <div className='ml-auto'>
                <input onChange={(e) => {
                    setSearch1(e.target?.value)
                    setTotalPage1(Math.ceil(tasks?.filter(t => !t.done && t.name.toLowerCase().includes(e.target.value.toLowerCase())).length/10))
                }} type="text" value={search1} placeholder='Search something' className="outline-none w-[30vh] md:w-[40vh] border  text-sm rounded-sm focus:ring-red-500 focus:border-red-500 block p-2.5 bg-gray-900 border-gray-900 placeholder-gray-400 text-white dark:focus:border-red-500" required />
            </div>
            <h2 className='text-white text-md font-bold'>Tasks in progress</h2>
            <table className='table-auto text-center w-full bg-gray-900 text-white rounded-md'>
                <thead className='p-5'>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Priority</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Pagination(tasks?.filter(t => !t.done && t.name.toLowerCase().includes(search1.toLowerCase())), page1, 10).map((task) => 
                            <TaskContent key={task.id} handleMark={handleMark} handleEdit={handleEdit} handleDelete={handleDelete} task={task} />    
                        )
                    }
                </tbody>
            </table>
            <ul className="inline-flex ml-auto my-5">
                {
                    page1 > 2 &&
                    <li onClick={() => setPage1(1)} title='First page'>
                        <BiFirstPage className='text-white cursor-pointer text-md' />
                    </li>
                }
                {
                    page1 > 1 &&
                    <li onClick={() => setPage1(old => old - 1)} title='Previous page'>
                        <AiOutlineLeft  className='text-white cursor-pointer text-md'/>
                    </li>
                }
                {
                    page1 < totalpage1 &&
                    <li onClick={() => setPage1(old => old + 1)} title='Next page'>
                        <AiOutlineRight  className='text-white cursor-pointer text-md'/>
                    </li>
                }
                {
                    page1 < totalpage1 - 1 &&
                    <li onClick={() => setPage1(totalpage1)} title='Last page'>
                        <BiLastPage  className='text-white cursor-pointer text-md'/>
                    </li>
                }
            </ul>
            <div className='ml-auto'>
                <input onChange={(e) => {
                    setSearch2(e.target?.value)
                    setTotalPage2(Math.ceil(tasks?.filter(t => t.done && t.name.toLowerCase().includes(e.target.value.toLowerCase())).length/10))
                }} type="text" value={search2} placeholder='Search something' className="outline-none w-[30vh] md:w-[40vh] border  text-sm rounded-sm focus:ring-red-500 focus:border-red-500 block p-2.5 bg-gray-900 border-gray-900 placeholder-gray-400 text-white dark:focus:border-red-500" required />
            </div>
            <h2 className='text-white text-md font-bold'>Tasks done</h2>
            <table className='table-auto text-center w-full px-10 py-10 bg-gray-900 text-white rounded-md'>
                <thead className='p-5'>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Priority</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks?.filter(t => t.done && t.name.toLowerCase().includes(search2.toLowerCase())).map((task) => 
                            <TaskContent key={task.id} handleMark={handleMark} handleEdit={handleEdit} handleDelete={handleDelete} task={task} />    
                        )
                    }
                </tbody>
            </table>
            <ul className="inline-flex ml-auto my-5">
                {
                    page2 > 2 &&
                    <li onClick={() => setPage2(1)} title='First page'>
                        <BiFirstPage className='text-white cursor-pointer text-md' />
                    </li>
                }
                {
                    page2 > 1 &&
                    <li onClick={() => setPage2(old => old - 1)} title='Previous page'>
                        <AiOutlineLeft  className='text-white cursor-pointer text-md'/>
                    </li>
                }
                {
                    page2 < totalpage2 &&
                    <li onClick={() => setPage2(old => old + 1)} title='Next page'>
                        <AiOutlineRight  className='text-white cursor-pointer text-md'/>
                    </li>
                }
                {
                    page2 < totalpage2 - 1 &&
                    <li onClick={() => setPage2(totalpage2)} title='Last page'>
                        <BiLastPage  className='text-white cursor-pointer text-md'/>
                    </li>
                }
            </ul>
        </div>
    )
}

export default TasksContainer