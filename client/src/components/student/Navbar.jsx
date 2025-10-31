import React, { useContext } from 'react'

import { Link } from 'react-router-dom'
import {useClerk, UserButton, useUser} from '@clerk/clerk-react'
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const Navbar = () => {
const isCourseListPage = location.pathname.includes('/course-list');
const {openSignIn} = useClerk();
const {user} = useUser();
const {navigate, isEducator} = useContext(AppContext);

  return (
    <div className={`flex items-center justify-between px-4 sm:px-4 md:px-14 
    lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
      
      <img onClick={() => navigate('/')} src={assets.logo} alt="logo" className='w-28 lg:w-32 cursor-pointer'/>
      
      <div className='hidden md:flex items-center gap-6 text-gray-500'>
        <div className="flex item-center gap-5">
          {
            user && 
            <>
              <button onClick={() => {
                navigate('/educator')
              }}>{isEducator? 'Educator Dashboard' : 'Become Educator'}</button>
              <Link to={'/my-enrollments'}>My Enrollment</Link>
            </>
          }
        </div>
        {user ? <UserButton/> : 
        <button onClick={() => openSignIn()} className="bg-blue-600 text-white px-5 py-2 rounded-full">
          Create Account
        </button>
      }
      </div>


      {/*smaller screens*/}

      <div className='md:hidden flex items-center gap-3 sm:gap-5 text-gray-500'>
        <div className='flex items-center gap-1 sm:gap-2 max-smtext-xs'>
          {
            user && 
            <> <button onClick={() => {
                navigate('/educator')
              }}>{isEducator? 'Educator Dashboard' : 'Become Educator'}</button>
          <Link to={'/my-enrollments'}>My Enrollment</Link></>
          }
          {
            user ? <UserButton/> : 
            <>
              <button onClick={() => openSignIn()} className='relative z-10 cursor-pointer'>
                <img src={assets.user_icon} alt="User_Icon" />
              </button>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar
