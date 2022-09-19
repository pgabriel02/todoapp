import {useEffect, useState} from 'react'
import Head from 'next/head'
import Swal from 'sweetalert2'
import Task from './utils/types'
import TasksContainer from './components/Tasks'


const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([] as Task[])
  const [name, setName] = useState<string>('')
  const [priority, setPriority] = useState<string>('Low')
  const addTask = (e: any) => {
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
      Swal.fire({
        title: 'Warning',
        text: `Are you sure you want to make ${name} task?`,
        icon: 'warning',
        confirmButtonText: 'Yes',
        confirmButtonColor: 'rgb(239, 68, 68)',
        background: 'rgb(17, 24, 39)',
        showCancelButton: true
      }).then(result => {
        if(result.isConfirmed)
          setTasks(task => {
            updateStorage([...task, {id: task.length + 1, name: name, priority: priority, done: false}])
            return ([...task, {id: task.length + 1, name: name, priority: priority, done: false}])}
          )
      })
    setName('')
    setPriority('Low')
  }
  const updateStorage = (task: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(task))
    console.log(task)
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
                <input type='text' value=${task.name} class='outline-none bg-gray-50 w-[80vw] md:w-[20vw] border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-red-500 focus:border-red-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500' defaultValue='${task.name}' id='name' required />
                <select  id='priority' class="w-[80vw] md:w-[20vw] mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-red-500 focus:border-red-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500">
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
              const name = Swal.getPopup()?.querySelector('#name')?.value
              //@ts-ignore
              const priority = Swal.getPopup()?.querySelector('#priority')?.value
              if(name.length < 3)
                return Swal.fire({
                  title: 'Error',
                  text: 'Name is too short!',
                  icon: 'error',
                  background: 'rgb(17,24,39)'
                })
              if(name === task.name && priority === task.priority)
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
                    o.priority = priority
                    o.name = name
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
  useEffect(() => {
    if(localStorage.getItem('tasks'))
      setTasks(JSON.parse(localStorage.getItem('tasks')!))
  }, [])
  return (
    <div className='w-full'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
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
      <TasksContainer handleMark={handleMark} handleEdit={handleEdit} handleDelete={handleDelete} tasks={tasks} />
    </div>
  )
}

export default Home
