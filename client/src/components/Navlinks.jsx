import React from 'react'
import Links from '../utils/Links';
import { NavLink } from 'react-router-dom';
import { useDashboardContext } from '../pages/DashboardLayout';
const Navlinks = ({isBigSidebar}) => {
    const {toggleSideBar, user}=useDashboardContext()
  return (
        <div className='nav-links'>
            {Links.map((link)=>{
             const {text ,icon,path}=link
              const { role } = user;
              if (role !== 'admin' && path === 'admin') return;
             return <NavLink to={path} key={text} className='nav-link' onClick={isBigSidebar?null:toggleSideBar}  end>
               <span className='icon'> {icon} </span>
               {text}
             </NavLink>
            })}
          </div>  )
}

export default Navlinks