import {BsBrush, BsQuestionCircleFill} from 'react-icons/bs'
import {AiOutlineClear} from 'react-icons/ai'
import {useState, useEffect} from 'react'
import { Theme } from '../utils/theme'

const ThemeSwitcher = () => {
    const [toggle, setToggle] = useState<boolean>(false)
    const {themes, changeTheme, customTheme, removeTheme} = Theme()
    useEffect(() => {
        document.body.addEventListener('click', toggleModal)
        return () => document.body.removeEventListener('click', toggleModal)
    }, [])

    const toggleModal = (e: MouseEvent) => {
        !(e.target as HTMLButtonElement)?.hasAttribute('data-theme') &&
            setToggle(false)
    }

    return (
        <>
            <div data-theme='1' title='Background switcher' className='fixed bottom-5 right-5 z-10' onClick={() => setToggle(!toggle)}>
                <span data-theme='1' className='p-3 rounded-full bg-gray-900 flex cursor-pointer'>
                    <BsBrush data-theme='1' className='text-xl text-white' fill='#fff' />
                </span>
            </div>
            {toggle && 
                <div data-theme='1' className='fadeEffect fixed bottom-10 right-[4.5rem] py-6 px-4 rounded-md z-20 shadow-lg bg-gray-900 flex max-w-[40vw] md:max-w-[10vw] lg:max-w-[15vw] flex-wrap gap-2'>
                    {
                        themes.map(theme =>
                            <span key={theme.id} onClick={() => changeTheme(theme.name, theme.rgb)} className='p-[10px] rounded-full cursor-pointer' style={{background: theme.rgb}} title={theme.name} />    
                        )
                    }
                    <BsQuestionCircleFill onClick={customTheme} className='text-xl text-yellow-200 cursor-pointer' title='Custom hex color'/>
                    <AiOutlineClear onClick={removeTheme} className='text-xl rotate-2 text-purple-400 cursor-pointer' title='Clear background' />
                </div>
            }
        </>

    )
}

export default ThemeSwitcher