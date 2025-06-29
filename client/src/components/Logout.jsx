import React from 'react'
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';
const Logout = () => {
    const [logOut, setlogOut] =useState(false)
    const {user, logoutUser} = useDashboardContext()
    console.log('User object:', user);

  return (
    <Wrapper>
    <button type='button' className='btn logout-btn' onClick={()=>setlogOut(!logOut)}>
      {user.avatar ? ( <img src={user.avatar} alt='avatar' className='img' />) : ( <FaUserCircle />)}
        {/* <FaUserCircle/> */}
        {user?.name}
        <FaCaretDown/>
    </button>
    <div className={logOut? 'dropdown show-dropdown' : 'dropdown'}>
        <button type='button' className='dropdown-btn' onClick={logoutUser}>
          logout
        </button>
    </div>
    </Wrapper>
  )
}

export default Logout