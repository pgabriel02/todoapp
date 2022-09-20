import {useEffect} from 'react'
import Swal from 'sweetalert2';
export function Theme() {
    const themes = [
        {
            id: 1, name: 'Dark red', rgb: 'rgb(127, 29, 29)'
        },
        {
            id: 2, name: 'Light red', rgb: 'rgb(248, 113, 113)'
        },
        {
            id: 3, name: 'Dark green', rgb: 'rgb(20, 83, 45)'
        },
        {
            id: 4, name: 'Light green', rgb: 'rgb(74, 222, 128)'
        },
        {
            id: 5, name: 'Dark blue', rgb: 'rgb(30 58 138)'
        },
        {
            id: 6, name: 'Light blue', rgb: 'rgb(96, 165, 250)'
        }
    ];
    
    const customTheme = () => {
        Swal.fire({
            title: 'Change background with a custom color',
            html: `
              <div class='flex flex-col gap-1 justify-center items-center w-full'>
                <input id='color' placeholder='EX: #111' type='text' value='' class='outline-none w-[80vw] md:w-[20vw] border text-sm rounded-sm focus:ring-red-500 focus:border-red-500 block p-2.5  border-gray-600 placeholder-gray-400 text-black' id='taskname' style='width: 80%;border-color: rgb(31, 41, 55);background: rgb(55, 65, 81)' required />
              </div>
            `,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Edit',
            confirmButtonColor: 'rgb(239 68 68)',
            background: 'rgb(17,24,39)'
          }).then(result => {
            if(result.isConfirmed) {
                //@ts-ignore
                const color = Swal.getPopup()?.querySelector('#color')?.value
                if(color[0] !== '#')
                    return Swal.fire({
                        title: 'Error!',
                        text: 'Your color is incorect!',
                        icon: 'error',
                        confirmButtonText: 'I understand',
                        confirmButtonColor: 'rgb(239 68 68)',
                        background: 'rgb(17,24,39)'
                    })
                localStorage.setItem('theme', color);
                document.body.style.background = color;
                Swal.fire({
                    title: 'Success',
                    text: `Your background color has been changed with successfully!`,
                    icon: 'success',
                    confirmButtonColor: 'rgb(239 68 68)',
                    background: 'rgb(17,24,39)'
                })
                
            }
          })
    }

    const changeTheme = (name: string, rgb: string) => {
        localStorage.setItem('theme', rgb);
        document.body.style.background = rgb;
        Swal.fire({
            title: 'Success',
            text: `Your background color has been changed with successfully in ${name}!`,
            icon: 'success',
            confirmButtonColor: 'rgb(239 68 68)',
            background: 'rgb(17,24,39)'
        })
    }
    useEffect(() => {
        if(localStorage.getItem('theme')) {
            document.body.style.background = localStorage.getItem('theme')!
        }
    }, [])

    return {changeTheme, customTheme, themes}

}