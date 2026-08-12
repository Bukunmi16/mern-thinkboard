import { PlusIcon } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router'

const Navbar = () => {
  const location = useLocation()
  const hideNewNote = location.pathname === '/create'

  return (
    <div className='shadow-sm'>
     <div className=" mx-auto max-w-7xl  p-4 flex items-center justify-between">
        <div className="md:text-4xl sm:text-2xl font-bold tracking-tight text-content">Thinkboard</div>
        <div className="">
            {!hideNewNote && (
              <Link to="/create" className=" flex items-center btn text-white btn-primary sm:btn-md shadow-md btn-sm rounded-3xl">
                <PlusIcon className='size-5' />
                <span>New Note</span> 
              </Link>
            )}
        </div>
        </div>    
    </div>
  )
}

export default Navbar
