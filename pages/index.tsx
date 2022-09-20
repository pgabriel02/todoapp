import Head from 'next/head'
import TasksContainer from '../components/Tasks'
import ThemeSwitcher from '../components/ThemeSwitcher'


const Home = () => {
  return (
    <div className='w-full my-10'>
      <Head>
        <title>Todo app | Petre Gabriel</title>
        <meta name="description" content="Petre Gabriel todo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TasksContainer />
      <ThemeSwitcher />
    </div>
  )
}

export default Home
