import {useState, useEffect, useCallback, FormEvent} from 'react'
import Swal from 'sweetalert2'
import { Task } from './types'

export function useTodoApp() {
  const [tasks, setTasks] = useState<Task[]>([] as Task[])
  const [name, setName] = useState<string>('')
  const [priority, setPriority] = useState<string>('Low')
  const addTask = (e: FormEvent) => {
    e.preventDefault()
    if(name.length < 3)
      return Swal.fire({
        title: 'Error!',
        text: 'Task name is too short!',
        icon: 'error',
        confirmButtonText: 'I understand',
        confirmButtonColor: 'rgb(239 68 68)',
        background: 'rgb(17,24,39)'
      })
      if(tasks?.filter(task => task.name === name && !task.done).length > 0)
      return Swal.fire({
        title: 'Error!',
        text: 'Task name already exists!',
        icon: 'error',
        confirmButtonText: 'I understand',
        confirmButtonColor: 'rgb(239 68 68)',
        background: 'rgb(17,24,39)'
      })
        setTasks(task => {
          updateStorage([...task, {id: task.length + 1, name: name, priority: priority, done: false}])
          return ([...task, {id: task.length + 1, name: name, priority: priority, done: false}])}
        )
        Swal.fire({
            title: 'Success',
            icon: 'success',
            text: `Task ${name} has been created with successfully.`,
            confirmButtonColor: 'rgb(239 68 68)',
            background: 'rgb(17,24,39)'
        })
        setName('')
        setPriority('Low')
    
  }
  const updateStorage = (task: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(task))
  }

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Warning',
      text: `Are you sure you want to delete task id ${id}?`,
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: 'rgb(239 68 68)',
      background: 'rgb(17,24,39)'
    }).then((result) => {
      if(result.isConfirmed) {
        setTasks(task => {
          updateStorage(task.filter(t => t.id !== id))
          return task.filter(t => t.id !== id)
        })
        Swal.fire({
          title: 'Success',
          text: 'Task has been deleted with successfully!',
          icon: 'success',
          confirmButtonColor: 'rgb(239 68 68)',
          background: 'rgb(17,24,39)'
        })
      }
    })

  }

  const handleEdit = (id: number) => {
    tasks.filter(task => {
        if(task.id === id)
          Swal.fire({
            title: `Edit ${task.name}`,
            html: `
              <div class='flex flex-col gap-1 justify-center items-center w-full'>
                <input id='name' type='text' value='${task.name}' class='outline-none w-[80vw] md:w-[20vw] border text-sm rounded-sm focus:ring-red-500 focus:border-red-500 block p-2.5  border-gray-600 placeholder-gray-400 text-black' id='taskname' style='width: 80%;border-color: rgb(31, 41, 55);background: rgb(55, 65, 81)' required />
                <select id='priority' class="w-[80vw] md:w-[20vw] mt-2 border text-sm rounded-sm focus:ring-red-500 focus:border-red-500 block p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white" style='width: 80%;border-color: rgb(31, 41, 55);background: rgb(55, 65, 81)'>
                  <option value="Low"  ${task.priority === 'Low' && 'selected'}>Low</option>
                  <option value="Medium" ${task.priority === 'Medium' && 'selected'}>Medium</option>
                  <option value="High" ${task.priority === 'High' && 'selected'}>High</option>
                </select>
              </div>
            `,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Edit',
            confirmButtonColor: 'rgb(239 68 68)',
            background: 'rgb(17,24,39)'
          }).then((result) => {
            if(result.isConfirmed) {

              //@ts-ignore
              const namee = Swal.getPopup()?.querySelector('#name')?.value
              //@ts-ignore
              const priorityy = Swal.getPopup()?.querySelector('#priority')?.value
              if(namee.length < 3)
                return Swal.fire({
                  title: 'Error',
                  text: 'Name is too short!',
                  icon: 'error',
                  background: 'rgb(17,24,39)'
                })
              if(namee === task.name && priorityy === task.priority)
                return;
              if(tasks.filter(t => t.name === name && t.id !== id && !t.done).length > 0)
                return Swal.fire({
                  title: 'Error!',
                  text: 'Already exists a task with this name!',
                  confirmButtonText: 'I understand',
                  confirmButtonColor: 'rgb(239 68 68)',
                  background: 'rgb(17,24,39)'
                })
              setTasks(task => {
                const old = [...task]
                old.filter(o => {
                  if(o.id === id) {
                    o.priority = priorityy
                    o.name = namee
                  }
                })
                updateStorage(old)
                return old
              })
              Swal.fire({
                title: 'Success',
                text: `${task.name} has been edited with successfully!`,
                icon: 'success',
                confirmButtonColor: 'rgb(239 68 68)',
                background: 'rgb(17,24,39)'
              })
            }
          })
    })
  }

  const handleMark = (id: number) => {
    Swal.fire({
      title: 'Warning',
      text: `Are you sure you want to set task id ${id} to done?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      confirmButtonColor: 'rgb(239 68 68)',
      background: 'rgb(17,24,39)'
    }).then((result) => {
      if(result.isConfirmed) {
        setTasks((task) => {
          const old = [...task]
          old.filter(o => {
            if(o.id === id)
              o.done = true
          })
          updateStorage(old)
          return old
        })
        Swal.fire({
          title: 'Success',
          text: 'Task has been marked as done with successfully!',
          icon: 'success',
          confirmButtonColor: 'rgb(239 68 68)',
          background: 'rgb(17,24,39)'
        })
      }
    })
  }
  const setData = useCallback(() => {
    if(localStorage.getItem('tasks'))
      setTasks(JSON.parse(localStorage.getItem('tasks')!))
  }, [])

  useEffect(() => {
    setData()
  }, [setData])


  return {setTasks, tasks, name, setName, priority, setPriority,
    addTask, handleMark, handleEdit, handleDelete
    }
}

export function PaginationApp() {
    const [search1, setSearch1] = useState<string>('')
    const [search2, setSearch2] = useState<string>('')
    const [page1, setPage1]= useState<number>(0)
    const [page2, setPage2]= useState<number>(0)
    const [totalpage1, setTotalPage1] = useState<number>(0)
    const [totalpage2, setTotalPage2] = useState<number>(0)

    return {search1, setSearch1, search2, setSearch2, page1, setPage1,
        page2, setPage2, totalpage1, setTotalPage1, totalpage2, setTotalPage2}
}